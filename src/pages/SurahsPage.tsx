import { useState } from "react";
import { surahs } from "@/data/surahs";
import { useQuranAudio } from "@/hooks/useQuranAudio";
import { ChevronDown, ChevronUp, Volume2, Play, Square, Pause, Loader2 } from "lucide-react";
import PageHeroBanner from "@/components/PageHeroBanner";

const SurahsPage = () => {
  const [openSurah, setOpenSurah] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<Record<number, boolean>>({});
  const {
    reciterId,
    setReciterId,
    isPlaying,
    playingVerse,
    isLoading,
    playSurah,
    playVerse,
    stop,
    togglePause,
    reciters,
  } = useQuranAudio();

  const toggleDetails = (surahIdx: number) => {
    setShowDetails((prev) => ({ ...prev, [surahIdx]: !prev[surahIdx] }));
  };

  return (
    <div className="min-h-screen">
      <PageHeroBanner title="Sourates en Phonétique" subtitle="La phonétique en premier pour faciliter la mémorisation" />
      <div className="container mx-auto px-4 max-w-3xl py-6">

        {/* Sélecteur de récitateur */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <label className="text-sm text-muted-foreground whitespace-nowrap">Récitateur :</label>
          <select
            value={reciterId}
            onChange={(e) => {
              stop();
              setReciterId(Number(e.target.value));
            }}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
          >
            {reciters.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}{r.style ? ` (${r.style})` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {surahs.map((surah, idx) => {
            const isOpen = openSurah === idx;

            return (
              <div key={surah.id} className="section-card">
                <button
                  onClick={() => setOpenSurah(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="text-left">
                    <h3 className="font-heading text-lg font-semibold">{surah.name}</h3>
                    <span className="text-sm text-muted-foreground">{surah.versesCount} versets</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-6 space-y-4 animate-fade-in">
                    {/* Boutons écouter la sourate complète */}
                    {(() => {
                      const isSurahActive = playingVerse?.startsWith(`${surah.quranChapter}:`);
                      return (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (isSurahActive) {
                                togglePause();
                              } else {
                                playSurah(surah.quranChapter);
                              }
                            }}
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium disabled:opacity-50"
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : isSurahActive && isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                            {isSurahActive && isPlaying
                              ? "Pause"
                              : isSurahActive && !isPlaying
                              ? "Reprendre"
                              : "Écouter la sourate"}
                          </button>
                          {isSurahActive && (
                            <button
                              onClick={stop}
                              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors text-sm font-medium"
                            >
                              <Square className="h-4 w-4" />
                              Stop
                            </button>
                          )}
                        </div>
                      );
                    })()}

                    {surah.verses.map((verse, vi) => {
                      const verseKey = `${surah.quranChapter}:${vi + 1}`;
                      const isVerseActive = playingVerse === verseKey;

                      return (
                        <div
                          key={vi}
                          className={`bg-muted/50 rounded-lg p-5 transition-all ${
                            isVerseActive ? "ring-2 ring-primary/50 bg-primary/5" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-1">
                              {vi + 1}
                            </span>
                            <div className="flex-1">
                              <p className="text-foreground font-medium text-lg mb-2 italic">
                                {verse.phonetic}
                              </p>

                              {showDetails[idx] && (
                                <>
                                  <p className="arabic-text text-right mb-2">{verse.arabic}</p>
                                  <p className="text-sm text-muted-foreground">{verse.translation}</p>
                                </>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isVerseActive) {
                                  togglePause();
                                } else {
                                  playVerse(surah.quranChapter, vi);
                                }
                              }}
                              disabled={isLoading}
                              className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                                isVerseActive
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-primary/10 text-primary"
                              }`}
                              aria-label="Écouter le verset"
                            >
                              {isVerseActive && isPlaying ? (
                                <Pause className="h-5 w-5" />
                              ) : (
                                <Volume2 className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <button
                      onClick={() => toggleDetails(idx)}
                      className="w-full text-center text-sm text-primary hover:underline py-2"
                    >
                      {showDetails[idx]
                        ? "Masquer l'arabe et la traduction"
                        : "Afficher l'arabe et la traduction"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SurahsPage;
