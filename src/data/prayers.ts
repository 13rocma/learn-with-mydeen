export interface PrayerConfig {
  id: string;
  name: string;
  nameAr: string;
  rakaCount: number;
  description: string;
}

export const prayers: PrayerConfig[] = [
  { id: "fajr", name: "Fajr (Sobh)", nameAr: "الفجر", rakaCount: 2, description: "Prière de l'aube — 2 rak'at" },
  { id: "dhuhr", name: "Dhuhr", nameAr: "الظهر", rakaCount: 4, description: "Prière de midi — 4 rak'at" },
  { id: "asr", name: "Asr", nameAr: "العصر", rakaCount: 4, description: "Prière de l'après-midi — 4 rak'at" },
  { id: "maghrib", name: "Maghrib", nameAr: "المغرب", rakaCount: 3, description: "Prière du coucher du soleil — 3 rak'at" },
  { id: "isha", name: "Isha", nameAr: "العشاء", rakaCount: 4, description: "Prière de la nuit — 4 rak'at" },
];

export type PrayerPosition = "standing" | "hands-raised" | "hands-chest" | "bowing" | "standing-up" | "prostrating" | "sitting" | "sitting-tashahhud" | "salam";

export interface PrayerAnimStep {
  id: number;
  name: string;
  arabic: string;
  phonetic: string;
  translation: string;
  description: string;
  position: PrayerPosition;
  durationMs: number;
  repeat?: number;
}

// Full sequence for one rak'a
export const rakaaSteps: PrayerAnimStep[] = [
  {
    id: 1,
    name: "Takbir d'entrée",
    arabic: "ٱللَّهُ أَكْبَرُ",
    phonetic: "Allâhou Akbar",
    translation: "Allah est le Plus Grand",
    description: "Levez les mains au niveau des oreilles et prononcez le Takbir.",
    position: "hands-raised",
    durationMs: 3000,
  },
  {
    id: 3,
    name: "Al-Fatiha",
    arabic: "",
    phonetic: "Bismillâhi r-Rahmâni r-Rahîm (1) Al-hamdou lillâhi Rabbi l-'âlamîn (2) Ar-Rahmâni r-Rahîm (3) Mâliki yawmi d-dîn (4) Iyyâka na'boudou wa iyyâka nasta'în (5) Ihdina s-sirâta l-moustaqîm (6) Sirâta l-ladhîna an'amta 'alayhim, ghayri l-maghdoubi 'alayhim wa la d-dâllîn (7)",
    translation: "",
    description: "Récitez sourate Al-Fatiha.",
    position: "hands-chest",
    durationMs: 12000,
  },
  {
    id: 4,
    name: "Takbir — Rukû'",
    arabic: "ٱللَّهُ أَكْبَرُ",
    phonetic: "Allâhou Akbar",
    translation: "Allah est le Plus Grand",
    description: "Dites Allahu Akbar en vous inclinant.",
    position: "hands-raised",
    durationMs: 2000,
  },
  {
    id: 5,
    name: "Inclinaison (Rukû')",
    arabic: "سُبۡحَـٰنَ رَبِّىَ ٱلۡعَظِيمِ",
    phonetic: "Subhâna Rabbiya l-'Adhîm",
    translation: "Gloire à mon Seigneur le Très Grand",
    description: "Mains sur les genoux, dos droit. Répétez 3 fois.",
    position: "bowing",
    durationMs: 6000,
    repeat: 3,
  },
  {
    id: 6,
    name: "Redressement",
    arabic: "سَمِعَ ٱللَّهُ لِمَنۡ حَمِدَهُ ، رَبَّنَا وَلَكَ ٱلۡحَمۡدُ",
    phonetic: "Sami'a Allâhou liman hamidah. Rabbanâ wa laka l-hamd",
    translation: "Allah entend celui qui Le loue. Notre Seigneur, à Toi la louange.",
    description: "Redressez-vous complètement.",
    position: "standing-up",
    durationMs: 4000,
  },
  {
    id: 7,
    name: "Takbir — Sujûd",
    arabic: "ٱللَّهُ أَكْبَرُ",
    phonetic: "Allâhou Akbar",
    translation: "Allah est le Plus Grand",
    description: "Dites Allahu Akbar en vous prosternant.",
    position: "hands-raised",
    durationMs: 2000,
  },
  {
    id: 8,
    name: "1ère Prosternation (Sujûd)",
    arabic: "سُبۡحَـٰنَ رَبِّىَ ٱلۡأَعۡلَىٰ",
    phonetic: "Subhâna Rabbiya l-A'lâ",
    translation: "Gloire à mon Seigneur le Très Haut",
    description: "Front au sol, répétez 3 fois.",
    position: "prostrating",
    durationMs: 6000,
    repeat: 3,
  },
  {
    id: 9,
    name: "Assise entre les deux prosternations",
    arabic: "رَبِّ ٱغۡفِرۡ لِى",
    phonetic: "Rabbi ghfir lî",
    translation: "Seigneur, pardonne-moi",
    description: "Asseyez-vous brièvement sur les talons.",
    position: "sitting",
    durationMs: 4000,
  },
  {
    id: 10,
    name: "Takbir — 2ème Sujûd",
    arabic: "ٱللَّهُ أَكْبَرُ",
    phonetic: "Allâhou Akbar",
    translation: "Allah est le Plus Grand",
    description: "Dites Allahu Akbar en vous prosternant pour la deuxième prosternation.",
    position: "prostrating",
    durationMs: 2000,
  },
  {
    id: 11,
    name: "2ème Prosternation",
    arabic: "سُبۡحَـٰنَ رَبِّىَ ٱلۡأَعۡلَىٰ",
    phonetic: "Subhâna Rabbiya l-A'lâ",
    translation: "Gloire à mon Seigneur le Très Haut",
    description: "Deuxième prosternation, répétez 3 fois.",
    position: "prostrating",
    durationMs: 6000,
    repeat: 3,
  },
];

