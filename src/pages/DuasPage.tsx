import { useState } from "react";
import { duas, duaCategories } from "@/data/duas";
import PageHeroBanner from "@/components/PageHeroBanner";

const DuasPage = () => {
  const [activeCategory, setActiveCategory] = useState(duaCategories[0]);

  const filtered = duas.filter((d) => d.category === activeCategory);

  return (
    <div className="min-h-screen">
      <PageHeroBanner title="Invocations (Du'as)" subtitle="Les invocations essentielles pour votre quotidien" />
      <div className="container mx-auto px-4 max-w-3xl py-6">

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {duaCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

        {/* Du'as list */}
        <div className="space-y-4 animate-fade-in" key={activeCategory}>
          {filtered.map((dua) => (
            <div key={dua.id} className="section-card">
              <h3 className="font-heading text-lg font-semibold mb-4 text-primary">
                {dua.title}
              </h3>
              <div className="bg-muted/50 rounded-lg p-5">
                <p className="arabic-text text-center mb-3">{dua.arabic}</p>
                <p className="phonetic-text text-center text-sm mb-2">{dua.phonetic}</p>
                <p className="text-center text-sm text-muted-foreground">{dua.translation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DuasPage;
