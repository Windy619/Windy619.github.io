---
titre: 'Prospection SMAC'
sousTitre: >-
  Application cartographique d’aide à la prospection commerciale : isochrones multi-échelles sur
  cache MySQL pré-calculé, filtrage géographique sur données INSEE, SSO SAML 2.0 auto-hébergé.
ordre: 2
statut: 'Livré · maintenu jusqu’en 09/2025'
ton: 'neutre'
contexte: 'Client SMAC SA'
role: 'Développeur'
periode: '09/2024 – 02/2025'
categories: ['securite', 'developpement']
stack: ['PHP 8.2', 'MySQL / PDO', 'Leaflet.js', 'Apache / cPanel']
services: ['OpenRouteService API', 'SimpleSAMLphp', 'Microsoft Entra ID (SAML 2.0)']
captureLegende: 'Carte et couches d’isochrones'
kpis:
  - valeur: 'GeoJSON'
    label: 'Cache isochrones'
    note: 'polygones pré-calculés en base'
  - valeur: 'SAML 2.0'
    label: 'SSO Entra ID'
    note: 'fournisseur auto-hébergé'
  - valeur: 'INSEE'
    label: 'Unités urbaines · EPCI'
    note: 'seuil de population ajustable'
probleme:
  accroche: >-
    Calculer des zones d’accessibilité en temps et en distance sur tout un territoire, sans épuiser
    le quota de l’API d’itinéraires ni faire attendre l’utilisateur.
  detail: >-
    Chaque isochrone demandé à un service externe coûte un appel et plusieurs secondes. À l’échelle
    d’une campagne de prospection, le calcul à la volée était intenable : il fallait déplacer le coût
    au moment du pré-calcul et ne recourir à l’API que pour ce qui manque réellement.
decisions:
  - titre: 'Pré-calculer, puis se replier sur l’API'
    texte: >-
      Les polygones GeoJSON sont stockés en cache MySQL et servis directement. L’appel à
      OpenRouteService ne survient qu’en absence de cache, ce qui limite la consommation de quota
      tout en gardant une couverture complète.
  - titre: 'Héberger soi-même le fournisseur SAML'
    texte: >-
      Plutôt qu’une dépendance à un service d’authentification tiers, un SimpleSAMLphp auto-hébergé
      dialogue avec Microsoft Entra ID, avec une garde d’accès posée sur l’ensemble des pages.
  - titre: 'Agréger côté SQL, pas côté PHP'
    texte: >-
      Le filtrage sur données INSEE (unités urbaines, EPCI) passe par des requêtes agrégées dédiées
      avec seuil de population ajustable, au lieu de charger puis filtrer en mémoire.
  - titre: 'Regrouper les marqueurs à l’affichage'
    texte: >-
      Clustering Leaflet, autocomplétion des communes et gestion des couches d’isochrones par
      établissement : la carte reste lisible même sur un territoire dense.
securite:
  - titre: 'SSO SAML 2.0 contre Microsoft Entra ID'
    texte: 'Aucun mot de passe applicatif : l’identité vient du fournisseur d’identité du client.'
    icone: 'lock'
  - titre: 'Garde d’accès sur l’ensemble des pages'
    texte: 'Le contrôle est posé en amont des routes, pas page par page.'
    icone: 'shield'
---
