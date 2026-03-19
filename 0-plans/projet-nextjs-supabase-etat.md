# Cours Fébus - Projet NextJS + Supabase

## Résumé du projet

Site web dynamique pour Cours Fébus (cours de dessin et peinture en Ariège) avec :
- **Frontend** : Next.js 16 avec CSS Webflow copié
- **Backend** : Supabase (PostgreSQL)
- **Admin** : Interface pour gérer les dates des stages

---

## État actuel (19 mars 2026)

### ✅ Terminé
- Importation du CSS Webflow complet (~8500 lignes)
- Copie des images et polices vers le dossier public
- Conversion de la page d'accueil en React/NextJS
- Configuration Supabase avec tables et données seed
- API pour CRUD des stages
- Interface admin `/admin/stages` fonctionnelle
- **NOUVEAU** : Page liste des stages `/stages` avec données dynamiques
- **NOUVEAU** : Pages détails stages `/stages/[slug]` avec style Webflow
- **NOUVEAU** : Menu navigation avec liens dynamiques vers les stages

### 🔄 En cours
- Conversion de la page galerie
- Formulaire de contact fonctionnel
- Déploiement sur Vercel

---

## Structure du projet

```
cours-febus-nextjs/
├── app/
│   ├── page.tsx              # Page d'accueil (liens stages dynamiques)
│   ├── layout.tsx           # Layout principal
│   ├── globals.css          # Styles personnalisés
│   ├── normalize.css        # Normalize CSS
│   ├── admin/
│   │   ├── login/page.tsx   # Page de connexion
│   │   ├── dashboard/page.tsx
│   │   └── stages/page.tsx  # Gestion des stages
│   ├── stages/
│   │   ├── page.tsx         # Liste des stages (dynamique)
│   │   └── [slug]/page.tsx  # Détail d'un stage (dynamique)
│   └── api/
│       ├── stages/route.ts   # API CRUD stages
│       └── gallery/route.ts
├── public/
│   ├── css/                 # CSS Webflow
│   ├── images/              # Images du site
│   └── fonts/               # Polices
├── lib/
│   └── supabase.ts          # Client Supabase (server + browser)
├── .env.local               # Variables d'environnement
└── supabase-setup.sql       # Script de setup BD
```

---

## Comment utiliser

### 1. Lancer le serveur de développement

```bash
cd cours-febus-nextjs
npm run dev
```

### 2. Accéder au site

- **Site public** : http://localhost:3000
- **Liste des stages** : http://localhost:3000/stages
- **Stage détail** : http://localhost:3000/stages/stage-de-peinture-a-lhuile
- **Admin login** : http://localhost:3000/admin/login
- **Gestion stages** : http://localhost:3000/admin/stages

### 3. Identifiants admin

- **Mot de passe** : `cours-febus-admin-secret-2025-secure`

---

## Base de données Supabase

### Tables

| Table | Description |
|-------|-------------|
| `stages` | Stages avec dates, places, actif/inactif |
| `gallery_items` | Images/vidéos de la galerie |
| `pages` | Contenu des pages (réservé) |

### Projet Supabase

- **URL** : https://depfowglgvsbtcdcktal.supabase.co
- **Console** : https://supabase.com/dashboard/project/depfowglgvsbtcdcktal
- **Token CLI** : `sbp_...` (à récupérer dans Supabase Dashboard > Account > Tokens)

### Variables d'environnement

```
NEXT_PUBLIC_SUPABASE_URL=https://depfowglgvsbtcdcktal.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_ADMIN_SECRET=cours-febus-admin-secret-2025-secure
```

**Note** : Ces secrets sont dans `.env.local` (non commité). Voir `.env.example` pour les variables à configurer.

---

## Fonctionnalités admin

### Gestion des stages (`/admin/stages`)

- ✅ Voir liste des stages
- ✅ Modifier titre et description
- ✅ Modifier nombre de places
- ✅ Activer/désactiver un stage
- ✅ Ajouter une session (date début, fin, nom, année)
- ✅ Supprimer une session
- ✅ Sauvegarder les modifications

### Format des dates (JSON)

```json
{
  "session": "Session été 2026",
  "start": "2026-07-07",
  "end": "2026-07-11",
  "year": 2026
}
```

---

## Pages stages dynamiques

### `/stages` - Liste des stages
- Affiche tous les stages actifs depuis Supabase
- Montre la prochaine session pour chaque stage
- Navigation avec dropdown vers chaque stage

### `/stages/[slug]` - Détail d'un stage
- Titre et description dynamiques
- Liste de toutes les sessions avec dates
- Formulaire de contact pré-rempli
- Style Webflow complet

### Slugs des stages en base
- `stage-illustration-numerique`
- `stage-de-peinture-a-lhuile`
- `stage-de-dessin-traditionnel`

---

## Pour mettre à jour le site

### Modifier les stages (via admin)

1. Aller sur `/admin/stages`
2. Cliquer sur "Modifier" pour un stage
3. Changer les dates, description, etc.
4. Sauvegarder

### Ajouter des images

1. Ajouter les fichiers dans `public/images/`
2. Utiliser le chemin `/images/nom-du-fichier.jpg`

### Ajouter une nouvelle page

1. Créer `app/nom-de-la-page/page.tsx`
2. Utiliser le même style que les pages existantes
3. Ajouter les liens dans la navigation

### Déployer sur Vercel

```bash
# À faire une fois
npm install -g vercel
vercel login

# Déploiement
cd cours-febus-nextjs
vercel deploy --prod
```

---

## Notes importantes

### CSS Webflow

Le fichier `public/css/cours-febus.css` contient ~8500 lignes de CSS. Les chemins des images/fonts ont été ajustés pour fonctionner avec Next.js :
- `/fonts/...` au lieu de `../fonts/...`
- `/images/...` au lieu de `../images/...`

### Next.js 16 - params Promise

Dans Next.js 16, les `params` des pages dynamiques sont des Promises :

```tsx
// ❌ Ancien code (Next.js 14)
export default function Page({ params }: { params: { slug: string } }) {
  return <h1>{params.slug}</h1>;
}

// ✅ Nouveau code (Next.js 16)
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}
```

### Token Supabase CLI

```bash
export SUPABASE_ACCESS_TOKEN="sbp_1f7df28a1dc493ca00e00cadd32943274bccd69a"
```

Le token peut être récupéré sur : https://supabase.com/dashboard/account/tokens

---

## À faire ensuite

1. ✅ ~~Connecter les pages de stages dynamiques aux données Supabase~~ (19 mars 2026)
2. Formulaire de contact fonctionnel (POST /api/contact)
3. Page galerie avec images Supabase Storage
4. Déployer sur Vercel en production
5. Ajouter la gestion de la galerie dans l'admin

---

## Journal des modifications

### 19 mars 2026
- Création de `app/stages/page.tsx` (liste des stages)
- Création de `app/stages/[slug]/page.tsx` (détail stage avec style Webflow)
- Mise à jour de `app/page.tsx` avec liens navigation dynamiques
- Correction de `lib/supabase.ts` pour SSR avec cookies
- Correction du bug params Promise dans `[slug]/page.tsx`
- Build réussi, site fonctionnel sur localhost:3000

### 18 mars 2026
- Document initial créé
- Setup complet du projet Next.js + Supabase
