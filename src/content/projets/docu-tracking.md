---
titre: 'Docu-Tracking'
sousTitre: >-
  Outil de traçabilité et de suivi du cycle de vie de l'archivage documentaire :
  chaîne de traitement en 6 étapes, conteneurs identifiés par code-barres, indexation
  documentaire avec import de métadonnées et gestion des erreurs de rapprochement.
ordre: 5
statut: 'Livré'
ton: 'neutre'
contexte: 'Développeur en équipe'
role: 'Développeur en équipe'
periode: '2023'
categories: ['developpement', 'securite']
stack: ['Laravel 9', 'PHP 8.1', 'MySQL', 'Bootstrap']
services: []
captureLegende: 'Suivi de chaîne documentaire'
kpis:
  - valeur: '6'
    label: 'Étapes de traitement'
    note: 'enlèvement → envoi client'
  - valeur: 'Code-barres'
    label: 'Identification conteneurs'
    note: 'hiérarchie traçable à chaque étape'
  - valeur: 'Excel / CSV'
    label: 'Import de métadonnées'
    note: 'indexation documentaire en masse'
probleme:
  accroche: >-
    Suivre un dossier physique entre l'enlèvement chez le client et son retour numérisé
    implique de corréler des informations dispersées sur six étapes sans visibilité commune.
  detail: >-
    L'absence de traçabilité centralisée rendait difficile de localiser un dossier en
    cours, de détecter les erreurs de rapprochement au moment de l'indexation, ou de
    garantir que chaque colis avait bien franchi chaque étape. Il fallait modéliser la
    chaîne une fois pour toutes, en liant chaque conteneur à son historique de passage.
decisions:
  - titre: 'Hiérarchie de conteneurs identifiés par code-barres'
    texte: >-
      Chaque boîte, colis ou lot reçoit un code-barres qui l'ancre dans la hiérarchie.
      La position dans la chaîne est lisible à tout moment sans saisie manuelle : un
      scan suffit à enregistrer le passage à une étape.
  - titre: 'Six étapes comme autant d''états machines'
    texte: >-
      Enlèvement, réception, préparation, numérisation, indexation, envoi client :
      chaque transition est tracée avec horodatage et responsable. Un dossier ne peut
      avancer que dans l'ordre défini, ce qui élimine les états incohérents.
  - titre: 'Import Excel/CSV pour l''indexation en masse'
    texte: >-
      Plutôt que de saisir les métadonnées document par document, l'opérateur importe
      un fichier fourni par le client. Un job de traitement valide chaque ligne et
      remonte les erreurs de rapprochement sans bloquer l'import des lignes valides.
  - titre: 'Gestion explicite des erreurs de rapprochement'
    texte: >-
      Les erreurs (référence inconnue, doublon, champ manquant) sont isolées dans
      une file dédiée, consultable et corrigeable sans relancer l'import complet.
      L'opérateur ne perd pas le travail déjà validé.
securite:
  - titre: 'Traçabilité horodatée à chaque étape'
    texte: 'Chaque passage en étape est journalisé avec l''identité de l''opérateur et l''horodatage.'
    icone: 'list'
  - titre: 'Cloisonnement par dossier client'
    texte: 'Les lots et conteneurs sont rattachés à un client : un opérateur ne voit que son périmètre.'
    icone: 'shield'
---
