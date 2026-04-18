export interface BasicQuestion {
  id: number;
  question: string;
  answer: string;
  category: string;
  pillar?: string;
}

export const basicsCategories = [
  "Les fondements",
  "Les piliers de l'Islam",
  "Les piliers de la foi",
  "Le Prophète ﷺ",
];

export interface Pillar {
  id: string;
  name: string;
  arabicName: string;
  icon: string;
  description: string;
}

export const pillarsOfIslam: Pillar[] = [
  { id: "shahada", name: "La Shahada", arabicName: "الشهادة", icon: "☝️", description: "L'attestation de foi" },
  { id: "salat", name: "La Salat", arabicName: "الصلاة", icon: "🤲", description: "La prière" },
  { id: "zakat", name: "La Zakat", arabicName: "الزكاة", icon: "💰", description: "L'aumône obligatoire" },
  { id: "sawm", name: "Le Sawm", arabicName: "الصوم", icon: "🌙", description: "Le jeûne du Ramadan" },
  { id: "hajj", name: "Le Hajj", arabicName: "الحج", icon: "🕋", description: "Le pèlerinage" },
];

export const pillarQuestions: BasicQuestion[] = [
  // Shahada
  {
    id: 100,
    category: "Les piliers de l'Islam",
    pillar: "shahada",
    question: "Qu'est-ce que la Shahada ?",
    answer: "La Shahada est la déclaration de foi : « Ash-hadou an lâ ilâha illa Allâh, wa ash-hadou anna Muhammadan rasûlou Allâh » — « J'atteste qu'il n'y a de divinité digne d'adoration qu'Allah, et j'atteste que Muhammad est le messager d'Allah. » C'est le premier pilier de l'Islam et l'acte par lequel on entre dans la religion.",
  },
  {
    id: 101,
    category: "Les piliers de l'Islam",
    pillar: "shahada",
    question: "Quelles sont les conditions de la Shahada ?",
    answer: "La Shahada a 7 conditions :\n\n1. La science (al-'ilm) — savoir ce qu'elle signifie\n2. La certitude (al-yaqîn) — sans aucun doute\n3. L'acceptation (al-qabûl) — accepter tout ce qu'elle implique\n4. La soumission (al-inqiyâd) — agir en conséquence\n5. La sincérité (as-sidq) — la prononcer avec véracité\n6. La pureté d'intention (al-ikhlâs) — uniquement pour Allah\n7. L'amour (al-mahabba) — aimer ce qu'elle implique",
  },
  {
    id: 102,
    category: "Les piliers de l'Islam",
    pillar: "shahada",
    question: "Que signifie « Lâ ilâha illa Allâh » ?",
    answer: "Cela signifie « Il n'y a de divinité digne d'adoration qu'Allah ». Cette formule nie toute forme d'adoration envers autre qu'Allah et affirme qu'Il est le seul à mériter l'adoration. C'est le fondement du monothéisme islamique (Tawhîd).",
  },

  // Salat
  {
    id: 200,
    category: "Les piliers de l'Islam",
    pillar: "salat",
    question: "Qu'est-ce que la Salat (prière) ?",
    answer: "La Salat est la prière rituelle que chaque musulman doit accomplir 5 fois par jour : Fajr (aube), Dhuhr (midi), Asr (après-midi), Maghrib (coucher du soleil) et Isha (nuit). C'est un moment de connexion directe avec Allah, sans intermédiaire.",
  },
  {
    id: 201,
    category: "Les piliers de l'Islam",
    pillar: "salat",
    question: "Combien de prières obligatoires y a-t-il par jour ?",
    answer: "Il y a 5 prières obligatoires par jour :\n\n1. Fajr — 2 unités (raka'ât), avant le lever du soleil\n2. Dhuhr — 4 unités, au début de l'après-midi\n3. Asr — 4 unités, en milieu d'après-midi\n4. Maghrib — 3 unités, juste après le coucher du soleil\n5. Isha — 4 unités, la nuit",
  },
  {
    id: 202,
    category: "Les piliers de l'Islam",
    pillar: "salat",
    question: "Quelles sont les conditions de la prière ?",
    answer: "Pour que la prière soit valide, il faut :\n\n• Être musulman\n• Être pubère et sain d'esprit\n• Être en état de pureté rituelle (avoir fait ses ablutions)\n• Couvrir sa 'awra (parties du corps à couvrir)\n• Prier dans la direction de La Mecque (qibla)\n• Prier dans le temps prescrit\n• Avoir l'intention (niyya)",
  },
  {
    id: 203,
    category: "Les piliers de l'Islam",
    pillar: "salat",
    question: "Qu'est-ce qui annule les ablutions ?",
    answer: "Les choses qui annulent les ablutions (wudû') sont :\n\n• Tout ce qui sort des deux voies naturelles (urine, selles, gaz)\n• Le sommeil profond\n• La perte de conscience (évanouissement)\n• Le toucher des parties intimes directement avec la main (sans barrière)\n• La consommation de viande de chameau (selon certains savants)\n\nSi les ablutions sont annulées, il faut les refaire avant de prier.",
  },
  {
    id: 204,
    category: "Les piliers de l'Islam",
    pillar: "salat",
    question: "Que faire si on a raté une prière ?",
    answer: "Si un musulman a raté une prière obligatoire, il doit la rattraper dès qu'il s'en souvient ou dès qu'il en a la possibilité. C'est ce qu'on appelle le « qadâ' ». Le Prophète ﷺ a dit : « Celui qui oublie une prière ou dort et la manque, qu'il la prie dès qu'il s'en souvient, car c'est son seul rachat. » (Rapporté par Al-Bukhâri et Muslim). Il est important de ne pas retarder volontairement les prières.",
  },

  // Zakat
  {
    id: 300,
    category: "Les piliers de l'Islam",
    pillar: "zakat",
    question: "Qu'est-ce que la Zakat ?",
    answer: "La Zakat est l'aumône obligatoire. Chaque musulman possédant une richesse au-delà d'un certain seuil (le nisâb) doit donner 2,5% de ses économies annuelles aux personnes dans le besoin. C'est un acte de purification de la richesse et de solidarité.",
  },
  {
    id: 301,
    category: "Les piliers de l'Islam",
    pillar: "zakat",
    question: "Qui doit payer la Zakat et combien ?",
    answer: "Tout musulman adulte possédant une richesse supérieure au nisâb (seuil minimum, équivalent à environ 85g d'or) pendant une année lunaire complète doit verser 2,5% de cette richesse. La Zakat est distribuée à 8 catégories de bénéficiaires mentionnées dans le Coran (sourate 9, verset 60).",
  },
  {
    id: 302,
    category: "Les piliers de l'Islam",
    pillar: "zakat",
    question: "Quelle est la différence entre Zakat et Sadaqa ?",
    answer: "La Zakat est une aumône obligatoire avec un montant précis (2,5%) et des conditions spécifiques (nisâb, durée d'un an). La Sadaqa est une aumône volontaire, sans montant fixe, que l'on peut donner à tout moment et à toute personne dans le besoin. Les deux sont des actes méritoires en Islam.",
  },
  {
    id: 303,
    category: "Les piliers de l'Islam",
    pillar: "zakat",
    question: "Qu'est-ce que la Zakat al-Fitr ?",
    answer: "La Zakat al-Fitr est une aumône obligatoire que chaque musulman doit verser avant la prière de l'Aïd al-Fitr, à la fin du mois de Ramadan. Elle est due pour chaque membre de la famille, y compris les enfants. Son montant correspond à environ un sâ' (environ 2,5 à 3 kg) de nourriture de base (blé, riz, dattes, etc.). Elle a pour but de purifier le jeûneur de ses éventuels manquements et de nourrir les pauvres le jour de l'Aïd.",
  },

  // Sawm
  {
    id: 400,
    category: "Les piliers de l'Islam",
    pillar: "sawm",
    question: "Qu'est-ce que le jeûne du Ramadan ?",
    answer: "Le jeûne du Ramadan (Sawm) consiste à s'abstenir de manger, boire et avoir des relations intimes du lever au coucher du soleil durant le mois de Ramadan. C'est un mois de purification spirituelle, de générosité et de rapprochement avec Allah.",
  },
  {
    id: 401,
    category: "Les piliers de l'Islam",
    pillar: "sawm",
    question: "Qui est dispensé du jeûne du Ramadan ?",
    answer: "Sont dispensés du jeûne :\n\n• Les enfants avant la puberté\n• Les malades (temporairement ou définitivement)\n• Les voyageurs (ils rattrapent plus tard)\n• Les femmes enceintes, allaitantes ou en période de menstrues\n• Les personnes âgées incapables de jeûner (elles compensent en nourrissant un pauvre par jour manqué)",
  },
  {
    id: 402,
    category: "Les piliers de l'Islam",
    pillar: "sawm",
    question: "Qu'est-ce qui annule le jeûne ?",
    answer: "Les choses qui annulent le jeûne sont :\n\n• Manger ou boire volontairement\n• Les relations intimes\n• Le vomissement provoqué volontairement\n• Les menstrues ou les lochies\n\nSi quelqu'un mange ou boit par oubli, son jeûne reste valide selon la majorité des savants.",
  },
  {
    id: 403,
    category: "Les piliers de l'Islam",
    pillar: "sawm",
    question: "À quelle heure commence et se termine le jeûne chaque jour ?",
    answer: "Le jeûne commence à l'aube (Fajr), au moment où apparaît la première lumière à l'horizon (l'aube véritable), et se termine au coucher du soleil (Maghrib). Le Prophète ﷺ a dit : « Mangez et buvez jusqu'à ce que vous puissiez distinguer le fil blanc du fil noir de l'aube, puis accomplissez le jeûne jusqu'à la nuit. » (Coran, sourate 2, verset 187). Il est recommandé de retarder le suhûr (repas avant l'aube) et de hâter l'iftâr (rupture du jeûne).",
  },
  {
    id: 404,
    category: "Les piliers de l'Islam",
    pillar: "sawm",
    question: "Que se passe-t-il si je romps involontairement le jeûne ?",
    answer: "Si une personne mange, boit ou fait quelque chose qui annule le jeûne par oubli ou involontairement, son jeûne reste valide et elle doit le continuer. Le Prophète ﷺ a dit : « Si quelqu'un oublie qu'il jeûne et mange ou boit, qu'il continue son jeûne, car c'est Allah qui l'a nourri et abreuvé. » (Rapporté par Al-Bukhâri et Muslim).",
  },
  {
    id: 405,
    category: "Les piliers de l'Islam",
    pillar: "sawm",
    question: "Que se passe-t-il si je romps volontairement le jeûne ?",
    answer: "Rompre volontairement le jeûne du Ramadan sans excuse valable est un péché grave. La personne doit se repentir sincèrement auprès d'Allah et rattraper le jour manqué. En cas de rupture par relation intime volontaire, une expiation (kaffâra) est requise : libérer un esclave, ou jeûner 60 jours consécutifs, ou nourrir 60 pauvres. Pour les autres cas de rupture volontaire, la personne doit rattraper le jour et se repentir.",
  },
  {
    id: 406,
    category: "Les piliers de l'Islam",
    pillar: "sawm",
    question: "Qu'est-ce que la prière de Tarawih, est-elle obligatoire ?",
    answer: "La prière de Tarawih est une prière surérogatoire (non obligatoire mais fortement recommandée) accomplie chaque nuit du mois de Ramadan, après la prière de 'Isha. Elle se prie généralement en groupe à la mosquée. Le Prophète ﷺ a dit : « Celui qui prie durant les nuits de Ramadan avec foi et en espérant la récompense d'Allah, ses péchés passés lui seront pardonnés. » (Rapporté par Al-Bukhâri et Muslim). Elle se compose généralement de 8 ou 20 unités de prière (raka'ât).",
  },
  {
    id: 407,
    category: "Les piliers de l'Islam",
    pillar: "sawm",
    question: "Qu'est-ce que la nuit du Destin (Laylat al-Qadr) ?",
    answer: "Laylat al-Qadr (la Nuit du Destin) est la nuit la plus bénie de l'année. C'est durant cette nuit que le Coran a commencé à être révélé. Allah dit : « La Nuit du Destin est meilleure que mille mois. » (Coran, sourate 97, verset 3). Elle se situe dans les dix dernières nuits du Ramadan, plus probablement les nuits impaires (21e, 23e, 25e, 27e ou 29e). Les musulmans la passent en prière, invocations et lecture du Coran.",
  },
  {
    id: 408,
    category: "Les piliers de l'Islam",
    pillar: "sawm",
    question: "Qu'est-ce que l'Aïd al-Fitr ?",
    answer: "L'Aïd al-Fitr (la fête de la rupture du jeûne) est la fête qui marque la fin du mois de Ramadan. Elle a lieu le 1er jour du mois de Shawwâl. Les musulmans accomplissent une prière spéciale le matin, versent la Zakat al-Fitr, portent leurs plus beaux vêtements, se réjouissent et partagent des repas en famille. C'est un jour de gratitude envers Allah pour avoir permis d'accomplir le jeûne du Ramadan.",
  },

  // Hajj
  {
    id: 500,
    category: "Les piliers de l'Islam",
    pillar: "hajj",
    question: "Qu'est-ce que le Hajj ?",
    answer: "Le Hajj est le pèlerinage à La Mecque (Arabie Saoudite) que tout musulman ayant les moyens physiques et financiers doit accomplir au moins une fois dans sa vie. Il se déroule chaque année durant le mois de Dhoul Hijja.",
  },
  {
    id: 501,
    category: "Les piliers de l'Islam",
    pillar: "hajj",
    question: "Quelles sont les conditions pour accomplir le Hajj ?",
    answer: "Les conditions du Hajj sont :\n\n• Être musulman\n• Être pubère\n• Être sain d'esprit\n• Être libre\n• Avoir la capacité physique et financière\n• Pour la femme : être accompagnée d'un mahram (tuteur masculin)\n\nLe Hajj n'est obligatoire qu'une seule fois dans la vie.",
  },
  {
    id: 502,
    category: "Les piliers de l'Islam",
    pillar: "hajj",
    question: "Quelle est la différence entre le Hajj et la 'Umra ?",
    answer: "Le Hajj est le grand pèlerinage, obligatoire une fois dans la vie, et se déroule à des dates précises du mois de Dhoul Hijja. La 'Umra est le petit pèlerinage, recommandé mais non obligatoire, et peut être accompli à tout moment de l'année. Le Hajj comprend des rites supplémentaires comme la station à 'Arafat et les nuits à Muzdalifa et Minâ.",
  },
  {
    id: 503,
    category: "Les piliers de l'Islam",
    pillar: "hajj",
    question: "Qu'est-ce que la Kaaba et quelle est son histoire ?",
    answer: "La Kaaba est un édifice cubique situé au centre de la Grande Mosquée de La Mecque (Al-Masjid al-Harâm). Elle a été construite à l'origine par le prophète Ibrahim (Abraham) et son fils Ismaïl ('alayhi as-salâm) sur ordre d'Allah comme premier lieu d'adoration dédié au Dieu unique. Les musulmans du monde entier se tournent vers la Kaaba pour prier (qibla). Durant le Hajj et la 'Umra, les pèlerins effectuent le Tawâf, qui consiste à tourner sept fois autour de la Kaaba. Elle est recouverte d'un tissu noir brodé d'or appelé la Kiswa.",
  },
];

