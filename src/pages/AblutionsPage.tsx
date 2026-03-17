import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronLeft, Droplets } from "lucide-react";
import { ablutionSteps } from "@/data/ablutions";
import PageHeroBanner from "@/components/PageHeroBanner";

const AblutionsPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = ablutionSteps[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <PageHeroBanner />
      {/* Header */}
      <section className="py-10 border-b border-border">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour
          </Link>
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

      {/* Step navigation */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {ablutionSteps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentStep(i)}
                className={`flex-shrink-0 w-9 h-9 rounded-full text-sm font-medium transition-all duration-300 ${
                  i === currentStep
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                    : i < currentStep
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>

          {/* Current step card */}
          <div className="rounded-xl border border-primary/15 bg-card p-6 md:p-8 transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{step.emoji}</span>
              <div>
                <p className="text-xs text-primary font-medium mb-1">
                  Étape {step.id} / {ablutionSteps.length}
                </p>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                  {step.name}
                </h2>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed mb-6">{step.description}</p>

            {step.arabic && (
              <div className="rounded-lg bg-muted/50 border border-primary/10 p-4 space-y-2">
                <p className="font-arabic text-xl text-foreground/90 text-right leading-loose">
                  {step.arabic}
                </p>
                <p className="phonetic-text text-sm">{step.phonetic}</p>
                <p className="text-muted-foreground text-sm">{step.translation}</p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
                disabled={currentStep === 0}
                className="btn-glass px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2 text-foreground disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft className="h-4 w-4" />
                Précédent
              </button>
              <button
                onClick={() =>
                  setCurrentStep((p) =>
                    Math.min(ablutionSteps.length - 1, p + 1)
                  )
                }
                disabled={currentStep === ablutionSteps.length - 1}
                className="btn-glass px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2 text-foreground disabled:opacity-30 disabled:pointer-events-none"
              >
                Suivant
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* All steps overview */}
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
                  onClick={() => setCurrentStep(i)}
                  className={`w-full text-left rounded-lg border p-4 transition-all duration-200 ${
                    i === currentStep
                      ? "border-primary/30 bg-primary/5 shadow-sm shadow-primary/10"
                      : "border-border bg-card hover:border-primary/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{s.emoji}</span>
                    <div>
                      <p className="font-medium text-foreground text-sm">{s.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {s.description}
                      </p>
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
};

export default AblutionsPage;
