export interface BasicQuestion {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const basicsCategories = [
  "Les fondements",
  "Les piliers de l'Islam",
  "Les piliers de la foi",
  "Le Prophète ﷺ",
];

export const basicsQuestions: BasicQuestion[] = [
  // Les fondements
  {
    id: 1,
    category: "Les fondements",
    question: "Qui est Allah ?",
    answer:
      "Allah est le nom de Dieu en arabe. Il est le Créateur unique de l'univers, sans associé ni égal. Il est Tout-Puissant, Tout-Miséricordieux, et Il est le seul digne d'être adoré. Les musulmans croient qu'Il a envoyé des prophètes et des messagers pour guider l'humanité.",
  },
  {
    id: 2,
    category: "Les fondements",
    question: "Qu'est-ce que l'Islam ?",
    answer:
      "L'Islam signifie « soumission à la volonté de Dieu ». C'est une religion monothéiste révélée au Prophète Muhammad ﷺ au 7e siècle. Elle repose sur le Coran (parole de Dieu) et la Sunna (tradition prophétique). L'Islam enseigne l'unicité de Dieu, la justice, la compassion et la fraternité.",
  },
  {
    id: 3,
    category: "Les fondements",
    question: "Qu'est-ce que le Coran ?",
    answer:
      "Le Coran est le livre saint des musulmans. Il est considéré comme la parole d'Allah, révélée au Prophète Muhammad ﷺ par l'ange Gabriel (Jibrîl) sur une période de 23 ans. Il contient 114 sourates (chapitres) et guide les croyants dans tous les aspects de leur vie.",
  },
  {
    id: 4,
    category: "Les fondements",
    question: "Qu'est-ce que la Shahada (l'attestation de foi) ?",
    answer:
      "La Shahada est la déclaration de foi : « Ash-hadou an lâ ilâha illa Allâh, wa ash-hadou anna Muhammadan rasûlou Allâh » — « J'atteste qu'il n'y a de divinité digne d'adoration qu'Allah, et j'atteste que Muhammad est le messager d'Allah. » C'est le premier pilier de l'Islam et l'acte par lequel on entre dans la religion.",
  },

  // Les 5 piliers de l'Islam
  {
    id: 5,
    category: "Les piliers de l'Islam",
    question: "Quels sont les 5 piliers de l'Islam ?",
    answer:
      "Les cinq piliers sont les fondements de la pratique musulmane :\n\n1. La Shahada — l'attestation de foi\n2. La Salat — les 5 prières quotidiennes\n3. La Zakat — l'aumône obligatoire\n4. Le Sawm — le jeûne du mois de Ramadan\n5. Le Hajj — le pèlerinage à La Mecque (pour celui qui en a la capacité)",
  },
  {
    id: 6,
    category: "Les piliers de l'Islam",
    question: "Qu'est-ce que la Salat (prière) ?",
    answer:
      "La Salat est la prière rituelle que chaque musulman doit accomplir 5 fois par jour : Fajr (aube), Dhuhr (midi), Asr (après-midi), Maghrib (coucher du soleil) et Isha (nuit). C'est un moment de connexion directe avec Allah, sans intermédiaire.",
  },
  {
    id: 7,
    category: "Les piliers de l'Islam",
    question: "Qu'est-ce que la Zakat ?",
    answer:
      "La Zakat est l'aumône obligatoire. Chaque musulman possédant une richesse au-delà d'un certain seuil (le nisâb) doit donner 2,5% de ses économies annuelles aux personnes dans le besoin. C'est un acte de purification de la richesse et de solidarité.",
  },
  {
    id: 8,
    category: "Les piliers de l'Islam",
    question: "Qu'est-ce que le jeûne du Ramadan ?",
    answer:
      "Le jeûne du Ramadan (Sawm) consiste à s'abstenir de manger, boire et avoir des relations intimes du lever au coucher du soleil durant le mois de Ramadan. C'est un mois de purification spirituelle, de générosité et de rapprochement avec Allah.",
  },
  {
    id: 9,
    category: "Les piliers de l'Islam",
    question: "Qu'est-ce que le Hajj ?",
    answer:
      "Le Hajj est le pèlerinage à La Mecque (Arabie Saoudite) que tout musulman ayant les moyens physiques et financiers doit accomplir au moins une fois dans sa vie. Il se déroule chaque année durant le mois de Dhoul Hijja.",
  },

  // Les 6 piliers de la foi
  {
    id: 10,
    category: "Les piliers de la foi",
    question: "Quels sont les 6 piliers de la foi ?",
    answer:
      "Les six piliers de la foi (Arkân al-Îmân) sont :\n\n1. Croire en Allah\n2. Croire en Ses anges\n3. Croire en Ses livres révélés\n4. Croire en Ses prophètes et messagers\n5. Croire au Jour du Jugement\n6. Croire au destin (Qadar), qu'il soit bon ou mauvais",
  },
  {
    id: 11,
    category: "Les piliers de la foi",
    question: "Qui sont les anges en Islam ?",
    answer:
      "Les anges sont des créatures de lumière créées par Allah. Ils n'ont ni libre arbitre ni désirs personnels et obéissent parfaitement à Allah. Parmi les anges connus : Jibrîl (Gabriel, qui apporte la révélation), Mîkâ'îl (qui gère les provisions), Isrâfîl (qui soufflera dans la trompe) et Malak al-Mawt (l'ange de la mort).",
  },
  {
    id: 12,
    category: "Les piliers de la foi",
    question: "Quels sont les livres révélés ?",
    answer:
      "Allah a révélé plusieurs livres à Ses prophètes :\n\n• Les Feuillets (Suhuf) d'Ibrahim\n• La Torah (Tawrât) à Moïse\n• Les Psaumes (Zabûr) à David\n• L'Évangile (Injîl) à Jésus\n• Le Coran à Muhammad ﷺ\n\nLes musulmans croient que le Coran est le dernier message divin, préservé dans sa forme originale.",
  },
  {
    id: 13,
    category: "Les piliers de la foi",
    question: "Qu'est-ce que le Jour du Jugement ?",
    answer:
      "Le Jour du Jugement (Yawm al-Qiyâma) est le jour où Allah ressuscitera toute l'humanité pour la juger selon ses actes. Les bonnes actions et les mauvaises seront pesées sur une balance. Ceux qui auront bien agi entreront au Paradis, et ceux qui auront mal agi seront châtiés, sauf si Allah leur pardonne.",
  },
  {
    id: 14,
    category: "Les piliers de la foi",
    question: "Qu'est-ce que le destin (Qadar) ?",
    answer:
      "Croire au Qadar signifie accepter que tout ce qui arrive — le bien comme le mal — est décrété par Allah. Cela ne signifie pas que l'homme n'a pas de libre arbitre, mais que la connaissance d'Allah englobe toute chose. Le croyant accepte les épreuves avec patience et les bienfaits avec gratitude.",
  },

  // Le Prophète ﷺ
  {
    id: 15,
    category: "Le Prophète ﷺ",
    question: "Qui est le Prophète Muhammad ﷺ ?",
    answer:
      "Muhammad ﷺ (paix et bénédictions sur lui) est le dernier prophète et messager d'Allah, envoyé à toute l'humanité. Né à La Mecque en 570 après J.-C., il a reçu la première révélation du Coran à l'âge de 40 ans. Il est un modèle de comportement, de justice, de compassion et de piété pour tous les musulmans.",
  },
  {
    id: 16,
    category: "Le Prophète ﷺ",
    question: "Qu'est-ce que la Sunna ?",
    answer:
      "La Sunna désigne l'ensemble des paroles, actes et approbations du Prophète Muhammad ﷺ. Elle constitue la deuxième source de législation en Islam après le Coran. Les hadiths sont les récits qui rapportent la Sunna et guident les musulmans dans leur pratique quotidienne.",
  },
  {
    id: 17,
    category: "Le Prophète ﷺ",
    question: "Pourquoi dit-on ﷺ après le nom du Prophète ?",
    answer:
      "Le symbole ﷺ signifie « Salla Allâhou 'alayhi wa sallam » — « Que la paix et les bénédictions d'Allah soient sur lui ». C'est une marque de respect et d'amour que les musulmans prononcent chaque fois que le nom du Prophète est mentionné, conformément à l'ordre d'Allah dans le Coran (sourate 33, verset 56).",
  },

  // Questions supplémentaires — Les fondements
  {
    id: 19,
    category: "Les fondements",
    question: "Qu'est-ce que le Shirk ?",
    answer:
      "Le Shirk est le fait d'associer quoi que ce soit à Allah dans l'adoration. C'est le plus grand péché en Islam et le seul qu'Allah ne pardonne pas si on meurt sans s'en repentir. Il peut être majeur (adorer autre qu'Allah) ou mineur (comme l'ostentation dans les actes d'adoration).",
  },
  {
    id: 20,
    category: "Les fondements",
    question: "Qu'est-ce qu'une mosquée ?",
    answer:
      "Une mosquée (masjid en arabe, qui signifie « lieu de prosternation ») est le lieu de culte des musulmans. On y accomplit les prières en communauté, on y étudie le Coran et on y reçoit des enseignements religieux. La mosquée la plus sacrée est Al-Masjid al-Harâm à La Mecque.",
  },
  {
    id: 21,
    category: "Les fondements",
    question: "Qu'est-ce que la Sunna et le Hadith ?",
    answer:
      "La Sunna est la voie du Prophète ﷺ : ses paroles, ses actes et ses approbations. Le Hadith est le récit qui rapporte cette Sunna. Les recueils les plus authentiques sont ceux de l'imam Al-Bukhâri et de l'imam Muslim. La Sunna complète et explique le Coran.",
  },
  {
    id: 22,
    category: "Les fondements",
    question: "Quelle est la différence entre un prophète et un messager ?",
    answer:
      "Un prophète (nabî) est celui à qui Allah a révélé une loi ou un message. Un messager (rasûl) est un prophète qui a reçu en plus la mission de transmettre une nouvelle législation à son peuple. Tout messager est prophète, mais tout prophète n'est pas messager. L'Islam reconnaît 25 prophètes mentionnés dans le Coran.",
  },

  // Questions supplémentaires — Les piliers de l'Islam
  {
    id: 23,
    category: "Les piliers de l'Islam",
    question: "Combien de prières obligatoires y a-t-il par jour ?",
    answer:
      "Il y a 5 prières obligatoires par jour :\n\n1. Fajr — 2 unités (raka'ât), avant le lever du soleil\n2. Dhuhr — 4 unités, au début de l'après-midi\n3. Asr — 4 unités, en milieu d'après-midi\n4. Maghrib — 3 unités, juste après le coucher du soleil\n5. Isha — 4 unités, la nuit",
  },
  {
    id: 24,
    category: "Les piliers de l'Islam",
    question: "Quelles sont les conditions de la prière ?",
    answer:
      "Pour que la prière soit valide, il faut :\n\n• Être musulman\n• Être pubère et sain d'esprit\n• Être en état de pureté rituelle (wudû')\n• Couvrir sa 'awra (parties du corps à couvrir)\n• Prier dans la direction de La Mecque (qibla)\n• Prier dans le temps prescrit\n• Avoir l'intention (niyya)",
  },
  {
    id: 25,
    category: "Les piliers de l'Islam",
    question: "Qui doit payer la Zakat et combien ?",
    answer:
      "Tout musulman adulte possédant une richesse supérieure au nisâb (seuil minimum, équivalent à environ 85g d'or) pendant une année lunaire complète doit verser 2,5% de cette richesse. La Zakat est distribuée à 8 catégories de bénéficiaires mentionnées dans le Coran (sourate 9, verset 60).",
  },
  {
    id: 26,
    category: "Les piliers de l'Islam",
    question: "Qui est dispensé du jeûne du Ramadan ?",
    answer:
      "Sont dispensés du jeûne :\n\n• Les enfants avant la puberté\n• Les malades (temporairement ou définitivement)\n• Les voyageurs (ils rattrapent plus tard)\n• Les femmes enceintes, allaitantes ou en période de menstrues\n• Les personnes âgées incapables de jeûner (elles compensent en nourrissant un pauvre par jour manqué)",
  },

  // Questions supplémentaires — Les piliers de la foi
  {
    id: 28,
    category: "Les piliers de la foi",
    question: "Combien de prophètes sont mentionnés dans le Coran ?",
    answer:
      "Le Coran mentionne 25 prophètes par leur nom, parmi lesquels : Adam, Noé (Nûh), Abraham (Ibrâhîm), Moïse (Mûsâ), Jésus ('Îsâ) et Muhammad ﷺ. La tradition rapporte qu'Allah a envoyé 124 000 prophètes au total à travers l'histoire de l'humanité.",
  },
  {
    id: 29,
    category: "Les piliers de la foi",
    question: "Qui est Jésus ('Îsâ) en Islam ?",
    answer:
      "Jésus ('Îsâ ibn Maryam) est l'un des plus grands prophètes et messagers d'Allah. Il est né miraculeusement de la Vierge Marie (Maryam) sans père. Les musulmans croient qu'il n'a pas été crucifié mais élevé au ciel par Allah, et qu'il reviendra avant le Jour du Jugement. Il n'est pas considéré comme le fils de Dieu en Islam.",
  },
  {
    id: 30,
    category: "Les piliers de la foi",
    question: "Qu'est-ce que le Paradis et l'Enfer en Islam ?",
    answer:
      "Le Paradis (Janna) est la demeure éternelle de félicité promise aux croyants pieux. Il contient des délices inimaginables. L'Enfer (Jahannam) est le lieu de châtiment pour ceux qui ont rejeté la foi ou commis de grands péchés sans repentir. Allah est Le Plus Juste et Le Plus Miséricordieux dans Son jugement.",
  },
  {
    id: 31,
    category: "Les piliers de la foi",
    question: "Qu'est-ce que la vie dans la tombe (Barzakh) ?",
    answer:
      "Le Barzakh est la période entre la mort et la résurrection. Selon la tradition islamique, deux anges (Munkar et Nakîr) interrogent le défunt sur sa foi. Le croyant pieux connaîtra la paix dans sa tombe, tandis que le mécréant connaîtra un châtiment. C'est une étape intermédiaire avant le Jour du Jugement.",
  },

  // Questions supplémentaires — Le Prophète ﷺ
  {
    id: 32,
    category: "Le Prophète ﷺ",
    question: "Comment s'est passée la première révélation ?",
    answer:
      "La première révélation a eu lieu dans la grotte de Hirâ', sur le mont Nûr, près de La Mecque. Le Prophète ﷺ, alors âgé de 40 ans, méditait quand l'ange Gabriel (Jibrîl) lui est apparu et lui a dit « Lis ! » (Iqra'). Les premiers versets révélés furent les cinq premiers versets de la sourate Al-'Alaq (96).",
  },
  {
    id: 33,
    category: "Le Prophète ﷺ",
    question: "Qu'est-ce que l'Hégire ?",
    answer:
      "L'Hégire est l'émigration du Prophète ﷺ et de ses compagnons de La Mecque vers Médine en 622 après J.-C. Cet événement marque le début du calendrier islamique (calendrier hégirien). À Médine, le Prophète ﷺ a établi la première communauté musulmane organisée et a posé les bases de l'État islamique.",
  },
  {
    id: 34,
    category: "Le Prophète ﷺ",
    question: "Quels étaient les principaux traits de caractère du Prophète ﷺ ?",
    answer:
      "Le Prophète ﷺ était connu pour sa miséricorde, son honnêteté (surnommé Al-Amîn, le digne de confiance), sa générosité, sa patience et son humilité. Allah dit dans le Coran : « Et tu es certes d'un caractère éminent » (sourate 68, verset 4). Il pardonnait à ses ennemis, aidait les pauvres et traitait tout le monde avec respect.",
  },
  {
    id: 35,
    category: "Le Prophète ﷺ",
    question: "Qui sont les compagnons (Sahâba) du Prophète ﷺ ?",
    answer:
      "Les Sahâba sont les personnes qui ont rencontré le Prophète ﷺ, cru en lui et sont mortes dans la foi. Parmi les plus connus : Abû Bakr as-Siddîq, 'Umar ibn al-Khattâb, 'Uthmân ibn 'Affân et 'Alî ibn Abî Tâlib (les quatre califes bien guidés), ainsi que Khadîja, 'Â'isha, Bilâl et Salmân al-Fârisî.",
  },
  {
    id: 36,
    category: "Le Prophète ﷺ",
    question: "Qu'est-ce que le voyage nocturne et l'ascension (Isrâ' wa Mi'râj) ?",
    answer:
      "L'Isrâ' wa Mi'râj est un miracle vécu par le Prophète ﷺ : en une seule nuit, il a voyagé de La Mecque à Jérusalem (Al-Masjid al-Aqsâ), puis est monté à travers les cieux jusqu'en la présence d'Allah. C'est lors de ce voyage que les cinq prières quotidiennes ont été prescrites aux musulmans.",
  },
  {
    id: 37,
    category: "Le Prophète ﷺ",
    question: "Quand et comment le Prophète ﷺ est-il décédé ?",
    answer:
      "Le Prophète ﷺ est décédé le 12 Rabî' al-Awwal de l'an 11 de l'Hégire (632 après J.-C.) à Médine, à l'âge de 63 ans. Il est décédé dans la maison de son épouse 'Â'isha et a été enterré au même endroit, dans ce qui est aujourd'hui la Mosquée du Prophète (Al-Masjid an-Nabawî) à Médine.",
  },
];
