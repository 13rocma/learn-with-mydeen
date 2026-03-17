export interface Verse {
  arabic: string;
  phonetic: string;
  translation: string;
}

export interface Surah {
  id: number;
  /** Numéro de la sourate dans le Coran (pour l'API Quran.com) */
  quranChapter: number;
  name: string;
  arabicName: string;
  versesCount: number;
  verses: Verse[];
}

export const surahs: Surah[] = [
  {
    id: 1,
    quranChapter: 1,
    name: "Al-Fatiha (L'Ouverture)",
    arabicName: "الفاتحة",
    versesCount: 7,
    verses: [
      { arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", phonetic: "Bismillâhi r-Rahmâni r-Rahîm", translation: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux" },
      { arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", phonetic: "Al-hamdou lillâhi Rabbi l-'âlamîn", translation: "Louange à Allah, Seigneur des mondes" },
      { arabic: "الرَّحْمَٰنِ الرَّحِيمِ", phonetic: "Ar-Rahmâni r-Rahîm", translation: "Le Tout Miséricordieux, le Très Miséricordieux" },
      { arabic: "مَالِكِ يَوْمِ الدِّينِ", phonetic: "Mâliki yawmi d-dîn", translation: "Maître du Jour de la Rétribution" },
      { arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", phonetic: "Iyyâka na'boudou wa iyyâka nasta'în", translation: "C'est Toi que nous adorons et c'est Toi dont nous implorons secours" },
      { arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", phonetic: "Ihdinâ s-sirâta l-moustaqîm", translation: "Guide-nous dans le droit chemin" },
      { arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", phonetic: "Sirâta lladhîna an'amta 'alayhim ghayri l-maghdoûbi 'alayhim wa lâ d-dâllîn", translation: "Le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés" },
    ],
  },
  {
    id: 2,
    quranChapter: 112,
    name: "Al-Ikhlas (Le Monothéisme Pur)",
    arabicName: "الإخلاص",
    versesCount: 4,
    verses: [
      { arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", phonetic: "Qoul houwa Allâhou ahad", translation: "Dis : « Il est Allah, Unique »" },
      { arabic: "اللَّهُ الصَّمَدُ", phonetic: "Allâhou s-samad", translation: "Allah, Le Seul à être imploré" },
      { arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", phonetic: "Lam yalid wa lam yoûlad", translation: "Il n'a jamais engendré, n'a pas été engendré" },
      { arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", phonetic: "Wa lam yakoun lahou koufouwan ahad", translation: "Et nul n'est égal à Lui" },
    ],
  },
  {
    id: 3,
    quranChapter: 113,
    name: "Al-Falaq (L'Aube Naissante)",
    arabicName: "الفلق",
    versesCount: 5,
    verses: [
      { arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", phonetic: "Qoul a'oûdhou bi Rabbi l-falaq", translation: "Dis : « Je cherche protection auprès du Seigneur de l'aube naissante »" },
      { arabic: "مِن شَرِّ مَا خَلَقَ", phonetic: "Min sharri mâ khalaq", translation: "Contre le mal de ce qu'Il a créé" },
      { arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", phonetic: "Wa min sharri ghâsiqin idhâ waqab", translation: "Contre le mal de l'obscurité quand elle s'approfondit" },
      { arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", phonetic: "Wa min sharri n-naffâthâti fi l-'ouqad", translation: "Contre le mal de celles qui soufflent sur les nœuds" },
      { arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", phonetic: "Wa min sharri hâsidin idhâ hasad", translation: "Contre le mal de l'envieux quand il envie" },
    ],
  },
  {
    id: 4,
    quranChapter: 114,
    name: "An-Nas (Les Hommes)",
    arabicName: "الناس",
    versesCount: 6,
    verses: [
      { arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", phonetic: "Qoul a'oûdhou bi Rabbi n-nâs", translation: "Dis : « Je cherche protection auprès du Seigneur des hommes »" },
      { arabic: "مَلِكِ النَّاسِ", phonetic: "Maliki n-nâs", translation: "Le Souverain des hommes" },
      { arabic: "إِلَٰهِ النَّاسِ", phonetic: "Ilâhi n-nâs", translation: "Le Dieu des hommes" },
      { arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", phonetic: "Min sharri l-waswâsi l-khannâs", translation: "Contre le mal du mauvais conseiller furtif" },
      { arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", phonetic: "Alladhî youwaswisou fî soudoûri n-nâs", translation: "Qui souffle dans les poitrines des hommes" },
      { arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", phonetic: "Mina l-jinnati wa n-nâs", translation: "Qu'il soit djinn ou humain" },
    ],
  },
  {
    id: 5,
    quranChapter: 108,
    name: "Al-Kawthar (L'Abondance)",
    arabicName: "الكوثر",
    versesCount: 3,
    verses: [
      { arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", phonetic: "Innâ a'taynâka l-kawthar", translation: "Nous t'avons certes accordé l'Abondance" },
      { arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", phonetic: "Fa salli li Rabbika wa nhar", translation: "Accomplis la prière pour ton Seigneur et sacrifie" },
      { arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", phonetic: "Inna shâni'aka houwa l-abtar", translation: "Celui qui te hait sera le privé de postérité" },
    ],
  },
  {
    id: 6,
    quranChapter: 103,
    name: "Al-Asr (Le Temps)",
    arabicName: "العصر",
    versesCount: 3,
    verses: [
      { arabic: "وَالْعَصْرِ", phonetic: "Wa l-'asr", translation: "Par le Temps !" },
      { arabic: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", phonetic: "Inna l-insâna lafî khousr", translation: "L'homme est certes en perdition" },
      { arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", phonetic: "Illa lladhîna âmanoû wa 'amiloû s-sâlihâti wa tawâsaw bi l-haqqi wa tawâsaw bi s-sabr", translation: "Sauf ceux qui croient et accomplissent de bonnes œuvres, s'enjoignent mutuellement la vérité et s'enjoignent mutuellement la patience" },
    ],
  },
];