export const additionalSurahStep: PrayerAnimStep = {
  id: 50,
  name: "Récitation d'une sourate",
  arabic: "",
  phonetic: "Récitez une sourate de votre choix après Al-Fatiha",
  translation: "",
  description: "Après Al-Fatiha, récitez une autre sourate du Coran (ex : Al-Ikhlass, Al-Falaq, An-Nass…). Ceci est requis uniquement dans les deux premières rak'at.",
  position: "hands-chest",
  durationMs: 8000,
};
export const tashahhudStep: PrayerAnimStep = {
  id: 100,
  name: "Tashahhud",
  arabic: "ٱلتَّحِيَّـٰتُ لِلَّهِ وَٱلصَّلَوَٰتُ وَٱلطَّيِّبَـٰتُ، ٱلسَّلَـٰمُ عَلَيۡكَ أَيُّهَا ٱلنَّبِيُّ وَرَحۡمَةُ ٱللَّهِ وَبَرَكَـٰتُهُ، ٱلسَّلَـٰمُ عَلَيۡنَا وَعَلَىٰ عِبَادِ ٱللَّهِ ٱلصَّـٰلِحِينَ، أَشۡهَدُ أَن لَّا إِلَـٰهَ إِلَّا ٱللَّهُ وَأَشۡهَدُ أَنَّ مُحَمَّدًا عَبۡدُهُ وَرَسُولُهُ",
  phonetic: "At-tahiyyâtou lillâhi wa s-salawâtou wa t-tayyibât. As-salâmou 'alayka ayyouha n-nabiyyou wa rahmatou llâhi wa barakâtouh. As-salâmou 'alaynâ wa 'alâ 'ibâdi llâhi s-sâlihîn. Ash-hadou an lâ ilâha illa llâh, wa ash-hadou anna Muhammadan 'abdouhou wa rasoulouh.",
  translation: "Les salutations sont pour Allah, ainsi que les prières et les bonnes œuvres. Que la paix soit sur toi, ô Prophète, ainsi que la miséricorde d'Allah et Ses bénédictions. Que la paix soit sur nous et sur les pieux serviteurs d'Allah. J'atteste qu'il n'y a de divinité qu'Allah et j'atteste que Muhammad est Son serviteur et Son messager.",
  description: "Assis, index droit levé, récitez le Tashahhud.",
  position: "sitting-tashahhud",
  durationMs: 10000,
};

