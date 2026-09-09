---
titre: 'Scripts Ops'
sousTitre: >-
  Automatisation de l'administration système en Bash et Makefile : intégrité fichiers
  AIDE, sauvegarde Docker 3 niveaux et pipeline de déploiement SSH sans CI/CD pour
  hébergement mutualisé avec bascule atomique et rollback instantané.
ordre: 6
statut: 'En production'
ton: 'neutre'
contexte: 'SA TARATASY'
role: 'Administrateur Systèmes'
periode: '2023 – 2026'
categories: ['sre', 'automatisation', 'securite']
stack: ['Bash', 'GNU Make', 'Docker', 'SSH']
services: ['AIDE', 'systemd / cron', 'sendmail', 'mysqldump', 'Composer', 'Vite']
captureLegende: 'Pipeline de déploiement'
kpis:
  - valeur: '3'
    label: 'Niveaux de sauvegarde'
    note: 'quotidien J+5 · hebdo × 4 · mensuel × 6'
  - valeur: '9'
    label: 'Étapes de déploiement'
    note: 'bascule atomique · rollback immédiat'
  - valeur: 'AIDE'
    label: 'Intégrité fichiers'
    note: 'rapport e-mail conditionnel quotidien'
probleme:
  accroche: >-
    Administrer plusieurs serveurs sans GitLab Runner disponible oblige à fiabiliser
    manuellement trois opérations à risque : détecter toute altération de fichier,
    sauvegarder les conteneurs sans interruption de service, déployer sans panne.
  detail: >-
    L'hébergement mutualisé cible (AmenPanel) interdit tout agent CI/CD côté serveur.
    Les sauvegardes Docker quotidiennes devaient couvrir image ET volumes, avec rotation
    automatique pour ne pas saturer le disque. Et la détection d'intrusion devait être
    passive, autonome et alerter uniquement en cas de modification réelle.
decisions:
  - titre: 'Makefile comme orchestrateur de déploiement SSH'
    texte: >-
      En l'absence de GitLab Runner, un Makefile local orchestre les 9 étapes du
      déploiement via SSH : build des assets, transfert d'archive, install Composer,
      pré-compilation Blade, dump SQL, maintenance, bascule atomique du lien current,
      migrations et remise en ligne. Chaque étape est indépendante et peut être relancée seule.
  - titre: 'Bascule atomique par lien symbolique'
    texte: >-
      Le passage à une nouvelle release utilise mv -Tf sur un lien temporaire :
      l'ancien current reste intact jusqu'au swap. En cas d'échec de migration,
      le site reste en maintenance et un make rollback rebascule sur la release
      précédente en quelques secondes sans retransférer quoi que ce soit.
  - titre: 'Sauvegarde Docker 3 niveaux avec rotation'
    texte: >-
      docker commit + docker save sauvegarde l'image, les volumes montés sont
      copiés et compressés en tar.gz. Trois fenêtres temporelles (quotidien,
      vendredi, 1er du mois) avec des plafonds distincts évitent la saturation
      disque tout en gardant six mois d'historique mensuel.
  - titre: 'Rapport AIDE conditionnel pour éviter l''alerte-fatigue'
    texte: >-
      Le script envoie WARNING uniquement si AIDE détecte des différences réelles,
      et INFO sinon. Les bases de signatures sont archivées sur 7 jours glissants.
      L'initialisation automatique au premier lancement évite toute intervention manuelle.
securite:
  - titre: 'Détection d''intégrité AIDE quotidienne'
    texte: 'Scan des signatures SHA/MD5 sur les fichiers système, alerte e-mail conditionnelle.'
    icone: 'shield'
  - titre: 'Dump SQL avant chaque migration'
    texte: 'Sauvegarde compressée gzip-9 lue depuis shared/.env, aucun mot de passe dans le Makefile.'
    icone: 'lock'
  - titre: 'Audit anti-webshell du docroot'
    texte: 'La cible www-audit liste les .php présents dans le docroot et signale tout fichier suspect.'
    icone: 'list'
---
