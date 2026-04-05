import { useState, useEffect, useRef, useCallback } from "react";
import { prayers, buildPrayerSequence, type PrayerAnimStep, type PrayerConfig } from "@/data/prayers";
import { ablutionSteps } from "@/data/ablutions";
import PrayerAnimation from "@/components/PrayerAnimation";
import { usePrayerAudio } from "@/hooks/usePrayerAudio";
import { Play, Pause, SkipForward, SkipBack, RotateCcw, ChevronRight, Volume2, VolumeX, Droplets, ArrowLeft, ArrowRight } from "lucide-react";
import PageHeroBanner from "@/components/PageHeroBanner";

type View = "menu" | "prayer" | "ablutions";

const PrayerGuide = () => {
  const [view, setView] = useState<View>("menu");
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerConfig | null>(null);
  const [steps, setSteps] = useState<PrayerAnimStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [ablutionStep, setAblutionStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { playStepAudio, stopAudio, pauseAudio, resumeAudio, isAudioPlaying } = usePrayerAudio();

  const step = steps[currentStep];
  const aStep = ablutionSteps[ablutionStep];

  useEffect(() => {
    if (selectedPrayer) {
      const seq = buildPrayerSequence(selectedPrayer.rakaCount);
      setSteps(seq);
      setCurrentStep(0);
      setIsPlaying(false);
      stopAudio();
    }
  }, [selectedPrayer, stopAudio]);

  useEffect(() => {
    if (!isPlaying || !step) return;
    let cancelled = false;
    const playCurrentStep = async () => {
      if (audioEnabled) await playStepAudio(step.name);
      if (cancelled) return;
      timerRef.current = setTimeout(() => {
        if (cancelled) return;
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, audioEnabled ? 1000 : step.durationMs);
    };
    playCurrentStep();
    return () => { cancelled = true; if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, currentStep, step, steps.length, audioEnabled, playStepAudio]);

  const togglePlay = () => {
    if (currentStep >= steps.length - 1 && !isPlaying) {
      // Prayer is finished, don't restart automatically
      return;
    } else if (isPlaying) {
      setIsPlaying(false);
      pauseAudio();
    } else {
      setIsPlaying(true);
      resumeAudio();
    }
  };

  const goToStep = (idx: number) => {
    stopAudio();
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentStep(idx);
    setIsPlaying(false);
  };

  const goToMenu = () => {
    setView("menu");
    setSelectedPrayer(null);
    setIsPlaying(false);
    stopAudio();
  };

  // ===== ABLUTIONS VIEW =====
  if (view === "ablutions") {
    return (
      <div className="min-h-screen bg-background">
        <PageHeroBanner title="Les Ablutions" subtitle="Apprenez les étapes de la purification" />
        <section className="py-10 border-b border-border">
          <div className="container mx-auto px-4">
            <button
              onClick={goToMenu}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <SkipBack className="h-4 w-4" />
              Retour
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center ring-1 ring-primary/20">
                <Droplets className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  Les <span className="text-gradient-gold">Ablutions</span>
                </h1>
                <p className="text-muted-foreground text-sm">Al-Woudou' — الوضوء</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              {ablutionSteps.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setAblutionStep(i)}
                  className={`flex-shrink-0 w-9 h-9 rounded-full text-sm font-medium transition-all duration-300 ${
                    i === ablutionStep
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : i < ablutionStep
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s.id}
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-primary/15 bg-card p-6 md:p-8 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{aStep.emoji}</span>
                <div>
                  <p className="text-xs text-primary font-medium mb-1">
                    Étape {aStep.id} / {ablutionSteps.length}
                  </p>
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                    {aStep.name}
                  </h2>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6">{aStep.description}</p>

              {aStep.arabic && (
                <div className="rounded-lg bg-muted/50 border border-primary/10 p-4 space-y-2">
                  <p className="font-arabic text-xl text-foreground/90 text-right leading-loose">
                    {aStep.arabic}
                  </p>
                  <p className="phonetic-text text-sm">{aStep.phonetic}</p>
                  <p className="text-muted-foreground text-sm">{aStep.translation}</p>
                </div>
              )}

              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => setAblutionStep((p) => Math.max(0, p - 1))}
                  disabled={ablutionStep === 0}
                  className="btn-glass px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2 text-foreground disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ArrowLeft className="h-4 w-4" /> Précédent
                </button>
                <button
                  onClick={() => setAblutionStep((p) => Math.min(ablutionSteps.length - 1, p + 1))}
                  disabled={ablutionStep === ablutionSteps.length - 1}
                  className="btn-glass px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2 text-foreground disabled:opacity-30 disabled:pointer-events-none"
                >
                  Suivant <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
                Toutes les étapes
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
              </h3>
              <div className="space-y-3">
                {ablutionSteps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setAblutionStep(i)}
                    className={`w-full text-left rounded-lg border p-4 transition-all duration-200 ${
                      i === ablutionStep
                        ? "border-primary/30 bg-primary/5 shadow-sm shadow-primary/10"
                        : "border-border bg-card hover:border-primary/15"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{s.emoji}</span>
                      <div>
                        <p className="font-medium text-foreground text-sm">{s.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{s.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ===== MENU VIEW =====
  if (view === "menu" || !selectedPrayer) {
    return (
      <div className="min-h-screen">
        <PageHeroBanner title="Guide de la Prière" subtitle="Choisissez la prière que vous souhaitez apprendre" />
        <div className="container mx-auto px-4 max-w-3xl py-6">

          {/* Ablutions button */}
          <button
            onClick={() => { setView("ablutions"); setAblutionStep(0); }}
            className="w-full section-card text-left flex items-center justify-between group mb-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Droplets className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold">Les Ablutions</h3>
                <p className="text-sm text-muted-foreground">Al-Woudou' — La purification avant la prière</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>

          <div className="grid gap-4">
            {prayers.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelectedPrayer(p); setView("prayer"); }}
                className="section-card text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="font-arabic text-xl text-primary">{p.nameAr}</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===== PRAYER VIEW =====
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <div className="min-h-screen">
      <PageHeroBanner />
      <div className="container mx-auto px-4 max-w-3xl py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goToMenu}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <SkipBack className="h-4 w-4" /> Choisir une prière
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAudioEnabled((e) => !e)}
              className={`p-2 rounded-lg transition-colors ${
                audioEnabled ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
              title={audioEnabled ? "Désactiver l'audio" : "Activer l'audio"}
            >
              {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
            <div className="text-right">
              <h2 className="font-heading text-xl font-bold">{selectedPrayer.name}</h2>
              <span className="font-arabic text-primary">{selectedPrayer.nameAr}</span>
            </div>
          </div>
        </div>

        <div className="w-full h-2 bg-muted rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {step && (
          <>
            <div className="section-card mb-4">
              <PrayerAnimation position={step.position} isActive={isPlaying} />
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                  Étape {currentStep + 1} / {steps.length}
                  {isAudioPlaying && (
                    <span className="ml-2 inline-flex items-center gap-1">
                      <Volume2 className="h-3 w-3 animate-pulse" />
                    </span>
                  )}
                </span>
                <h3 className="font-heading text-lg font-semibold mb-1">{step.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-5">
                <p className="phonetic-text text-center text-lg font-bold mb-3">{step.phonetic}</p>
                <p className="arabic-text text-center text-foreground/50 text-xl mb-2">{step.arabic}</p>
                <p className="text-center text-sm text-muted-foreground">{step.translation}</p>
                {step.repeat && (
                  <p className="text-center text-xs text-primary mt-2 font-medium">× {step.repeat} fois</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={() => goToStep(0)} className="p-3 rounded-full border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all" title="Recommencer">
                <RotateCcw className="h-5 w-5" />
              </button>
              <button onClick={() => goToStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="p-3 rounded-full border border-border hover:border-primary/50 text-foreground disabled:opacity-30 transition-all">
                <SkipBack className="h-5 w-5" />
              </button>
              <button onClick={togglePlay} className="p-4 rounded-full btn-primary-warm">
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
              </button>
              <button onClick={() => goToStep(Math.min(steps.length - 1, currentStep + 1))} disabled={currentStep === steps.length - 1} className="p-3 rounded-full border border-border hover:border-primary/50 text-foreground disabled:opacity-30 transition-all">
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            <details className="mt-8">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Voir toutes les étapes ({steps.length})
              </summary>
              <div className="mt-3 grid gap-1 max-h-60 overflow-y-auto">
                {steps.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => goToStep(i)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      i === currentStep ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {i + 1}. {s.name}
                  </button>
                ))}
              </div>
            </details>
          </>
        )}
      </div>
    </div>
  );
};

export default PrayerGuide;
