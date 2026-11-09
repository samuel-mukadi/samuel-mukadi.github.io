// Les 3 projets montrés dans le portfolio.
// Une carte par projet : nom, genre de projet, une phrase, mon rôle, l'état, une image.
// Pas de code ni de documents : les dépôts restent privés.
// Pour ajouter la démo de Sangona plus tard : écrire son lien dans « demo ».

export const projets = [
  {
    nom: 'Sangona',
    type: 'Réseau social',
    phrase:
      "Un réseau social où chaque cercle (une promo, un club, une association) garde son journal : ce que le groupe crée et vit reste, page après page.",
    role: "Idée, vision et conception. Je pilote la construction avec mon équipe d'IA.",
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
    role: 'Chef de projet : vision, parcours et conception des écrans.',
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
    role: "Idée et direction du projet. Je coordonne l'équipe d'IA qui le construit.",
    etat: 'En développement',
    image: '/images/devrs.svg',
    alt: 'Une fenêtre de code Python au-dessus des toits d’une petite ville',
    demo: null,
    bientot: null,
  },
];
