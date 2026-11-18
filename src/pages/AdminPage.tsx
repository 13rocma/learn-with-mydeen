import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDown, ArrowUp, Download, LoaderCircle, Search, Trash2 } from "lucide-react";
import PageHeroBanner from "@/components/PageHeroBanner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { banUser, deleteUser, fetchActivity, fetchBanned, fetchDaily, fetchOverview, fetchPages, fetchProfiles } from "@/lib/adminApi";

const PERIODS = [{ d: 7, label: "7 jours" }, { d: 30, label: "30 jours" }, { d: 90, label: "90 jours" }];
const PAGE_NAMES: Record<string, string> = { "/bases": "Les Bases", "/priere": "La Prière", "/sourates": "Les Sourates", "/alphabet": "L'Alphabet", "/duas": "Les Invocations", "/ablutions": "Les Ablutions", "/installer": "Installation" };
const PAGE_SIZE = 20;
type Confirm = { kind: "ban" | "unban" | "delete"; id: string; label: string };
type SortKey = "prenom" | "email" | "created_at" | "last_seen_at" | "visits" | "marketing_consent";

const fmtDate = (v: string | null) => (v ? format(new Date(v), "dd/MM/yyyy HH:mm") : "—");
const fmtDay = (v: string) => format(new Date(v + "T12:00:00"), "dd/MM");
const csvCell = (v: unknown) => { let s = String(v ?? ""); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; };

function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return <Card><CardHeader className="pb-1"><CardTitle className="text-xs font-medium text-muted-foreground">{label}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-foreground">{value}</div>{hint && <p className="text-xs text-muted-foreground">{hint}</p>}</CardContent></Card>;
}

