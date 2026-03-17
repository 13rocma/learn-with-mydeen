import { Link } from "react-router-dom";
import { Hand, Star, BookOpen, Languages, Heart } from "lucide-react";
import heroBg from "@/assets/hero-calligraphy.png";

const features = [
  {
    icon: Star,
    title: "Les Bases",
    desc: "Les piliers de l'islam et les fondements de la foi",
    path: "/bases",
  },
  {
    icon: Hand,
    title: "La Prière",
    desc: "Guide complet pour apprendre à prier correctement",
    path: "/priere",
  },
  {
    icon: BookOpen,
    title: "Les Sourates",
    desc: "Mémorisez les sourates essentielles du Coran",
    path: "/sourates",
  },
  {
    icon: Languages,
    title: "L'Alphabet",
    desc: "Apprenez les lettres arabes avec la prononciation",
    path: "/alphabet",
  },
  {
    icon: Heart,
    title: "Les Invocations",
    desc: "Les du'as essentielles pour votre quotidien",
    path: "/duas",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt="Calligraphie arabe dorée"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-12">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            My<span className="text-primary">Deen</span>
          </h1>
          <p className="font-arabic text-2xl text-foreground/80 mb-2 animate-fade-in-up">
            دِينِي
          </p>
          <p className="text-lg md:text-xl text-foreground/70 mb-8 animate-fade-in-up-delay font-body">
            Apprenez la prière et les bases de l'islam à votre rythme
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Explorez votre <span className="text-primary">parcours</span>
              </h2>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tout ce dont vous avez besoin pour apprendre et pratiquer
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {features.map((f) => (
              <Link
                key={f.path}
                to={f.path}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_hsl(42,90%,50%,0.15)] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                      {f.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bismillah */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="font-arabic text-4xl text-foreground mb-4">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className="phonetic-text text-lg mb-2">Bismillâhi r-Rahmâni r-Rahîm</p>
          <p className="text-muted-foreground">Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
