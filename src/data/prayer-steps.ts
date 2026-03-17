export interface PrayerStep {
  id: number;
  name: string;
  arabic: string;
  phonetic: string;
  translation: string;
  description: string;
  position: string;
}

export const prayerSteps: PrayerStep[] = [
  {
    id: 1,
    name: "Takbir d'entrée",
    arabic: "اللَّهُ أَكْبَرُ",
    phonetic: "Allâhou Akbar",
    translation: "Allah est le Plus Grand",
    description: "Levez les deux mains au niveau des oreilles ou des épaules, paumes tournées vers la Qibla, et prononcez le Takbir.",
    position: "Debout, mains levées",
  },
  {
    id: 2,
    name: "Position debout (Qiyam)",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
    phonetic: "Subhânaka Allâhoumma wa bihamdika wa tabâraka ismouka wa ta'âlâ jaddouka wa lâ ilâha ghayrouk",
    translation: "Gloire à Toi, ô Allah, et louange à Toi. Béni soit Ton Nom. Exaltée soit Ta Majesté. Il n'y a de divinité que Toi.",
    description: "Posez la main droite sur la main gauche au niveau de la poitrine. Récitez l'invocation d'ouverture.",
    position: "Debout, mains croisées sur la poitrine",
  },
  {
    id: 3,
    name: "Récitation d'Al-Fatiha",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾",
    phonetic: "Bismillâhi r-Rahmâni r-Rahîm. Al-hamdou lillâhi Rabbi l-'âlamîn. Ar-Rahmâni r-Rahîm. Mâliki yawmi d-dîn. Iyyâka na'boudou wa iyyâka nasta'în. Ihdinâ s-sirâta l-moustaqîm. Sirâta lladhîna an'amta 'alayhim ghayri l-maghdoûbi 'alayhim wa lâ d-dâllîn.",
    translation: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux. Louange à Allah, Seigneur des mondes. Le Tout Miséricordieux, le Très Miséricordieux. Maître du Jour de la Rétribution. C'est Toi que nous adorons et c'est Toi dont nous implorons secours. Guide-nous dans le droit chemin. Le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés.",
    description: "Récitez sourate Al-Fatiha. Cette sourate est obligatoire dans chaque unité de prière (rak'a).",
    position: "Debout, mains croisées sur la poitrine",
  },
  {
    id: 4,
    name: "Inclinaison (Rukû')",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    phonetic: "Subhâna Rabbiya l-'Adhîm",
    translation: "Gloire à mon Seigneur le Très Grand",
    description: "Inclinez-vous en posant les mains sur les genoux, le dos droit. Répétez cette invocation 3 fois.",
    position: "Incliné, mains sur les genoux",
  },
  {
    id: 5,
    name: "Redressement",
    arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ، رَبَّنَا وَلَكَ الْحَمْدُ",
    phonetic: "Sami'a Allâhou liman hamidah. Rabbanâ wa laka l-hamd",
    translation: "Allah entend celui qui Le loue. Notre Seigneur, à Toi la louange.",
    description: "Redressez-vous complètement en levant les mains.",
    position: "Debout, bras le long du corps",
  },
  {
    id: 6,
    name: "Prosternation (Sujûd)",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    phonetic: "Subhâna Rabbiya l-A'lâ",
    translation: "Gloire à mon Seigneur le Très Haut",
    description: "Prosternez-vous en touchant le sol avec le front, le nez, les deux mains, les genoux et les orteils. Répétez 3 fois.",
    position: "Prosterné, front au sol",
  },
  {
    id: 7,
    name: "Assise entre les deux prosternations",
    arabic: "رَبِّ اغْفِرْ لِي",
    phonetic: "Rabbi ghfir lî",
    translation: "Seigneur, pardonne-moi",
    description: "Asseyez-vous brièvement entre les deux prosternations.",
    position: "Assis sur les talons",
  },
  {
    id: 8,
    name: "Tashahhud",
    arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ",
    phonetic: "At-tahiyyâtou lillâhi wa s-salawâtou wa t-tayyibât. As-salâmou 'alayka ayyouha n-nabiyyou wa rahmatou llâhi wa barakâtouh. As-salâmou 'alaynâ wa 'alâ 'ibâdi llâhi s-sâlihîn.",
    translation: "Les salutations sont pour Allah, ainsi que les prières et les bonnes œuvres. Que la paix soit sur toi, ô Prophète, ainsi que la miséricorde d'Allah et Ses bénédictions. Que la paix soit sur nous et sur les pieux serviteurs d'Allah.",
    description: "En position assise, récitez le Tashahhud en pointant l'index de la main droite.",
    position: "Assis, index droit levé",
  },
  {
    id: 9,
    name: "Salut final (Taslîm)",
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    phonetic: "As-salâmou 'alaykoum wa rahmatou llâh",
    translation: "Que la paix et la miséricorde d'Allah soient sur vous",
    description: "Tournez la tête à droite puis à gauche en prononçant le salut final.",
    position: "Assis, tête tournée à droite puis à gauche",
  },
];