export default function AdminPage() {
  const { isAdmin, loading } = useIsAdmin();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [confirm, setConfirm] = useState<Confirm | null>(null);
  const [days, setDays] = useState(7);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "created_at", dir: "desc" });
  const [page, setPage] = useState(0);

  const on = { enabled: isAdmin, staleTime: 60_000 };
  const overview = useQuery({ queryKey: ["adm-overview"], queryFn: fetchOverview, ...on });
  const daily = useQuery({ queryKey: ["adm-daily", days], queryFn: () => fetchDaily(days), ...on });
  const pages = useQuery({ queryKey: ["adm-pages", days], queryFn: () => fetchPages(days), ...on });
  const activity = useQuery({ queryKey: ["adm-activity", days], queryFn: () => fetchActivity(days), ...on });
  const banned = useQuery({ queryKey: ["adm-banned"], queryFn: fetchBanned, ...on });
  const act = useMutation({
    mutationFn: (c: Confirm) => (c.kind === "delete" ? deleteUser(c.id) : banUser(c.id, c.kind === "ban")),
    onSuccess: (_d, c) => {
      toast.success(c.kind === "delete" ? "Compte supprimé." : c.kind === "ban" ? "Compte banni." : "Compte débanni.");
      qc.invalidateQueries({ predicate: (q) => String(q.queryKey[0]).startsWith("adm-") });
    },
    onError: (e: unknown) => toast.error((e as { message?: string })?.message || "Action impossible."),
    onSettled: () => setConfirm(null),
  });
  const profiles = useQuery({ queryKey: ["adm-profiles"], queryFn: fetchProfiles, ...on });

  const rows = useMemo(() => {
    const visitsBy = new Map((activity.data ?? []).map((a) => [a.uid, a.visits]));
    const bannedSet = new Set(banned.data ?? []);
    const q = search.trim().toLowerCase();
    const list = (profiles.data ?? []).map((p) => ({ ...p, visits: visitsBy.get(p.id) ?? 0, banned: bannedSet.has(p.id) }))
      .filter((p) => !q || p.email.toLowerCase().includes(q) || p.prenom.toLowerCase().includes(q));
    const { key, dir } = sort;
    list.sort((a, b) => {
      const x = a[key] ?? "", y = b[key] ?? "";
      const c = typeof x === "number" || typeof x === "boolean" ? Number(x) - Number(y) : String(x).localeCompare(String(y), "fr");
      return dir === "asc" ? c : -c;
    });
    return list;
  }, [profiles.data, activity.data, banned.data, search, sort]);

  if (loading) return <div role="status" aria-label="Chargement" className="min-h-screen flex items-center justify-center"><LoaderCircle className="h-6 w-6 animate-spin text-primary" /></div>;
  if (!isAdmin) return <Navigate to="/bases" replace />;

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const shown = rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const o = overview.data;
  const dd = daily.data ?? [];
  const sumVisits = dd.reduce((n, r) => n + r.visits, 0);
  const avgActive = dd.length ? Math.round((dd.reduce((n, r) => n + r.active_users, 0) / dd.length) * 10) / 10 : 0;
  const activeNow = (activity.data ?? []).length;
  const toggleSort = (key: SortKey) => { setSort((s) => ({ key, dir: s.key === key && s.dir === "desc" ? "asc" : "desc" })); setPage(0); };
  const head = (key: SortKey, label: string) => (
    <TableHead><button type="button" className="inline-flex items-center gap-1 font-medium hover:text-foreground" onClick={() => toggleSort(key)}>{label}{sort.key === key && (sort.dir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}</button></TableHead>
  );
  const exportCsv = () => {
    const lines = [["Prénom", "Email", "Inscrit le", "Dernière connexion", `Visites (${days} j)`, "Accepte les emails", "Statut"].map(csvCell).join(";")];
    rows.forEach((r) => lines.push([r.prenom, r.email, fmtDate(r.created_at), fmtDate(r.last_seen_at), r.visits, r.marketing_consent ? "Oui" : "Non", r.banned ? "Banni" : "Actif"].map(csvCell).join(";")));
    const url = URL.createObjectURL(new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = `mydeen-inscrits-${format(new Date(), "yyyy-MM-dd")}.csv`; a.click(); URL.revokeObjectURL(url);
  };
  const failed = overview.isError || daily.isError || profiles.isError;

  return (
    <div className="min-h-screen">
      <PageHeroBanner title="Tableau de bord" subtitle="Inscriptions et utilisation de MyDeen" />
      <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {failed && <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">Impossible de charger certaines données. Vérifie que le fichier SQL du tableau de bord a bien été exécuté.</p>}

        <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Stat label="Inscrits au total" value={o?.total ?? "…"} />
          <Stat label="Aujourd'hui" value={o?.today ?? "…"} />
          <Stat label="7 derniers jours" value={o?.d7 ?? "…"} />
          <Stat label="30 derniers jours" value={o?.d30 ?? "…"} />
          <Stat label="Acceptent les emails" value={o?.marketing ?? "…"} hint={o && o.total ? `${Math.round((o.marketing / o.total) * 100)} % des inscrits` : undefined} />
        </section>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground mr-1">Période :</span>
          {PERIODS.map((p) => <Button key={p.d} size="sm" variant={days === p.d ? "default" : "outline"} onClick={() => setDays(p.d)}>{p.label}</Button>)}
        </div>

        <section className="grid grid-cols-3 gap-3">
          <Stat label="Personnes actives" value={activeNow} hint={`sur ${days} jours`} />
          <Stat label="Visites (pages ouvertes)" value={sumVisits} hint={`sur ${days} jours`} />
          <Stat label="Moy. de personnes / jour" value={avgActive} />
        </section>

        <Card><CardHeader><CardTitle className="text-base">Personnes connectées et visites par jour</CardTitle></CardHeader><CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%"><LineChart data={dd.map((r) => ({ ...r, jour: fmtDay(r.d) }))} margin={{ left: -20, right: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="jour" tick={{ fontSize: 11 }} interval="preserveStartEnd" /><YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} /><Legend />
            <Line type="monotone" dataKey="active_users" name="Personnes" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="visits" name="Visites" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
          </LineChart></ResponsiveContainer>
        </CardContent></Card>

        <Card><CardHeader><CardTitle className="text-base">Inscriptions par jour</CardTitle></CardHeader><CardContent className="h-56">
          <ResponsiveContainer width="100%" height="100%"><BarChart data={dd.map((r) => ({ ...r, jour: fmtDay(r.d) }))} margin={{ left: -20, right: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="jour" tick={{ fontSize: 11 }} interval="preserveStartEnd" /><YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
            <Bar dataKey="signups" name="Inscriptions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart></ResponsiveContainer>
        </CardContent></Card>

        <Card><CardHeader><CardTitle className="text-base">Rubriques les plus consultées ({days} jours)</CardTitle></CardHeader><CardContent>
          {(pages.data ?? []).length === 0 ? <p className="text-sm text-muted-foreground">Pas encore de visites enregistrées. Les statistiques démarrent à la mise en ligne du suivi.</p> :
            <Table><TableHeader><TableRow><TableHead>Rubrique</TableHead><TableHead className="text-right">Visites</TableHead><TableHead className="text-right">Personnes</TableHead></TableRow></TableHeader>
              <TableBody>{pages.data!.map((p) => <TableRow key={p.path}><TableCell>{PAGE_NAMES[p.path] ?? p.path}</TableCell><TableCell className="text-right">{p.visits}</TableCell><TableCell className="text-right">{p.users}</TableCell></TableRow>)}</TableBody></Table>}
        </CardContent></Card>

        <Card><CardHeader className="flex-row flex-wrap items-center justify-between gap-2 space-y-0"><CardTitle className="text-base">Inscrits ({rows.length})</CardTitle>
          <Button size="sm" variant="outline" onClick={exportCsv} disabled={!rows.length}><Download className="mr-2 h-4 w-4" />Exporter en CSV</Button></CardHeader>
          <CardContent className="space-y-3">
            <div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="Rechercher un prénom ou un email" value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} /></div>
            <div className="overflow-x-auto"><Table><TableHeader><TableRow>{head("prenom", "Prénom")}{head("email", "Email")}{head("created_at", "Inscrit le")}{head("last_seen_at", "Dernière connexion")}{head("visits", `Visites (${days} j)`)}{head("marketing_consent", "Emails")}<TableHead>Statut</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>{shown.map((r) => <TableRow key={r.id}><TableCell>{r.prenom || "—"}</TableCell><TableCell>{r.email}</TableCell><TableCell className="whitespace-nowrap">{fmtDate(r.created_at)}</TableCell><TableCell className="whitespace-nowrap">{fmtDate(r.last_seen_at)}</TableCell><TableCell>{r.visits}</TableCell><TableCell>{r.marketing_consent ? "Oui" : "Non"}</TableCell><TableCell className="whitespace-nowrap">{r.banned ? <span className="font-medium text-destructive">Banni</span> : "Actif"}</TableCell>
                <TableCell className="text-right whitespace-nowrap">{r.id !== user?.id && <>
                  <Button size="sm" variant="ghost" onClick={() => setConfirm({ kind: r.banned ? "unban" : "ban", id: r.id, label: r.email })}>{r.banned ? "Débannir" : "Bannir"}</Button>
                  <Button size="sm" variant="ghost" className="text-destructive" aria-label={`Supprimer ${r.email}`} onClick={() => setConfirm({ kind: "delete", id: r.id, label: r.email })}><Trash2 className="h-4 w-4" /></Button></>}</TableCell></TableRow>)}
                {!shown.length && <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground">Aucun résultat.</TableCell></TableRow>}</TableBody></Table></div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage(page - 1)}>Précédent</Button>
              <span>Page {page + 1} / {pageCount}</span>
              <Button size="sm" variant="outline" disabled={page + 1 >= pageCount} onClick={() => setPage(page + 1)}>Suivant</Button>
            </div>
          </CardContent></Card>
        <p className="text-xs text-muted-foreground">Les visites des administrateurs ne sont pas comptées dans les statistiques.</p>
      </div>
      <AlertDialog open={!!confirm} onOpenChange={(o) => { if (!o && !act.isPending) setConfirm(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirm?.kind === "delete" ? "Supprimer ce compte ?" : confirm?.kind === "ban" ? "Bannir ce compte ?" : "Débannir ce compte ?"}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirm?.kind === "delete" ? `Le compte ${confirm.label} sera supprimé définitivement, avec son profil et son historique de visites. Cette action est irréversible.`
                : confirm?.kind === "ban" ? `${confirm.label} ne pourra plus se connecter et ses sessions ouvertes seront fermées. Tu pourras le débannir à tout moment.`
                : `${confirm?.label} pourra de nouveau se connecter.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={act.isPending}>Annuler</AlertDialogCancel>
            <AlertDialogAction disabled={act.isPending} onClick={(e) => { e.preventDefault(); if (confirm) act.mutate(confirm); }}>{act.isPending ? "En cours…" : "Confirmer"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
