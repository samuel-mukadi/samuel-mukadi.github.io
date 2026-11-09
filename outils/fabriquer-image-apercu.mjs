// Fabrique l'image d'aperçu du site (public/og-image.jpg, 1200 × 630)
// à partir du dessin outils/image-apercu.html, avec Microsoft Edge sans fenêtre.
// Utilisation (depuis le dossier du site) : node outils/fabriquer-image-apercu.mjs
import { spawn } from 'node:child_process';
import { setTimeout as attendre } from 'node:timers/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const ici = path.dirname(fileURLToPath(import.meta.url));
const dessin = pathToFileURL(path.join(ici, 'image-apercu.html')).href;
const sortie = path.join(ici, '..', 'public', 'og-image.jpg');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9337;
const profil = mkdtempSync(path.join(tmpdir(), 'apercu-'));

const navigateur = spawn(edge, [
  '--headless', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
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

await envoyer('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
await envoyer('Page.enable');
await envoyer('Page.navigate', { url: dessin });
await attendre(1500);
const image = await envoyer('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
writeFileSync(sortie, Buffer.from(image.result.data, 'base64'));
console.log(`Image d'aperçu fabriquée : public/og-image.jpg (${Math.round(image.result.data.length * 0.75 / 1024)} Ko)`);

await envoyer('Browser.close').catch(() => {});
ws.close();
navigateur.kill();
await attendre(500);
try { rmSync(profil, { recursive: true, force: true }); } catch {}
