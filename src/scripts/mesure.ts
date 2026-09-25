/**
 * Mesure d'audience GoatCounter (windy619.goatcounter.com), sans cookie.
 * Les pages vues sont comptees par le script count.js charge dans Layout.astro ;
 * ce module ajoute les evenements : clics de contact, CV, liens sortants, zooms.
 * En local, count.js ne compte rien : les tests de preview ne polluent pas les chiffres.
 */

declare global {
  interface Window {
    goatcounter?: { count?: (vars: { path: string; title?: string; event?: boolean }) => void };
  }
}

/** Compte un evenement, rattache a la page ou il a lieu. */
export const compterEvenement = (nom: string) =>
  window.goatcounter?.count?.({ path: nom, title: location.pathname, event: true });

/** Nom de l'evenement pour un lien, ou null s'il n'est pas suivi. */
const evenementDuLien = (lien: HTMLAnchorElement): string | null => {
  if (lien.protocol === 'mailto:') return 'contact-email';
  if (lien.protocol === 'tel:') return 'contact-telephone';
  if (lien.pathname.endsWith('.pdf')) return 'cv-pdf';
  if (lien.hostname.endsWith('linkedin.com')) return 'sortie-linkedin';
  if (lien.hostname === 'github.com') return 'sortie-github';
  return null;
};

/** Ecoute unique au niveau du document : tous les liens, y compris ceux ajoutes plus tard. */
export const suivreLiens = () =>
  document.addEventListener('click', (e) => {
    const lien = (e.target as Element | null)?.closest?.('a[href]');
    if (!(lien instanceof HTMLAnchorElement)) return;
    const nom = evenementDuLien(lien);
    if (nom) compterEvenement(nom);
  });
