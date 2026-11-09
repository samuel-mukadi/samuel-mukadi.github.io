// Réglages du site (Astro).
// Le site est publié à l'adresse https://samuel-mukadi.github.io (GitHub Pages, en https).
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://samuel-mukadi.github.io',

  // Sécurité : tout le style et tous les scripts restent dans des fichiers à part,
  // jamais écrits dans la page. Ainsi la règle de sécurité (CSP) peut interdire
  // tout code ajouté dans la page par quelqu'un d'autre.
  build: {
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