export const pillarsOfFaith: Pillar[] = [
  { id: "allah", name: "Croire en Allah", arabicName: "الإيمان بالله", icon: "🤲", description: "La croyance en Dieu unique" },
  { id: "anges", name: "Croire aux Anges", arabicName: "الإيمان بالملائكة", icon: "✨", description: "La croyance aux anges" },
  { id: "livres", name: "Croire aux Livres", arabicName: "الإيمان بالكتب", icon: "📖", description: "La croyance aux livres révélés" },
  { id: "prophetes", name: "Croire aux Prophètes", arabicName: "الإيمان بالرسل", icon: "🕊️", description: "La croyance aux prophètes et messagers" },
  { id: "jugement", name: "Croire au Jour du Jugement", arabicName: "الإيمان باليوم الآخر", icon: "⚖️", description: "La croyance au Jour Dernier" },
  { id: "destin", name: "Croire au Destin", arabicName: "الإيمان بالقدر", icon: "📜", description: "La croyance au destin bon ou mauvais" },
];

export const faithPillarQuestions: BasicQuestion[] = [
  // Croire en Allah
  {
    id: 600,
    category: "Les piliers de la foi",
    pillar: "allah",
    question: "Que signifie croire en Allah ?",
    answer: "Croire en Allah signifie croire en Son existence, en Son unicité (Tawhîd), en Ses noms et attributs parfaits, et en le fait qu'Il est le seul Créateur, le seul Maître et le seul digne d'adoration. Cette croyance implique de L'adorer sans Lui associer quoi que ce soit.",
  },
  {
    id: 601,
    category: "Les piliers de la foi",
    pillar: "allah",
    question: "Quelles sont les catégories du Tawhîd (unicité de Dieu) ?",
    answer: "Le Tawhîd se divise en trois catégories :\n\n1. Tawhîd ar-Rubûbiyya — L'unicité de la Seigneurie : Allah est le seul Créateur, Pourvoyeur et Gestionnaire de l'univers.\n2. Tawhîd al-Ulûhiyya — L'unicité de l'adoration : seul Allah mérite d'être adoré.\n3. Tawhîd al-Asmâ' wa as-Sifât — L'unicité des noms et attributs : Allah possède des noms et attributs parfaits, sans ressemblance avec Sa création.",
  },
  {
    id: 602,
    category: "Les piliers de la foi",
    pillar: "allah",
    question: "Comment connaît-on Allah ?",
    answer: "On connaît Allah à travers :\n\n• Ses signes dans la création (l'univers, la nature, le corps humain)\n• Ses noms et attributs mentionnés dans le Coran et la Sunna\n• Ses livres révélés, en particulier le Coran\n• La réflexion et la méditation sur Ses bienfaits\n\nAllah dit : « En vérité, dans la création des cieux et de la terre, il y a certes des signes pour les doués d'intelligence. » (Coran, 3:190)",
  },
  {
    id: 603,
    category: "Les piliers de la foi",
    pillar: "allah",
    question: "Qu'est-ce que le Shirk (l'association) et pourquoi est-ce le péché le plus grave ?",
    answer: "Le Shirk consiste à associer à Allah une autre divinité ou à attribuer à une créature ce qui n'appartient qu'à Lui (l'adoration, la souveraineté absolue, la connaissance de l'invisible, etc.). C'est le péché le plus grave en Islam car il contredit la raison même de la création : adorer Allah seul. Allah dit : « Certes, Allah ne pardonne pas qu'on Lui donne des associés. À part cela, Il pardonne à qui Il veut. » (Coran, 4:48). Celui qui meurt sur le Shirk sans s'en repentir n'entrera pas au Paradis.",
  },
  {
    id: 604,
    category: "Les piliers de la foi",
    pillar: "allah",
    question: "Quelle est la différence entre Allah et les dieux des autres religions ?",
    answer: "Allah est le Dieu unique, sans associé, sans enfant, sans père et sans semblable. Il n'a pas de forme humaine ni de représentation matérielle. Il dit dans le Coran : « Il n'y a rien qui Lui ressemble ; et c'est Lui l'Audient, le Clairvoyant. » (Coran, 42:11).\n\nContrairement à de nombreuses divinités d'autres religions, Allah :\n• N'est pas multiple (pas de trinité ni de panthéon)\n• N'a pas de représentation visuelle (statues, images)\n• Ne s'incarne pas dans une créature\n• N'a aucun besoin de Sa création\n\nC'est le même Dieu qui a envoyé tous les prophètes (Noé, Abraham, Moïse, Jésus, Muhammad…), mais avec un message purifié de toute altération.",
  },
  {
    id: 605,
    category: "Les piliers de la foi",
    pillar: "allah",
    question: "Allah a-t-il une forme ou un corps ?",
    answer: "Allah n'est comparable à rien de Sa création. Il possède des attributs qui Lui sont propres et qui sont mentionnés dans le Coran et la Sunna (comme Son Visage, Ses Mains, Son élévation au-dessus du Trône), mais nous y croyons sans les comparer à ceux des créatures, sans les nier, sans les modifier et sans en chercher la modalité.\n\nLa règle des savants de l'Ahl as-Sunna est : « Rien ne Lui ressemble, et Il est l'Audient, le Clairvoyant » (Coran 42:11). Ainsi, on affirme ce qu'Allah a affirmé sur Lui-même, tout en étant certain qu'Il ne ressemble à aucune de Ses créatures et qu'Il n'a ni corps matériel ni forme imaginable par l'esprit humain.",
  },

  // Croire aux Anges
  {
    id: 610,
    category: "Les piliers de la foi",
    pillar: "anges",
    question: "Qui sont les anges en Islam ?",
    answer: "Les anges sont des créatures de lumière créées par Allah. Ils n'ont ni libre arbitre ni désirs personnels et obéissent parfaitement à Allah. Ils ne mangent pas, ne boivent pas et ne dorment pas. Ils glorifient Allah sans cesse et accomplissent les missions qu'Il leur confie.",
  },
  {
    id: 611,
    category: "Les piliers de la foi",
    pillar: "anges",
    question: "Quels sont les anges les plus connus ?",
    answer: "Parmi les anges les plus connus :\n\n• Jibrîl (Gabriel) — chargé de transmettre la révélation divine\n• Mîkâ'îl (Michaël) — chargé des provisions et de la pluie\n• Isrâfîl — chargé de souffler dans la trompe le Jour du Jugement\n• Malak al-Mawt — l'ange de la mort\n• Ridwân — gardien du Paradis\n• Mâlik — gardien de l'Enfer\n• Kirâman Kâtibîn — les anges scribes qui enregistrent les actes de chaque personne",
  },
  {
    id: 612,
    category: "Les piliers de la foi",
    pillar: "anges",
    question: "Quelle est la différence entre les anges et les djinns ?",
    answer: "Les anges sont créés de lumière et obéissent parfaitement à Allah, sans libre arbitre. Les djinns sont créés de feu et possèdent le libre arbitre : ils peuvent choisir d'obéir ou de désobéir à Allah. Parmi les djinns, certains sont croyants et d'autres mécréants. Iblîs (Satan) est un djinn qui a refusé de se prosterner devant Adam.",
  },

  // Croire aux Livres
  {
    id: 620,
    category: "Les piliers de la foi",
    pillar: "livres",
    question: "Quels sont les livres révélés par Allah ?",
    answer: "Allah a révélé plusieurs livres à Ses prophètes :\n\n• Les Feuillets (Suhuf) à Ibrahim (Abraham)\n• La Torah (Tawrât) à Mûsâ (Moïse)\n• Les Psaumes (Zabûr) à Dâwûd (David)\n• L'Évangile (Injîl) à 'Îsâ (Jésus)\n• Le Coran à Muhammad ﷺ\n\nLes musulmans croient que le Coran est le dernier livre révélé et qu'il abroge les législations précédentes.",
  },
  {
    id: 621,
    category: "Les piliers de la foi",
    pillar: "livres",
    question: "Pourquoi le Coran est-il spécial par rapport aux autres livres ?",
    answer: "Le Coran est spécial car :\n\n• Il est le dernier livre révélé par Allah\n• Il est préservé dans sa forme originale depuis plus de 1400 ans, comme Allah l'a promis : « C'est Nous qui avons fait descendre le Rappel, et c'est Nous qui en sommes les gardiens. » (Coran, 15:9)\n• Il s'adresse à toute l'humanité, pas seulement à un peuple\n• Il abroge les législations des livres précédents\n• Il est inimitable dans son style et son contenu",
  },
  {
    id: 622,
    category: "Les piliers de la foi",
    pillar: "livres",
    question: "Qu'est-ce que la Tahrif (falsification des anciens livres) ?",
    answer: "La Tahrif désigne l'altération ou la falsification subie par les livres révélés avant le Coran (Torah, Évangile, etc.). Cette altération a pu prendre plusieurs formes :\n\n• Modification du texte (ajouts, suppressions, changements de mots)\n• Mauvaise interprétation du sens d'origine\n• Perte de certains passages au fil des siècles\n\nAllah mentionne cela dans le Coran : « Certains parmi les juifs altèrent les paroles de leurs places. » (Coran, 4:46). C'est l'une des raisons pour lesquelles Allah a envoyé le Coran : pour rétablir le message original et le préserver jusqu'à la fin des temps. Les musulmans respectent les livres précédents dans leur forme originelle révélée, mais suivent uniquement le Coran comme référence.",
  },
  {
    id: 623,
    category: "Les piliers de la foi",
    pillar: "livres",
    question: "Le Coran a-t-il été modifié depuis sa révélation ?",
    answer: "Non, le Coran n'a subi aucune modification depuis sa révélation au Prophète Muhammad ﷺ il y a plus de 1400 ans. Allah Lui-même s'est engagé à le préserver : « C'est Nous qui avons fait descendre le Rappel, et c'est Nous qui en sommes les gardiens. » (Coran, 15:9).\n\nLe texte du Coran récité aujourd'hui par les musulmans à travers le monde est exactement le même, mot pour mot, lettre pour lettre, que celui révélé au Prophète ﷺ. Des manuscrits anciens datant des premières décennies de l'Islam (comme le manuscrit de Birmingham ou celui de Sanaa) confirment cette préservation parfaite.",
  },
  {
    id: 624,
    category: "Les piliers de la foi",
    pillar: "livres",
    question: "Comment le Coran a-t-il été préservé jusqu'à aujourd'hui ?",
    answer: "Le Coran a été préservé par deux moyens complémentaires :\n\n1. La mémorisation (Hifdh) : Dès la révélation, le Prophète ﷺ et ses compagnons mémorisaient chaque verset. Cette tradition s'est perpétuée jusqu'à aujourd'hui : des millions de musulmans à travers le monde (les hâfidh) connaissent l'intégralité du Coran par cœur.\n\n2. L'écriture : Les versets étaient écrits par des scribes du vivant du Prophète ﷺ sur divers supports (parchemins, omoplates, tablettes). Sous le calife Abû Bakr, puis 'Uthmân, le Coran a été compilé en un livre unique (mushaf), dont des copies furent envoyées dans les principales régions musulmanes.\n\nCette double préservation orale et écrite, combinée à la promesse divine, garantit l'authenticité du Coran depuis 14 siècles.",
  },

  // Croire aux Prophètes
  {
    id: 630,
    category: "Les piliers de la foi",
    pillar: "prophetes",
    question: "Combien de prophètes sont mentionnés dans le Coran ?",
    answer: "Le Coran mentionne 25 prophètes par leur nom, parmi lesquels : Adam, Noé (Nûh), Abraham (Ibrâhîm), Moïse (Mûsâ), Jésus ('Îsâ) et Muhammad ﷺ. Cependant, il y a eu beaucoup plus de prophètes envoyés à l'humanité. Le Prophète ﷺ a dit qu'ils étaient 124 000 prophètes au total.",
  },
  {
    id: 631,
    category: "Les piliers de la foi",
    pillar: "prophetes",
    question: "Quelle est la différence entre un prophète (nabî) et un messager (rasûl) ?",
    answer: "Un prophète (nabî) est une personne qui reçoit une révélation d'Allah pour se guider et guider les gens, mais qui suit la législation d'un messager précédent. Un messager (rasûl) est un prophète à qui Allah a donné une nouvelle législation (sharî'a) à transmettre à son peuple. Tout messager est un prophète, mais tout prophète n'est pas nécessairement un messager.",
  },
  {
    id: 632,
    category: "Les piliers de la foi",
    pillar: "prophetes",
    question: "Quel est le message commun de tous les prophètes ?",
    answer: "Le message commun de tous les prophètes est le Tawhîd : l'appel à adorer Allah seul, sans Lui associer quoi que ce soit. Chaque prophète a dit à son peuple : « Adorez Allah, vous n'avez aucune autre divinité en dehors de Lui. » (Coran, 7:59). Ils ont tous appelé au bien, interdit le mal, et annoncé les bonnes nouvelles du Paradis et l'avertissement de l'Enfer.",
  },

  // Croire au Jour du Jugement
  {
    id: 640,
    category: "Les piliers de la foi",
    pillar: "jugement",
    question: "Qu'est-ce que le Jour du Jugement ?",
    answer: "Le Jour du Jugement (Yawm al-Qiyâma) est le jour où Allah ressuscitera toute l'humanité pour la juger selon ses actes. Les bonnes actions et les mauvaises seront pesées sur une balance (al-Mîzân). Ceux qui auront bien agi entreront au Paradis, et ceux qui auront mal agi seront châtiés, sauf si Allah leur pardonne.",
  },
  {
    id: 641,
    category: "Les piliers de la foi",
    pillar: "jugement",
    question: "Quels sont les signes majeurs du Jour du Jugement ?",
    answer: "Parmi les signes majeurs de l'Heure :\n\n• L'apparition du Dajjâl (l'Antéchrist)\n• La descente de 'Îsâ (Jésus) sur terre\n• L'apparition de Ya'jûj et Ma'jûj (Gog et Magog)\n• Le lever du soleil depuis l'Ouest\n• La sortie de la Bête de la terre\n• Une fumée (Dukhân) qui couvrira la terre\n• Trois grands effondrements de terrain\n• Un feu qui rassemblera les gens vers le lieu de rassemblement",
  },
  {
    id: 642,
    category: "Les piliers de la foi",
    pillar: "jugement",
    question: "Qu'est-ce que le Paradis et l'Enfer ?",
    answer: "Le Paradis (Janna) est la demeure éternelle de félicité préparée par Allah pour les croyants. On y trouve des bienfaits inimaginables et le plus grand bonheur est de voir le visage d'Allah. L'Enfer (Jahannam) est le châtiment préparé pour les mécréants et les désobéissants. Allah invite l'humanité à œuvrer pour le Paradis et à se préserver de l'Enfer par la foi et les bonnes actions.",
  },

  // Croire au Destin
  {
    id: 650,
    category: "Les piliers de la foi",
    pillar: "destin",
    question: "Qu'est-ce que le destin (Qadar) en Islam ?",
    answer: "Croire au Qadar signifie croire que tout ce qui arrive — le bien comme le mal — est décrété par Allah selon Sa sagesse. Cela comprend quatre niveaux :\n\n1. La science (al-'Ilm) — Allah sait tout de toute éternité\n2. L'écriture (al-Kitâba) — Tout est écrit dans la Table Préservée (al-Lawh al-Mahfûdh)\n3. La volonté (al-Mashî'a) — Rien ne se produit sans la volonté d'Allah\n4. La création (al-Khalq) — Allah est le Créateur de toute chose",
  },
  {
    id: 651,
    category: "Les piliers de la foi",
    pillar: "destin",
    question: "Le destin supprime-t-il le libre arbitre ?",
    answer: "Non, croire au destin ne supprime pas le libre arbitre. Allah a donné à l'homme la capacité de choisir et de faire des efforts. L'homme est responsable de ses choix et sera jugé en conséquence. Le destin et le libre arbitre coexistent : Allah sait ce que l'homme choisira, mais c'est l'homme qui fait son choix. Le croyant fait des efforts tout en s'en remettant à Allah (tawakkul).",
  },
  {
    id: 652,
    category: "Les piliers de la foi",
    pillar: "destin",
    question: "Comment réagir face aux épreuves selon l'Islam ?",
    answer: "Face aux épreuves, le musulman doit :\n\n• Faire preuve de patience (sabr) et accepter le décret d'Allah\n• Se rappeler que les épreuves sont un moyen de purification des péchés\n• Invoquer Allah et chercher Son aide\n• Ne pas se plaindre du destin d'Allah\n\nLe Prophète ﷺ a dit : « L'affaire du croyant est étonnante, tout est un bien pour lui : s'il lui arrive un bonheur, il remercie et c'est un bien ; s'il lui arrive un malheur, il patiente et c'est un bien. » (Rapporté par Muslim)",
  },
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
