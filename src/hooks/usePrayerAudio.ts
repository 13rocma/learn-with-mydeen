import { useRef, useCallback, useEffect, useState } from "react";

const AUDIO_BASE = "https://api.quran.com/api/v4";
const VERSE_CDN = "https://verses.quran.com/";
const DEFAULT_RECITER = 7; // Mishary Rashid Alafasy

const audioCache = new Map<string, string[]>();

// Pre-recorded audio files from real reciters (male voice)
const PRAYER_AUDIO_FILES: Record<string, string> = {
  takbir: "/audio/takbir.mp3",
  ruku: "/audio/ruku.mp3",
  qawmah: "/audio/qawmah.mp3",
  sajdah: "/audio/sajdah.mp3",
  jalsah: "/audio/jalsah.mp3",
  tashahud: "/audio/tashahud.mp3",
  tashahud2: "/audio/tashahud2.mp3",
  salam: "/audio/salam.mp3",
  darud: "/audio/darud.mp3",
  iqama: "/audio/iqama.mp3",
};

async function fetchChapterAudioUrls(chapter: number, reciterId = DEFAULT_RECITER): Promise<string[]> {
  const key = `${reciterId}-${chapter}`;
  if (audioCache.has(key)) return audioCache.get(key)!;
  const res = await fetch(`${AUDIO_BASE}/recitations/${reciterId}/by_chapter/${chapter}`);
  if (!res.ok) return [];
  const data = await res.json();
  const urls = (data.audio_files || []).map((f: any) =>
    f.url.startsWith("http") ? f.url : `${VERSE_CDN}${f.url}`
  );
  audioCache.set(key, urls);
  return urls;
}

export type PrayerAudioType =
  | { kind: "quran"; chapter: number }
  | { kind: "recorded"; file: string }
  | { kind: "none" };

export function getStepAudioType(stepName: string): PrayerAudioType {
  const lower = stepName.toLowerCase();

  if (lower.includes("al-fatiha")) {
    return { kind: "quran", chapter: 1 };
  }
  if (lower.includes("récitation d'une sourate")) {
    return { kind: "quran", chapter: 112 };
  }
  if (lower.includes("takbir")) {
    return { kind: "recorded", file: PRAYER_AUDIO_FILES.takbir };
  }
  if (lower.includes("inclinaison") || lower.includes("rukû")) {
    return { kind: "recorded", file: PRAYER_AUDIO_FILES.ruku };
  }
  if (lower.includes("redressement")) {
    return { kind: "recorded", file: PRAYER_AUDIO_FILES.qawmah };
  }
  if (lower.includes("assise entre")) {
    return { kind: "recorded", file: PRAYER_AUDIO_FILES.takbir };
  }
  if (lower.includes("prosternation") || lower.includes("sujûd")) {
    return { kind: "recorded", file: PRAYER_AUDIO_FILES.sajdah };
  }
  if (lower.includes("tashahhud final")) {
    return { kind: "recorded", file: PRAYER_AUDIO_FILES.tashahud2 };
  }
  if (lower.includes("tashahhud")) {
    return { kind: "recorded", file: PRAYER_AUDIO_FILES.tashahud };
  }
  if (lower.includes("salut final") || lower.includes("taslîm")) {
    return { kind: "recorded", file: PRAYER_AUDIO_FILES.salam };
  }
  if (lower.includes("iqama") || lower.includes("appel")) {
    return { kind: "recorded", file: PRAYER_AUDIO_FILES.iqama };
  }

  return { kind: "none" };
}

export function usePrayerAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const isPausedRef = useRef(false);
  const queueRef = useRef<string[]>([]);
  const queueIndexRef = useRef(0);
  const activeTypeRef = useRef<"quran" | "tts" | "none">("none");

  const stopAudio = useCallback(() => {
    isPausedRef.current = false;
    activeTypeRef.current = "none";
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.src = "";
    }
    queueRef.current = [];
    queueIndexRef.current = 0;
    setIsAudioPlaying(false);
  }, []);

  const pauseAudio = useCallback(() => {
    isPausedRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsAudioPlaying(false);
  }, []);

  const resumeAudio = useCallback(() => {
    isPausedRef.current = false;
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
    setIsAudioPlaying(true);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const playAudioQueue = useCallback((urls: string[], onDone: () => void) => {
    queueRef.current = urls;
    queueIndexRef.current = 0;

    const playNextUrl = () => {
      if (isPausedRef.current) return;
      const idx = queueIndexRef.current;
      if (idx >= queueRef.current.length) {
        setIsAudioPlaying(false);
        onDone();
        return;
      }
      if (!audioRef.current) audioRef.current = new Audio();
      const audio = audioRef.current;
      audio.src = queueRef.current[idx];
      audio.onended = () => {
        queueIndexRef.current += 1;
        playNextUrl();
      };
      audio.onerror = () => {
        queueIndexRef.current += 1;
        playNextUrl();
      };
      audio.play().catch(console.error);
    };

    setIsAudioPlaying(true);
    playNextUrl();
  }, []);

  const playStepAudio = useCallback(
    (stepName: string): Promise<void> => {
      return new Promise(async (resolve) => {
        stopAudio();
        const audioType = getStepAudioType(stepName);

        if (audioType.kind === "none") {
          resolve();
          return;
        }

        if (audioType.kind === "quran") {
          activeTypeRef.current = "quran";
          const urls = await fetchChapterAudioUrls(audioType.chapter);
          if (urls.length === 0) {
            resolve();
            return;
          }
          playAudioQueue(urls, resolve);
          return;
        }

        if (audioType.kind === "recorded") {
          activeTypeRef.current = "tts";
          playAudioQueue([audioType.file], resolve);
        }
      });
    },
    [stopAudio, playAudioQueue]
  );

  return {
    playStepAudio,
    stopAudio,
    pauseAudio,
    resumeAudio,
    isAudioPlaying,
  };
}
