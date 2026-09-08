---
titre: 'DevWatch'
sousTitre: >-
  Plateforme de supervision d’infrastructure et de sécurité conçue et développée en solo : agent de
  collecte Bash/systemd, détection de brute-force SSH corrélée multi-serveurs, astreinte et escalade.
ordre: 4
statut: 'Projet personnel'
ton: 'ambre'
contexte: 'Conception et développement solo'
role: 'Développeur'
periode: 'Depuis juil. 2026'
categories: ['sre', 'ia', 'automatisation']
stack: ['Laravel 13', 'PHP 8.3', 'Inertia.js', 'Vue 3', 'TypeScript', 'Tailwind 4', 'MySQL']
services: ['Redis / Laravel Horizon', 'Laravel Reverb', 'MaxMind', 'AbuseIPDB', 'Mistral', 'n8n', 'GitLab CI']
captureLegende: 'Vue incidents'
kpis:
  - valeur: 'SSH'
    label: 'Détection brute-force'
    note: 'corrélation multi-serveurs'
  - valeur: 'Mistral'
    label: 'Analyse de logs'
    note: 'assistance à la lecture des journaux'
  - valeur: 'n8n'
    label: 'Webhooks no-code'
    note: 'automatisations sortantes'
probleme:
  accroche: >-
    Superviser plusieurs serveurs Linux revient vite à corréler à la main des journaux dispersés, et
    à découvrir une attaque une fois qu’elle a abouti.
  detail: >-
    Le projet est né du besoin de mettre bout à bout ce qui reste souvent séparé : la collecte de
    métriques, la détection de signaux de sécurité, la gestion d’astreinte, et l’automatisation des
    suites à donner. C’est le terrain où je fais converger les huit pôles du portfolio.
decisions:
  - titre: 'Un agent, pas un accès permanent'
    texte: >-
      La collecte d’uptime, de métriques serveur et de signaux de sécurité passe par un agent
      Bash/systemd installé sur les machines : rien à ouvrir vers l’extérieur pour superviser.
  - titre: 'Corréler avant d’alerter'
    texte: >-
      Une tentative de brute-force SSH isolée dit peu de choses. La détection croise les échecs entre
      serveurs et enrichit l’adresse en géolocalisation et réputation (MaxMind, AbuseIPDB) avant de
      déclencher quoi que ce soit.
  - titre: 'L’incident comme objet de première classe'
    texte: >-
      Astreinte, escalade et post-mortem sont modélisés dans l’application, avec des notifications
      multi-canal servies par Redis et Laravel Horizon.
  - titre: 'Laisser la suite ouverte'
    texte: >-
      Plutôt que de coder chaque réaction, les événements sortent par webhooks n8n : l’utilisateur
      compose ses automatisations sans toucher au code de la plateforme.
securite:
  - titre: 'Détection de brute-force SSH'
    texte: 'Corrélation des échecs d’authentification entre plusieurs serveurs supervisés.'
    icone: 'shield'
  - titre: 'Enrichissement de réputation IP'
    texte: 'Géolocalisation MaxMind et réputation AbuseIPDB attachées à chaque source suspecte.'
    icone: 'pin'
  - titre: 'Astreinte, escalade, post-mortem'
    texte: 'La chaîne de traitement d’un incident est outillée, pas laissée à la mémoire de l’astreinte.'
    icone: 'list'
---