export const tashahhudFinalStep: PrayerAnimStep = {
  id: 102,
  name: "Tashahhud final + Salât 'ala n-Nabî",
  arabic: "ٱلتَّحِيَّـٰتُ لِلَّهِ وَٱلصَّلَوَٰتُ وَٱلطَّيِّبَـٰتُ... ٱللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ...",
  phonetic: "At-tahiyyâtou lillâhi wa s-salawâtou wa t-tayyibât. As-salâmou 'alayka ayyouha n-nabiyyou wa rahmatou llâhi wa barakâtouh. As-salâmou 'alaynâ wa 'alâ 'ibâdi llâhi s-sâlihîn. Ash-hadou an lâ ilâha illa llâh, wa ash-hadou anna Muhammadan 'abdouhou wa rasoulouh. Allouhoumma salli 'ala Mouhammadin, wa 'ala Âli Mouhammadin, kama sallayta 'ala Ibrâhima wa 'ala Âli Ibrâhima, innaka Hamîdoun Majîd. Wa Bârik 'ala Mouhammadin wa 'ala Âli Mouhammadin, kama Bârakta 'ala Ibrâhima wa 'ala Âli Ibrâhima, innaka Hamîdoun Majîd.",
  translation: "Les salutations sont pour Allah... Ô Allah, prie sur Muhammad et sur la famille de Muhammad, comme Tu as prié sur Ibrahim et sur la famille d'Ibrahim. Tu es certes Digne de louange et de gloire. Et bénis Muhammad et la famille de Muhammad, comme Tu as béni Ibrahim et la famille d'Ibrahim. Tu es certes Digne de louange et de gloire.",
  description: "Assis, index droit levé, récitez le Tashahhud complet suivi de la Salât 'ala n-Nabî (Darûd).",
  position: "sitting-tashahhud",
  durationMs: 18000,
};

export const salamStep: PrayerAnimStep = {
  id: 101,
  name: "Salut final (Taslîm)",
  arabic: "ٱلسَّلَـٰمُ عَلَيۡكُمۡ وَرَحۡمَةُ ٱللَّهِ",
  phonetic: "As-salâmou 'alaykoum wa rahmatou llâh",
  translation: "Que la paix et la miséricorde d'Allah soient sur vous",
  description: "Tournez la tête à droite puis à gauche.",
  position: "salam",
  durationMs: 6000,
};

export const iqamaStep: PrayerAnimStep = {
  id: 200,
  name: "Iqama (Appel à la prière)",
  arabic: "ٱللَّهُ أَكْبَرُ ٱللَّهُ أَكْبَرُ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ، أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّهِ، حَيَّ عَلَى ٱلصَّلَاةِ، حَيَّ عَلَى ٱلْفَلَاحِ، قَدْ قَامَتِ ٱلصَّلَاةُ قَدْ قَامَتِ ٱلصَّلَاةُ، ٱللَّهُ أَكْبَرُ ٱللَّهُ أَكْبَرُ، لَا إِلَٰهَ إِلَّا ٱللَّهُ",
  phonetic: "Allâhou Akbar, Allâhou Akbar. Ash-hadou an lâ ilâha illa llâh. Ash-hadou anna Muhammadan rasoulou llâh. Hayya 'ala s-salâh. Hayya 'ala l-falâh. Qad qâmati s-salâh, qad qâmati s-salâh. Allâhou Akbar, Allâhou Akbar. Lâ ilâha illa llâh.",
  translation: "Allah est le Plus Grand. J'atteste qu'il n'y a de divinité qu'Allah. J'atteste que Muhammad est le messager d'Allah. Venez à la prière. Venez au succès. La prière est établie. Allah est le Plus Grand. Il n'y a de divinité qu'Allah.",
  description: "L'Iqama est le second appel à la prière, prononcé juste avant de commencer. Tenez-vous debout face à la Qibla.",
  position: "standing",
  durationMs: 15000,
};

/**
 * Build the full prayer sequence based on raka count.
 * Tashahhud after 2nd raka and last raka. Salam at the end.
 */
export function buildPrayerSequence(rakaCount: number): PrayerAnimStep[] {
  const steps: PrayerAnimStep[] = [];
  let stepId = 1;

  for (let raka = 1; raka <= rakaCount; raka++) {
    const rakaSteps = rakaaSteps;

    rakaSteps.forEach(s => {
      steps.push({ ...s, id: stepId++, name: `Rak'a ${raka} — ${s.name}` });

      // After Al-Fatiha in rak'a 1 & 2, add additional surah
      if (s.name === "Al-Fatiha" && raka <= 2) {
        steps.push({ ...additionalSurahStep, id: stepId++, name: `Rak'a ${raka} — Récitation d'une sourate` });
      }
    });

    // Add tashahhud after 2nd raka (intermediate) and last raka (final with Darud)
    if (raka === 2 && raka !== rakaCount) {
      steps.push({ ...tashahhudStep, id: stepId++, name: "Tashahhud (milieu)" });
    }
    if (raka === rakaCount) {
      steps.push({ ...tashahhudFinalStep, id: stepId++, name: "Tashahhud final + Salât 'ala n-Nabî" });
    }
  }

  steps.push({ ...salamStep, id: stepId++ });
  return steps;
}
