# Portfolio · JOHANESA Windy Olive

[![Deploiement GitHub Pages](https://github.com/Windy619/Windy619.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Windy619/Windy619.github.io/actions/workflows/deploy.yml)
🔗 **Site en ligne :** [https://windy619.github.io](https://windy619.github.io)

Site statique construit avec **Astro 7**. Aucun serveur applicatif : la sortie est
du HTML/CSS pur, déployable sur GitHub Pages.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run preview  # sert dist/ localement
npm run check    # contrôle des types et du contenu
```

Le build télécharge les polices depuis Google Fonts **une seule fois** puis les
auto-héberge dans `dist/` : le site en production ne fait aucun appel à Google.
Une connexion est donc nécessaire au moment du build.

## Modifier le contenu

Tout le contenu est en données, séparé du code. Rien à toucher dans les composants.

| Quoi | Où |
| --- | --- |
| Identité, coordonnées, lien du CV, disponibilité | `src/data/site.ts` |
| Les 8 pôles d’expertise | `src/data/poles.json` |
| Postes occupés | `src/data/experiences.json` |
| Diplômes | `src/data/formations.json` |
| Stages et missions courtes | `src/data/annexes.json` |
| Boîte à outils (page Expertise) | `src/data/outils.json` |
| Les projets | `src/content/projets/*.md` |

### Ajouter un projet

Créez un fichier dans `src/content/projets/`, par exemple `mon-projet.md`. Le nom
du fichier devient l’URL : `/projets/mon-projet/`. Copiez l’en-tête d’un projet
existant comme modèle.

Le schéma de validation vit dans `src/content.config.ts`. Une clé mal orthographiée
ou manquante **fait échouer le build** au lieu de casser la page en silence, c'est
volontaire.

Le corps Markdown (sous l’en-tête `---`) est optionnel : il s’affiche en bas de la
fiche projet. C’est là que peuvent aller des notes plus longues sur une étude de cas.

### Captures d’écran

Par convention de nommage : déposez `src/content/projets/<id>.png` à côté du
Markdown du projet, et la capture remplace automatiquement le placeholder, sur
la carte de la liste **et** sur la fiche. Rien à déclarer, rien à modifier dans
le code.

```
src/content/projets/doxo.md   →   src/content/projets/doxo.png
```

Formats acceptés : `png`, `jpg`, `jpeg`, `webp`, `avif`. Astro convertit en WebP,
génère les tailles responsives et pose `width`/`height` pour éviter tout décalage
au chargement. Capturez en 1440 × 900 sans redimensionner.

Les projets sans fichier gardent leur placeholder : vous pouvez donc les ajouter
un par un sans jamais casser le site.

> **Avant de publier une capture d’une application cliente** : vérifiez qu’aucune
> donnée personnelle ni raison sociale de client final n’y figure. Un jeu de
> démonstration vaut mieux qu’un floutage.

### CV en PDF

Déposez `CV_JOHANESA_Windy_Olive.pdf` dans `public/cv/`. Le chemin est configurable
dans `src/data/site.ts`.

### Formulaire de contact

Un site statique ne peut pas recevoir de POST. Tant que `formulaireEndpoint` vaut
`null` dans `src/data/site.ts`, la page Contact affiche les moyens de contact
directs (pas de formulaire mort). Renseignez une URL de réception (route Laravel,
Cloudflare Worker, service tiers) et le formulaire apparaît automatiquement.

## Déploiement GitHub Pages

1. Créez un dépôt **public** nommé `Windy619.github.io` et poussez ce dossier sur
   la branche `main`.
2. Dans **Settings → Pages**, choisissez la source **GitHub Actions**.
3. Le workflow `.github/workflows/deploy.yml` construit et publie à chaque push.

Le site est alors servi sur `https://windy619.github.io/`.

### Domaine personnalisé

Créez `public/CNAME` contenant le domaine (une ligne, sans `https://`), mettez à
jour `site` dans `astro.config.mjs` et l’URL du sitemap dans `public/robots.txt`,
puis pointez le DNS vers GitHub Pages.

## Structure

```
src/
  content.config.ts        schémas de validation du contenu
  content/projets/         une fiche projet = un fichier Markdown
  data/                    contenu structuré (JSON) + identité (site.ts)
  components/              briques réutilisables
  layouts/Layout.astro     <head>, navigation, pied de page
  pages/                   une page = un fichier
  styles/global.css        jetons de design et composants CSS
public/                    servi tel quel (favicon, CV, robots.txt)
```

## Choix techniques

- **Statique, sans base de données.** Le dépôt Git est la source de vérité :
  l’historique des modifications, c’est l’historique des commits.
- **Contenu validé au build.** Les collections Astro contrôlent chaque champ.
- **Polices auto-hébergées** avec repli ajusté métriquement, pour éviter le
  décalage visuel au chargement.
- **Un seul script client**, sur la page Projets, pour les filtres. Sans
  JavaScript, tous les projets restent visibles.
- **Thème sombre unique**, aligné sur les maquettes.
