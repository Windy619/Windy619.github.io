/**
 * Identite et coordonnees. Un seul endroit a modifier.
 */
export const site = {
  nom: 'JOHANESA Windy Olive',
  marque: { racine: 'windyolive', suffixe: '.ops' },
  titre: 'Administrateur Systemes, Reseaux & Cloud | DevOps & Securite',
  ville: 'Antananarivo, Madagascar',
  fuseau: 'UTC+3',
  // Mettez a null pour masquer le badge de disponibilite du hero.
  disponibilite: 'Ouvert aux missions',
  // Delai de reponse annonce. null = la mention n'est pas affichee.
  delaiReponse: null as string | null,
  // Modalites de travail. null = la mention n'est pas affichee.
  modalites: 'remote' as string | null,
  email: 'windy.liva@gmail.com',
  // Volontairement vide : le depot est public et son historique est permanent.
  // Ajoutez un numero ici et le bloc Telephone reapparait sur la page Contact.
  telephones: [] as string[],
  github: { label: 'github.com/Windy619', url: 'https://github.com/Windy619' },
  linkedin: {
    label: 'linkedin.com/in/johanesa-windy-olive',
    url: 'https://www.linkedin.com/in/johanesa-windy-olive',
  },
  cv: '/cv/CV_JOHANESA_Windy_Olive.pdf',
  // Endpoint POST du formulaire de contact. Tant qu'il vaut null, la page
  // Contact n'affiche pas de formulaire (un formulaire mort est pire que pas
  // de formulaire) : seuls les moyens de contact directs sont proposes.
  // Renseignez ici une route Laravel, une Cloudflare Worker ou un service
  // tiers, et le formulaire apparait automatiquement.
  formulaireEndpoint: null as string | null,
  experienceAnnees: 7,
} as const;

export const nav = [
  { libelle: 'Expertise', href: '/expertise/' },
  { libelle: 'Projets', href: '/projets/' },
  { libelle: 'Parcours', href: '/parcours/' },
  { libelle: 'Contact', href: '/contact/' },
] as const;

export const categoriesProjet = [
  { id: 'sre', libelle: 'SRE' },
  { id: 'securite', libelle: 'Securite' },
  { id: 'ia', libelle: 'IA' },
  { id: 'automatisation', libelle: 'Automatisation' },
  { id: 'developpement', libelle: 'Developpement' },
] as const;
