import { useState } from "react";
import { basicsCategories, basicsQuestions, pillarsOfIslam, pillarQuestions } from "@/data/basics";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import PageHeroBanner from "@/components/PageHeroBanner";

const BasicsPage = () => {
  const [activeCategory, setActiveCategory] = useState(basicsCategories[0]);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [activePillar, setActivePillar] = useState<string | null>(null);

  const filtered = activeCategory === "Les piliers de l'Islam" && activePillar
    ? pillarQuestions.filter((q) => q.pillar === activePillar)
    : basicsQuestions.filter((q) => q.category === activeCategory);

  const currentPillar = pillarsOfIslam.find(p => p.id === activePillar);

  return (
    <div className="min-h-screen">
      <PageHeroBanner title="Bases de la Religion" subtitle="Comprenez les fondements de l'Islam de manière simple et accessible" />
      <div className="container mx-auto px-4 max-w-3xl py-6">

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {basicsCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenQuestion(null);
                setActivePillar(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "btn-primary-warm"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pillar buttons when "Les piliers de l'Islam" is active and no pillar selected */}
        {activeCategory === "Les piliers de l'Islam" && !activePillar && (
          <div className="grid grid-cols-1 gap-3 animate-fade-in">
            {pillarsOfIslam.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => {
                  setActivePillar(pillar.id);
                  setOpenQuestion(null);
                }}
                className="section-card flex items-center gap-4 text-left hover:border-primary/40 transition-all group"
              >
                <span className="text-3xl">{pillar.icon}</span>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold group-hover:text-primary transition-colors">
                    {pillar.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{pillar.description}</p>
                </div>
                <span className="font-arabic text-xl text-primary/70">{pillar.arabicName}</span>
              </button>
            ))}
          </div>
        )}

        {/* Back button when viewing a pillar */}
        {activeCategory === "Les piliers de l'Islam" && activePillar && currentPillar && (
          <div className="mb-6 animate-fade-in">
            <button
              onClick={() => {
                setActivePillar(null);
                setOpenQuestion(null);
              }}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Retour aux piliers</span>
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{currentPillar.icon}</span>
              <h2 className="font-heading text-xl font-bold">{currentPillar.name}</h2>
              <span className="font-arabic text-lg text-primary/70">{currentPillar.arabicName}</span>
            </div>
          </div>
        )}

        {/* Questions (shown for non-pillar categories, or when a pillar is selected) */}
        {(activeCategory !== "Les piliers de l'Islam" || activePillar) && (
          <div className="space-y-3 animate-fade-in" key={activeCategory + (activePillar || "")}>
            {filtered.map((q) => (
              <div key={q.id} className="section-card">
                <button
                  onClick={() =>
                    setOpenQuestion(openQuestion === q.id ? null : q.id)
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="font-heading text-lg font-semibold pr-4">
                    {q.question}
                  </h3>
                  {openQuestion === q.id ? (
                    <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {openQuestion === q.id && (
                  <div className="mt-4 bg-muted/50 rounded-lg p-5 animate-fade-in">
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                      {q.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicsPage;
