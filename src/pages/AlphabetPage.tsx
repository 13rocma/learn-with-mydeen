import { useState, useCallback, useRef } from "react";
import { arabicAlphabet } from "@/data/alphabet";
import { Volume2 } from "lucide-react";
import PageHeroBanner from "@/components/PageHeroBanner";

const AlphabetPage = () => {
  const [speaking, setSpeaking] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speakLetter = useCallback((letterName: string, audioFile: string) => {
    setSpeaking(letterName);

    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    const audio = new Audio(audioFile);
    audioRef.current = audio;
    audio.onended = () => setSpeaking(null);
    audio.onerror = () => setSpeaking(null);
    audio.play().catch(() => setSpeaking(null));
  }, []);

  return (
    <div className="min-h-screen">
      <PageHeroBanner title="Alphabet Arabe" subtitle="Apprenez à reconnaître et prononcer les 28 lettres — cliquez pour écouter" />
      <div className="container mx-auto px-4 max-w-4xl py-6">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {arabicAlphabet.map((item) => {
            const isActive = speaking === item.name;
            return (
              <button
                key={item.name}
                onClick={() => speakLetter(item.name, item.audioFile)}
                className={`section-card text-center group cursor-pointer transition-all ${
                  isActive
                    ? "border-primary/50 ring-2 ring-primary/20"
                    : "hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Volume2
                    className={`h-4 w-4 text-primary transition-opacity ${
                      isActive ? "opacity-100 animate-pulse" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </div>
                <p className="font-heading font-semibold text-lg text-primary mb-1">{item.name}</p>
                <p className="phonetic-text text-base md:text-lg font-bold mb-2">[{item.phonetic}]</p>
                <p className="font-arabic text-3xl text-foreground/60 transition-transform group-hover:scale-110">
                  {item.letter}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlphabetPage;
