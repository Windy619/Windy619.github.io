import type { ImageMetadata } from 'astro';

/**
 * Les captures d'ecran sont resolues par convention de nommage : un fichier
 * `src/content/projets/<id>.png` est automatiquement associe au projet `<id>`.
 * Rien a declarer dans le Markdown : deposer le fichier suffit.
 *
 * Plusieurs captures : `<id>-2.png`, `<id>-3.png`, etc. s'ajoutent a la suite
 * de `<id>.png`, dans l'ordre du numero. Elles forment la galerie du projet.
 *
 * Formats acceptes : png, jpg, jpeg, webp, avif.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../content/projets/*.{png,jpg,jpeg,webp,avif}',
  { eager: true }
);

type Capture = { rang: number; image: ImageMetadata };

const parProjet = new Map<string, Capture[]>();

for (const [chemin, mod] of Object.entries(modules)) {
  const nom = chemin.split('/').pop()!.replace(/\.[^.]+$/, '');
  const suite = nom.match(/^(.+)-(\d+)$/);
  const id = suite ? suite[1] : nom;
  const rang = suite ? Number(suite[2]) : 1;
  parProjet.set(id, [...(parProjet.get(id) ?? []), { rang, image: mod.default }]);
}

/** Toutes les captures d'un projet, la principale en premier. */
export const capturesDe = (id: string): ImageMetadata[] =>
  (parProjet.get(id) ?? []).sort((a, b) => a.rang - b.rang).map((c) => c.image);

export type ImageGalerie = { src: ImageMetadata; alt: string; legende: string };

/**
 * Galerie prete a afficher. La legende de la capture n vient de
 * `captureLegendes[n]`, a defaut de `captureLegende` pour la premiere.
 */
export const galerieDe = (
  id: string,
  data: { titre: string; captureLegende?: string; captureLegendes?: string[] }
): ImageGalerie[] =>
  capturesDe(id).map((src, i) => {
    const legende =
      data.captureLegendes?.[i] ??
      (i === 0 ? data.captureLegende : undefined) ??
      `Capture ${i + 1}`;
    return { src, alt: `${data.titre}, ${legende}`, legende };
  });
