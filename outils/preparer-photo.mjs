// Prépare une photo pour le site : la recadre, la réduit et l'enregistre en deux versions
// légères (.webp pour les navigateurs récents, .jpg pour les autres), avec Edge sans fenêtre.
//
// Utilisation (depuis le dossier du site) :
//   node outils/preparer-photo.mjs <photo source> <sortie sans extension> <largeur> <hauteur> [x y l h]
// - largeur, hauteur : la taille finale en pixels ;
// - x y l h (facultatif) : la zone à garder dans la photo source (en pixels).
//   Sans zone, la photo est coupée au centre aux bonnes proportions.
// Exemple : node outils/preparer-photo.mjs C:\photos\moi.jpg public/images/samuel 800 800
import { spawn } from 'node:child_process';
import { setTimeout as attendre } from 'node:timers/promises';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const [source, sortie, largeur, hauteur, ...zone] = process.argv.slice(2);
if (!source || !sortie || !largeur || !hauteur) {
  console.log('Utilisation : node outils/preparer-photo.mjs <photo> <sortie> <largeur> <hauteur> [x y l h]');
  process.exit(1);
}

const types = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
const type = types[path.extname(source).toLowerCase()];
if (!type) throw new Error('Format de photo non reconnu (jpg, png ou webp).');
const donnees = `data:${type};base64,${readFileSync(source).toString('base64')}`;

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9338;
const profil = mkdtempSync(path.join(tmpdir(), 'photo-'));
const navigateur = spawn(edge, [
  '--headless', '--disable-gpu', '--no-first-run',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profil}`, 'about:blank',
], { stdio: 'ignore' });

let cibles;
for (let essai = 0; essai < 40 && !cibles; essai++) {
  await attendre(250);
  try { cibles = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch {}
}
if (!cibles) throw new Error("Edge n'a pas démarré.");
const ws = new WebSocket(cibles.find((c) => c.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let numero = 0;
const attentes = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && attentes.has(m.id)) { attentes.get(m.id)(m); attentes.delete(m.id); }
});
const envoyer = (method, params = {}) => new Promise((r) => {
  const id = ++numero; attentes.set(id, r); ws.send(JSON.stringify({ id, method, params }));
});

const L = Number(largeur);
const H = Number(hauteur);
const [zx, zy, zl, zh] = zone.map(Number);
const reponse = await envoyer('Runtime.evaluate', {
  awaitPromise: true,
  returnByValue: true,
  expression: `(async () => {
    const image = new Image();
    image.src = ${JSON.stringify(donnees)};
    await image.decode();
    const iw = image.naturalWidth, ih = image.naturalHeight;
    let x = ${zone.length === 4 ? zx : 'null'}, y = ${zone.length === 4 ? zy : 'null'};
    let l = ${zone.length === 4 ? zl : 'null'}, h = ${zone.length === 4 ? zh : 'null'};
    if (x === null) {
      // Coupe au centre, aux proportions demandées
      const rapport = ${L} / ${H};
      if (iw / ih > rapport) { h = ih; l = ih * rapport; } else { l = iw; h = iw / rapport; }
      x = (iw - l) / 2; y = (ih - h) / 2;
    }
    const toile = document.createElement('canvas');
    toile.width = ${L}; toile.height = ${H};
    const g = toile.getContext('2d');
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = 'high';
    g.drawImage(image, x, y, l, h, 0, 0, ${L}, ${H});
    return { iw, ih, webp: toile.toDataURL('image/webp', 0.82), jpg: toile.toDataURL('image/jpeg', 0.84) };
  })()`,
});

const r = reponse.result.result?.value;
if (!r) throw new Error('La photo n’a pas pu être préparée : ' + JSON.stringify(reponse.result.exceptionDetails ?? reponse));
for (const format of ['webp', 'jpg']) {
  const octets = Buffer.from(r[format].split(',')[1], 'base64');
  writeFileSync(`${sortie}.${format}`, octets);
  console.log(`${sortie}.${format} : ${L} × ${H}, ${Math.round(octets.length / 1024)} Ko (source ${r.iw} × ${r.ih})`);
}

await envoyer('Browser.close').catch(() => {});
ws.close();
navigateur.kill();
await attendre(500);
try { rmSync(profil, { recursive: true, force: true }); } catch {}
