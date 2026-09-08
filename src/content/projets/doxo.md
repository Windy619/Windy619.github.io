---
titre: 'Documenthom OCR — DOXO'
sousTitre: >-
  Plateforme multi-tenant de capture documentaire : cinq canaux surveillés, découpage automatique des
  flux de pages, extraction structurée par schéma JSON via Mistral OCR.
ordre: 1
statut: 'En développement continu'
ton: 'accent'
contexte: 'SA TARATASY'
role: 'Développeur'
periode: 'Depuis nov. 2025'
categories: ['ia', 'securite', 'developpement']
stack: ['Laravel 12', 'PHP 8.2', 'MySQL', 'Blade / Bootstrap 5', 'Livewire']
services: ['Mistral OCR API', 'pdftk / Ghostscript', 'Laravel Sanctum', 'GitLab CI']
captureLegende: 'Écran de découpage'
schema: 'doxo-pipeline'
kpis:
  - valeur: '3'
    label: "Niveaux d'isolation"
    note: 'tenant · client · établissement'
  - valeur: '17'
    label: 'Policies'
    note: 'posées sur les ressources cloisonnées'
  - valeur: '259'
    label: "Fichiers de tests d'architecture"
    note: 'invariants transverses verrouillés'
  - valeur: '6'
    label: 'Règles de découpage'
    note: "du code-barres à l'analyse OCR"
probleme:
  accroche: >-
    Les documents n’arrivent jamais proprement : un même scan contient plusieurs factures, une boîte
    IMAP mélange les expéditeurs, et un dossier SharePoint reçoit tout sans distinction.
  detail: >-
    Il fallait donc un pipeline capable de reconnaître où un document s’arrête et où le suivant
    commence, avant même de savoir ce qu’il contient — puis d’en extraire des champs exploitables,
    tout en garantissant qu’un client ne puisse jamais voir les documents d’un autre. C’est cette
    dernière contrainte qui a dicté l’architecture.
decisions:
  - titre: 'Lire le XML plutôt que l’image'
    texte: >-
      Une facture Factur-X / ZUGFeRD porte déjà ses données dans un XML CII embarqué. Le pipeline le
      détecte et le lit directement : pas d’appel OCR, pas d’incertitude de reconnaissance, pas de
      coût d’API.
  - titre: 'Conserver la provenance de chaque valeur'
    texte: >-
      Chaque champ extrait garde son indice de confiance, son numéro de page et ses coordonnées. Une
      valeur douteuse est donc localisable dans le document d’origine, au lieu d’être une donnée
      orpheline à vérifier à la main.
  - titre: 'Le cloisonnement testé, pas seulement écrit'
    texte: >-
      L’isolation à trois niveaux repose sur 17 policies, mais une policy oubliée sur une nouvelle
      ressource ne se voit pas. Une suite de tests d’architecture vérifie les invariants transverses
      à chaque exécution du pipeline CI.
  - titre: 'Six règles de découpage plutôt qu’un modèle'
    texte: >-
      Code-barres, page blanche, mot-clé, regex, page colorée, analyse OCR : des séparateurs
      explicites, combinables et prévisibles, que le client peut configurer selon sa manière réelle
      de scanner.
securite:
  - titre: 'Chiffrement AES-256-GCM au repos'
    texte: 'Tous les PDF stockés sont chiffrés ; le déchiffrement passe par le contexte du tenant.'
    icone: 'lock'
  - titre: 'Empreintes SHA-256 revérifiées chaque nuit'
    texte: "Toute altération d’un document archivé est détectée sans attendre qu’un utilisateur l’ouvre."
    icone: 'shield'
  - titre: 'Outils RGPD — articles 15 et 17'
    texte: 'Droit d’accès et droit à l’effacement outillés dans l’application, non traités hors système.'
    icone: 'list'
  - titre: 'API REST versionnée via Sanctum'
    texte: 'Les intégrations tierces consomment une surface stable et authentifiée par jeton.'
    icone: 'code'
---
