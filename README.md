# Samuel Mukadi — portfolio

Le site de présentation de **Samuel Mukadi**, chef de projet digital et orchestrateur d'IA.

Il sera publié à l'adresse **https://samuel-mukadi.github.io** (GitHub Pages, avec le https).

## Ce qu'il contient

Une seule page, pensée d'abord pour le téléphone :

- **Haut de page** : qui je suis, en une phrase, trois chiffres vrais, mes boutons de contact
  et le **paquet de cartes de mes projets** (Sangona, DOP Idara, DeVrs). La carte du dessus part
  sur le côté avec les flèches, en la faisant glisser du doigt, ou toute seule toutes les 6 secondes.
  Le bouton fléché d'une carte ouvre sa fiche complète.
- **Ruban rouge** : mes compétences et ma méthode, qui glissent quand on fait défiler la page.
- **Qui suis-je ?** : mon histoire, ma photo dans le grand carré, mon équipe
  (je décide, Claude construit, Codex vérifie) et ma méthode en 4 étapes.
- **Compétences** : gestion de projet et conception, orchestration d'IA, Git et GitHub,
  bases du web (en apprentissage).
- **Avis** (« Ce qu'ils pensent de moi ») : seulement des avis vrais. Avec Firebase réglé,
  la personne remplit un petit formulaire et son avis s'affiche tout de suite (protégé par
  `firebase/firestore.rules` ; Samuel retire un avis dans la console Firebase). Sans Firebase,
  le bouton ouvre WhatsApp.
- **Contact** : on choisit son besoin et pour quand ; le bouton WhatsApp s'ouvre avec le message
  déjà écrit. Aussi l'e-mail et GitHub.
- **Bas de page** : mes contacts, mon nom en grand, le menu.
- Un **rond WhatsApp** reste en bas à droite de l'écran pendant la lecture.

Inspiration : la façon dont le site aquidev.com présente ses projets (cartes empilées, mots penchés,
bloc de contact à choisir). Aucun texte, image ou code n'en est copié.

## Comment c'est fait

- [Astro](https://astro.build) produit des pages HTML simples et légères.
- Polices du système : rien à télécharger, le site s'ouvre vite même avec une connexion lente.
- Couleurs « Nuit et rouge » : nuit `#12141C`, rouge `#C62828` (le rouge de Sangona),
  or `#F5B841`, bordeaux `#4A0F14`, crème `#FFF7F0`.
- Sécurité : la page n'accepte que ses propres fichiers (règle « Content-Security-Policy »),
  aucun script venu d'ailleurs, aucun formulaire envoyé. Le numéro WhatsApp n'est jamais écrit en clair.
- Pour les personnes qui préfèrent moins de mouvement (réglage du téléphone), les animations
  s'arrêtent et les cartes ne défilent pas toutes seules.

## Lancer le site sur son ordinateur

Il faut Node.js 22.23 ou plus récent.

```bash
npm install
npm run dev
```

Puis ouvrir l'adresse affichée (en général http://localhost:4321).

## Où modifier quoi

| Pour changer…                          | Ouvrir                              |
| -------------------------------------- | ----------------------------------- |
| les textes d'une section               | `src/components/<Section>.astro`    |
| les 3 projets (et la démo)             | `src/data/projets.js`               |
| les avis reçus autrement (WhatsApp…)   | `src/data/avis.js`                  |
| les avis en direct (projet Firebase)   | `src/data/firebase.js` ; règles : `firebase/firestore.rules` |
| WhatsApp, e-mail, GitHub               | `src/data/contact.js`               |
| les couleurs et les boutons            | `src/styles/global.css`             |
| les images des projets                 | `public/images/`                    |
| ma photo (dans « Qui suis-je ? »)      | `node outils/preparer-photo.mjs <photo> public/images/samuel 800 800` (la réduit et la rend légère) |
| le titre et la description             | `src/pages/index.astro`             |
| ma photo dans les petits ronds (haut et bas) | `public/images/samuel-rond.*` (240 × 240, faite avec `outils/preparer-photo.mjs`) |
| l'image d'aperçu (partage WhatsApp…)   | `outils/image-apercu.html` (photo : `outils/photo-apercu.jpg`), puis `node outils/fabriquer-image-apercu.mjs` et augmenter le `?v=` dans `src/layouts/Base.astro` |
