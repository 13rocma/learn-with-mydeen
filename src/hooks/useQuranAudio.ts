import { useState, useRef, useCallback, useEffect } from "react";

export interface Reciter {
  id: number;
  name: string;
  style: string | null;
}

// Récitateurs populaires avec leurs IDs Quran.com
export const RECITERS: Reciter[] = [
  { id: 7, name: "Mishary Rashid Alafasy", style: null },
  { id: 5, name: "Abu Bakr al-Shatri", style: null },
  { id: 1, name: "AbdulBaset AbdulSamad", style: "Murattal" },
  { id: 2, name: "AbdulBaset AbdulSamad", style: "Mujawwad" },
  { id: 4, name: "Al-Husary", style: null },
];

const AUDIO_BASE = "https://api.quran.com/api/v4";

interface AudioFile {
  verse_key: string;
  url: string;
}

export function useQuranAudio() {
  const [reciterId, setReciterId] = useState<number>(RECITERS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingVerse, setPlayingVerse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const verseQueueRef = useRef<AudioFile[]>([]);
  const currentIndexRef = useRef(0);
  const isPausedRef = useRef(false);

  const stop = useCallback(() => {
    isPausedRef.current = false;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.src = "";
    }
    setIsPlaying(false);
    setPlayingVerse(null);
    verseQueueRef.current = [];
    currentIndexRef.current = 0;
  }, []);

  const togglePause = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused && isPausedRef.current) {
      isPausedRef.current = false;
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    } else {
      isPausedRef.current = true;
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const fetchVerseAudio = useCallback(
    async (chapterNumber: number): Promise<AudioFile[]> => {
      const res = await fetch(
        `${AUDIO_BASE}/recitations/${reciterId}/by_chapter/${chapterNumber}`
      );
      if (!res.ok) throw new Error("Erreur lors du chargement audio");
      const data = await res.json();
      return (data.audio_files || []).map((f: any) => ({
        verse_key: f.verse_key,
        url: f.url.startsWith("http") ? f.url : `https://verses.quran.com/${f.url}`,
      }));
    },
    [reciterId]
  );

  const playNext = useCallback(() => {
    if (isPausedRef.current) return;

    const queue = verseQueueRef.current;
    const idx = currentIndexRef.current;

    if (idx >= queue.length) {
      stop();
      return;
    }

    const file = queue[idx];
    setPlayingVerse(file.verse_key);
    setIsPlaying(true);

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.src = file.url;
    audio.onended = () => {
      currentIndexRef.current += 1;
      playNext();
    };
    audio.onerror = () => {
      console.error("Erreur audio pour", file.verse_key);
      currentIndexRef.current += 1;
      playNext();
    };
    audio.play().catch(console.error);
  }, [stop]);

  const playSurah = useCallback(
    async (chapterNumber: number) => {
      stop();
      isPausedRef.current = false;
      setIsLoading(true);
      try {
        const files = await fetchVerseAudio(chapterNumber);
        if (files.length === 0) return;
        verseQueueRef.current = files;
        currentIndexRef.current = 0;
        playNext();
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchVerseAudio, playNext, stop]
  );

  const playVerse = useCallback(
    async (chapterNumber: number, verseIndex: number) => {
      stop();
      isPausedRef.current = false;
      setIsLoading(true);
      try {
        const files = await fetchVerseAudio(chapterNumber);
        const target = files[verseIndex];
        if (!target) return;
        verseQueueRef.current = [target];
        currentIndexRef.current = 0;
        playNext();
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchVerseAudio, playNext, stop]
  );

  return {
    reciterId,
    setReciterId,
    isPlaying,
    playingVerse,
    isLoading,
    playSurah,
    playVerse,
    stop,
    togglePause,
    reciters: RECITERS,
  };
}
