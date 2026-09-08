import type { ImageMetadata } from 'astro';

/**
 * Les captures d'ecran sont resolues par convention de nommage : un fichier
 * `src/content/projets/<id>.png` est automatiquement associe au projet `<id>`.
 * Rien a declarer dans le Markdown — deposer le fichier suffit.
 *
 * Formats acceptes : png, jpg, jpeg, webp, avif.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../content/projets/*.{png,jpg,jpeg,webp,avif}',
  { eager: true }
);

const parProjet = new Map<string, ImageMetadata>(
  Object.entries(modules).map(([chemin, mod]) => [
    chemin.split('/').pop()!.replace(/\.[^.]+$/, ''),
    mod.default,
  ])
);

export const captureDe = (id: string): ImageMetadata | undefined => parProjet.get(id);
