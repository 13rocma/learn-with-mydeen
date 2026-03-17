export interface ArabicLetter {
  letter: string;
  name: string;
  phonetic: string;
  /** Prononciation vocalisée pour la synthèse vocale */
  pronunciation: string;
  /** Fichier audio pré-enregistré (voix masculine naturelle) */
  audioFile: string;
  example: string;
  exampleMeaning: string;
}

export const arabicAlphabet: ArabicLetter[] = [
  { letter: "ا", name: "Alif", phonetic: "a / â", pronunciation: "أَلِفْ", audioFile: "/audio/alphabet/alif.mp3", example: "أَسَد", exampleMeaning: "Lion" },
  { letter: "ب", name: "Bâ'", phonetic: "b", pronunciation: "بَا", audioFile: "/audio/alphabet/ba.mp3", example: "بَيْت", exampleMeaning: "Maison" },
  { letter: "ت", name: "Tâ'", phonetic: "t", pronunciation: "تَا", audioFile: "/audio/alphabet/ta.mp3", example: "تُفَّاح", exampleMeaning: "Pomme" },
  { letter: "ث", name: "Thâ'", phonetic: "th (comme think)", pronunciation: "ثَا", audioFile: "/audio/alphabet/tha.mp3", example: "ثَلْج", exampleMeaning: "Neige" },
  { letter: "ج", name: "Jîm", phonetic: "j", pronunciation: "جِيمْ", audioFile: "/audio/alphabet/jiim.mp3", example: "جَمَل", exampleMeaning: "Chameau" },
  { letter: "ح", name: "Hâ'", phonetic: "h aspiré", pronunciation: "حَا", audioFile: "/audio/alphabet/hha.mp3", example: "حِصَان", exampleMeaning: "Cheval" },
  { letter: "خ", name: "Khâ'", phonetic: "kh (jota espagnole)", pronunciation: "خَا", audioFile: "/audio/alphabet/kha.mp3", example: "خُبْز", exampleMeaning: "Pain" },
  { letter: "د", name: "Dâl", phonetic: "d", pronunciation: "دَالْ", audioFile: "/audio/alphabet/daal.mp3", example: "دَار", exampleMeaning: "Maison" },
  { letter: "ذ", name: "Dhâl", phonetic: "dh (comme the)", pronunciation: "ذَالْ", audioFile: "/audio/alphabet/thaal.mp3", example: "ذَهَب", exampleMeaning: "Or" },
  { letter: "ر", name: "Râ'", phonetic: "r roulé", pronunciation: "رَا", audioFile: "/audio/alphabet/ra.mp3", example: "رَجُل", exampleMeaning: "Homme" },
  { letter: "ز", name: "Zây", phonetic: "z", pronunciation: "زَايْ", audioFile: "/audio/alphabet/zay.mp3", example: "زَهْرَة", exampleMeaning: "Fleur" },
  { letter: "س", name: "Sîn", phonetic: "s", pronunciation: "سِينْ", audioFile: "/audio/alphabet/siin.mp3", example: "سَمَاء", exampleMeaning: "Ciel" },
  { letter: "ش", name: "Shîn", phonetic: "sh (ch français)", pronunciation: "شِينْ", audioFile: "/audio/alphabet/shiin.mp3", example: "شَمْس", exampleMeaning: "Soleil" },
  { letter: "ص", name: "Sâd", phonetic: "s emphatique", pronunciation: "صَادْ", audioFile: "/audio/alphabet/saad.mp3", example: "صَبْر", exampleMeaning: "Patience" },
  { letter: "ض", name: "Dâd", phonetic: "d emphatique", pronunciation: "ضَادْ", audioFile: "/audio/alphabet/daad.mp3", example: "ضَوْء", exampleMeaning: "Lumière" },
  { letter: "ط", name: "Tâ'", phonetic: "t emphatique", pronunciation: "طَا", audioFile: "/audio/alphabet/taa.mp3", example: "طَائِر", exampleMeaning: "Oiseau" },
  { letter: "ظ", name: "Dhâ'", phonetic: "dh emphatique", pronunciation: "ظَا", audioFile: "/audio/alphabet/thaa.mp3", example: "ظِلّ", exampleMeaning: "Ombre" },
  { letter: "ع", name: "'Ayn", phonetic: "' (guttural)", pronunciation: "عَيْنْ", audioFile: "/audio/alphabet/ayn.mp3", example: "عَيْن", exampleMeaning: "Œil / Source" },
  { letter: "غ", name: "Ghayn", phonetic: "gh (r parisien)", pronunciation: "غَيْنْ", audioFile: "/audio/alphabet/ghayn.mp3", example: "غَيْم", exampleMeaning: "Nuage" },
  { letter: "ف", name: "Fâ'", phonetic: "f", pronunciation: "فَا", audioFile: "/audio/alphabet/fa.mp3", example: "فِيل", exampleMeaning: "Éléphant" },
  { letter: "ق", name: "Qâf", phonetic: "q (uvulaire)", pronunciation: "قَافْ", audioFile: "/audio/alphabet/qaf.mp3", example: "قَمَر", exampleMeaning: "Lune" },
  { letter: "ك", name: "Kâf", phonetic: "k", pronunciation: "كَافْ", audioFile: "/audio/alphabet/kaf.mp3", example: "كِتَاب", exampleMeaning: "Livre" },
  { letter: "ل", name: "Lâm", phonetic: "l", pronunciation: "لَامْ", audioFile: "/audio/alphabet/lam.mp3", example: "لَيْل", exampleMeaning: "Nuit" },
  { letter: "م", name: "Mîm", phonetic: "m", pronunciation: "مِيمْ", audioFile: "/audio/alphabet/miim.mp3", example: "مَاء", exampleMeaning: "Eau" },
  { letter: "ن", name: "Nûn", phonetic: "n", pronunciation: "نُونْ", audioFile: "/audio/alphabet/nuun.mp3", example: "نَجْم", exampleMeaning: "Étoile" },
  { letter: "ه", name: "Hâ'", phonetic: "h léger", pronunciation: "هَا", audioFile: "/audio/alphabet/ha.mp3", example: "هِلَال", exampleMeaning: "Croissant" },
  { letter: "و", name: "Wâw", phonetic: "w / ou", pronunciation: "وَاوْ", audioFile: "/audio/alphabet/waw.mp3", example: "وَرْد", exampleMeaning: "Rose" },
  { letter: "ي", name: "Yâ'", phonetic: "y / î", pronunciation: "يَا", audioFile: "/audio/alphabet/ya.mp3", example: "يَد", exampleMeaning: "Main" },
];
