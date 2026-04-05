import { useState } from "react";
import { basicsCategories, basicsQuestions } from "@/data/basics";
import { ChevronDown, ChevronUp } from "lucide-react";
import PageHeroBanner from "@/components/PageHeroBanner";

const BasicsPage = () => {
  const [activeCategory, setActiveCategory] = useState(basicsCategories[0]);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const filtered = basicsQuestions.filter((q) => q.category === activeCategory);

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

        {/* Questions */}
        <div className="space-y-3 animate-fade-in" key={activeCategory}>
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
      </div>
    </div>
  );
};

export default BasicsPage;
