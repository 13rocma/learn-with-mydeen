export interface AblutionStep {
  id: number;
  name: string;
  arabic: string;
  phonetic: string;
  translation: string;
  description: string;
  emoji: string;
}

export const ablutionIntro = {
  arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ",
  phonetic: "Yâ ayyouha lladhîna âmanou idhâ qumtum ila s-salâti faghsilou wujoûhakoum...",
  translation: "Ô vous qui croyez ! Lorsque vous vous levez pour la prière, lavez vos visages...",
  source: "Sourate Al-Ma'ida, verset 6",
};

export const ablutionSteps: AblutionStep[] = [
  {
    id: 1,
    name: "L'intention (Niyyah)",
    arabic: "بِسْمِ اللَّهِ",
    phonetic: "Bismillâh",
    translation: "Au nom d'Allah",
    description: "Formulez l'intention dans votre cœur de faire les ablutions pour la prière. Prononcez « Bismillâh » avant de commencer.",
    emoji: "🤲",
  },
  {
    id: 2,
    name: "Laver les mains (3 fois)",
    arabic: "",
    phonetic: "",
    translation: "",
    description: "Lavez les deux mains jusqu'aux poignets trois fois, en commençant par la main droite. Frottez bien entre les doigts.",
    emoji: "✋",
  },
  {
    id: 3,
    name: "Rincer la bouche (3 fois)",
    arabic: "",
    phonetic: "",
    translation: "",
    description: "Prenez de l'eau dans la main droite, rincez-vous la bouche vigoureusement et recrachez. Répétez trois fois.",
    emoji: "👄",
  },
  {
    id: 4,
    name: "Aspirer l'eau dans le nez (3 fois)",
    arabic: "",
    phonetic: "",
    translation: "",
    description: "Aspirez de l'eau dans les narines avec la main droite, puis expulsez-la avec la main gauche. Répétez trois fois.",
    emoji: "👃",
  },
  {
    id: 5,
    name: "Laver le visage (3 fois)",
    arabic: "",
    phonetic: "",
    translation: "",
    description: "Lavez tout le visage trois fois, du front jusqu'au menton et d'une oreille à l'autre.",
    emoji: "😌",
  },
  {
    id: 6,
    name: "Laver les avant-bras (3 fois)",
    arabic: "",
    phonetic: "",
    translation: "",
    description: "Lavez le bras droit du bout des doigts jusqu'au coude inclus, trois fois. Puis le bras gauche de la même manière.",
    emoji: "💪",
  },
  {
    id: 7,
    name: "Essuyer la tête (1 fois)",
    arabic: "",
    phonetic: "",
    translation: "",
    description: "Passez les mains mouillées sur toute la tête, de l'avant vers l'arrière, puis revenez vers l'avant. Une seule fois.",
    emoji: "👦",
  },
  {
    id: 8,
    name: "Essuyer les oreilles (1 fois)",
    arabic: "",
    phonetic: "",
    translation: "",
    description: "Avec les mains encore humides, essuyez l'intérieur des oreilles avec les index et l'extérieur avec les pouces.",
    emoji: "👂",
  },
  {
    id: 9,
    name: "Laver les pieds (3 fois)",
    arabic: "",
    phonetic: "",
    translation: "",
    description: "Lavez le pied droit jusqu'à la cheville trois fois, en frottant entre les orteils. Puis le pied gauche.",
    emoji: "🦶",
  },
  {
    id: 10,
    name: "Invocation finale",
    arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    phonetic: "Ash-hadou an lâ ilâha illa Allâh, wahdahou lâ sharîka lah, wa ash-hadou anna Muhammadan 'abdouhou wa rasoulouh",
    translation: "J'atteste qu'il n'y a de divinité qu'Allah, Seul sans associé, et j'atteste que Muhammad est Son serviteur et Son messager.",
    description: "Après avoir terminé les ablutions, récitez cette invocation en levant les yeux vers le ciel.",
    emoji: "🌙",
  },
];
