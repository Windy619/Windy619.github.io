import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Ajouter un projet = ajouter un fichier .md dans src/content/projets/.
 * Le schema ci-dessous valide le contenu au build : une faute de frappe
 * dans une cle fait echouer le build au lieu de casser la page en silence.
 */
const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: z.object({
    titre: z.string(),
    sousTitre: z.string(),
    ordre: z.number(),
    statut: z.string(),
    ton: z.enum(['accent', 'neutre', 'ambre']).default('neutre'),
    contexte: z.string(),
    role: z.string(),
    periode: z.string(),
    categories: z.array(
      z.enum(['sre', 'securite', 'ia', 'automatisation', 'developpement'])
    ),
    stack: z.array(z.string()),
    services: z.array(z.string()).default([]),
    captureLegende: z.string().optional(),
    kpis: z
      .array(z.object({ valeur: z.string(), label: z.string(), note: z.string().optional() }))
      .default([]),
    probleme: z.object({ accroche: z.string(), detail: z.string() }),
    decisions: z.array(z.object({ titre: z.string(), texte: z.string() })).default([]),
    securite: z
      .array(z.object({ titre: z.string(), texte: z.string(), icone: z.string().default('shield') }))
      .default([]),
    schema: z.enum(['doxo-pipeline']).optional(),
  }),
});

const poles = defineCollection({
  loader: file('./src/data/poles.json'),
  schema: z.object({
    ordre: z.number(),
    titre: z.string(),
    icone: z.string(),
    resume: z.string(),
    accroche: z.string(),
    points: z.array(z.string()),
    terrain: z.string(),
    chips: z.array(z.string()),
  }),
});

const experiences = defineCollection({
  loader: file('./src/data/experiences.json'),
  schema: z.object({
    ordre: z.number(),
    poste: z.string(),
    employeur: z.string(),
    lieu: z.string(),
    periode: z.string(),
    resume: z.string(),
    mention: z.string().optional(),
    points: z.array(z.string()),
    chips: z.array(z.string()),
  }),
});

const formations = defineCollection({
  loader: file('./src/data/formations.json'),
  schema: z.object({
    ordre: z.number(),
    periode: z.string(),
    intitule: z.string(),
    niveau: z.string().optional(),
    etablissement: z.string(),
    detail: z.string().optional(),
  }),
});

const annexes = defineCollection({
  loader: file('./src/data/annexes.json'),
  schema: z.object({
    ordre: z.number(),
    periode: z.string(),
    employeur: z.string(),
    poste: z.string(),
    detail: z.string(),
  }),
});

const outils = defineCollection({
  loader: file('./src/data/outils.json'),
  schema: z.object({
    ordre: z.number(),
    titre: z.string(),
    items: z.array(z.string()),
  }),
});

export const collections = { projets, poles, experiences, formations, annexes, outils };
