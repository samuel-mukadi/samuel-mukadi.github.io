// Les 3 projets montrés dans le portfolio.
// Une carte par projet : nom, genre de projet, l'état, une image.
// La fiche complète (bouton fléché) : une phrase, puis le problème, pour qui, ce que ça change,
// mon rôle et où on en est.
//
// RÈGLE DE SAMUEL : ne pas exposer les projets. On reste général sur le projet (pas de
// fonctions détaillées, pas de noms internes, pas d'outils techniques, pas de stratégie) ;
// on peut détailler MON RÔLE. Les détails restent confidentiels.
// Pas de code ni de documents : les dépôts restent privés.
// Pour ajouter la démo de Sangona plus tard : écrire son lien dans « demo ».

export const projets = [
  {
    nom: 'Sangona',
    type: 'Réseau social',
    phrase:
      "Un réseau social où chaque cercle (une promo, un club, une association) garde son journal : ce que le groupe crée et vit reste, page après page.",
    probleme:
      'Dans les groupes en ligne, les échanges défilent puis se perdent : un groupe n’a pas de mémoire, et chacun reste dans son coin.',
    pourQui:
      'Les jeunes et les étudiants de la RDC, et les groupes organisés : promos, clubs, associations.',
    points: [
      'Un groupe garde la trace de ce qu’il crée et vit.',
      'La vie sociale, la vie de groupe et la vie professionnelle réunies au même endroit.',
      'Pensé pour un petit téléphone et une connexion lente.',
    ],
    role:
      "Idée, vision et conception : j'ai défini le concept, les parcours des utilisateurs, les écrans et le plan de travail. Je pilote la construction avec mon équipe d'IA et je valide chaque étape.",
    avancement: 'La vision est validée. Un premier prototype est en préparation.',
    etat: 'Prototype en préparation',
    image: '/images/sangona.svg',
    alt: "Le journal d'un cercle affiché sur un téléphone",
    demo: null,
    bientot: 'Démo bientôt',
  },
  {
    nom: 'DOP Idara',
    type: 'Gestion pour les PME',
    phrase:
      'Une plateforme pour aider les petites et moyennes entreprises de la RDC à gérer leur activité et à mieux décider.',
    probleme:
      'Beaucoup de petites et moyennes entreprises de la RDC manquent d’outils simples pour suivre leur activité et décider avec des chiffres clairs.',
    pourQui: 'Les patrons et les gérants de petites et moyennes entreprises en RDC.',
    points: [
      'Suivre son activité au même endroit.',
      'Des chiffres clairs pour mieux décider.',
      'Des écrans simples, même pour qui n’aime pas les chiffres.',
    ],
    role: 'Chef de projet : la vision, les parcours des utilisateurs et la conception des écrans.',
    avancement: 'En conception.',
    etat: 'En conception',
    image: '/images/dop-idara.svg',
    alt: "Un tableau de bord de gestion avec des chiffres et un graphique",
    demo: null,
    bientot: null,
  },
  {
    nom: 'DeVrs',
    type: 'Jeu pour apprendre Python',
    phrase:
      'Un jeu pour apprendre Python : on écrit du vrai code pour automatiser le travail de la ville de Min, guidé par Kai.',
    probleme:
      'Apprendre à coder, c’est souvent apprendre une syntaxe sans voir à quoi elle sert dans la vraie vie.',
    pourQui: 'D’abord les débutants qui veulent apprendre Python.',
    points: [
      'On apprend en jouant, sur des situations concrètes.',
      'On écrit du vrai code Python et on voit tout de suite son effet.',
      'Un guide accompagne le joueur pas à pas.',
    ],
    role:
      "Idée et direction du projet : je fixe la vision et je valide chaque étape. Je coordonne l'équipe d'IA qui le construit et le vérifie.",
    avancement: 'En développement : les premières briques sont en test.',
    etat: 'En développement',
    image: '/images/devrs.svg',
    alt: 'Une fenêtre de code Python au-dessus des toits d’une petite ville',
    demo: null,
    bientot: null,
  },
];
