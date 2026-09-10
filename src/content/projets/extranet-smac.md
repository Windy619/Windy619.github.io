---
titre: 'Extranet Client SMAC'
sousTitre: >-
  Portail client couvrant sites, demandes, devis, factures et interventions, adossé à une hiérarchie
  de structures résolue récursivement qui cloisonne automatiquement les données visibles par client.
ordre: 3
statut: 'Livré'
ton: 'neutre'
contexte: 'Client SMAC SA'
role: 'Développeur en équipe'
periode: '04/2024 – 03/2025'
categories: ['securite', 'developpement']
stack: ['Laravel 11', 'PHP 8.2', 'MySQL', 'Blade', 'Vite']
services: ['Yajra DataTables', 'Leaflet', 'API Adresse data.gouv.fr', 'Laravel Socialite (Azure AD)', 'Spatie Permission']
captureLegende: 'Tableau de bord client'
kpis:
  - valeur: '8'
    label: 'Modules métier'
    note: 'servis en DataTables server-side'
  - valeur: 'SSO'
    label: 'Azure AD + comptes locaux'
    note: 'authentification multi-fournisseurs'
  - valeur: 'Leaflet'
    label: 'Sites géocodés'
    note: 'via l’API Adresse data.gouv.fr'
probleme:
  accroche: >-
    Chaque client ne doit voir que son périmètre, et ce périmètre n’est pas plat : il suit une
    hiérarchie de structures qui peut descendre sur plusieurs niveaux.
  detail: >-
    Réécrire la règle de visibilité dans chacun des huit modules aurait garanti l’oubli tôt ou tard.
    La contrainte structurante du projet était donc de résoudre la hiérarchie une seule fois, puis
    d’en faire dériver automatiquement tout filtrage et tout tableau de bord.
decisions:
  - titre: 'Résoudre la hiérarchie une seule fois'
    texte: >-
      La hiérarchie de structures est résolue récursivement et alimente le filtrage transverse : le
      cloisonnement par client est un effet de l’architecture, pas une condition répétée dans chaque
      requête.
  - titre: 'Pagination et tri côté serveur'
    texte: >-
      Les huit modules métier sont servis en DataTables server-side, ce qui garde des temps de
      réponse constants quand le volume de données d’un client augmente.
  - titre: 'Trois portes d’entrée, un seul modèle de droits'
    texte: >-
      Comptes locaux, SSO Azure AD via Socialite et impersonation pour le support convergent vers les
      mêmes rôles et permissions Spatie.
  - titre: 'Traçer les demandes d’intervention'
    texte: >-
      Le formulaire (captcha, pièces jointes) génère des e-mails transactionnels typés, journalisés
      dans un back-office de suivi : une demande reçue laisse une trace consultable.
securite:
  - titre: 'Cloisonnement automatique par client'
    texte: 'La visibilité découle de la hiérarchie résolue, jamais d’un filtre écrit à la main.'
    icone: 'shield'
  - titre: 'Rôles et permissions Spatie'
    texte: 'Un seul modèle de droits, quelle que soit la méthode d’authentification employée.'
    icone: 'lock'
  - titre: 'Impersonation réservée au support'
    texte: 'Permet de reproduire le point de vue d’un client sans partager ses identifiants.'
    icone: 'list'
---
