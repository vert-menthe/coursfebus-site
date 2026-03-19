# Cours Fébus - Next.js + Supabase

Site dynamique basé sur le site statique original.

## Configuration Requise

### 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com) et créez un compte
2. Créez un nouveau projet "cours-febus"
3. Attendez que le projet soit provisionné

### 2. Configurer la base de données

1. Dans le tableau de bord Supabase, allez dans **SQL Editor**
2. Copiez le contenu du fichier `supabase-setup.sql`
3. Exécutez le SQL

### 3. Configurer les variables d'environnement

1. Copiez `.env.example` vers `.env.local`
2. Dans Supabase → Settings → API:
   - Copiez **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copiez **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Générez une clé secrète aléatoire pour `ADMIN_SECRET` (minimum 32 caractères)

### 4. Lancer en local

```bash
cd cours-febus-nextjs
npm install
npm run dev
```

Le site sera disponible sur http://localhost:3000

## Structure du projet

```
cours-febus-nextjs/
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── stages/[slug]/        # Pages stages dynamiques
│   ├── galerie/              # Page galerie
│   ├── admin/
│   │   ├── login/            # Login admin
│   │   ├── dashboard/        # Dashboard
│   │   └── stages/           # Gestion des stages
│   └── api/
│       ├── stages/           # API CRUD stages
│       └── gallery/          # API CRUD gallery
├── lib/
│   └── supabase.ts          # Client Supabase
└── supabase-setup.sql        # Script de setup DB
```

## Fonctionnalités

### Admin
- [x] Login par mot de passe
- [x] Dashboard admin
- [x] Modifier dates des stages
- [x] Modifier places disponibles
- [x] Activer/désactiver stages
- [ ] Upload images galerie
- [ ] Supprimer images galerie
- [ ] Modifier pages

### Frontend
- [x] Affichage stages dynamiques
- [ ] Page galerie dynamique
- [ ] Formulaire de contact
- [ ] Responsive design

## Déploiement

### Vercel (recommandé)

1. Poussez le code sur GitHub
2. Connectez le repo à Vercel
3. Configurez les variables d'environnement dans Vercel
4. Déployez!

### Variables d'environnement sur Vercel

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
ADMIN_SECRET=votre-clé-secrète
```

## Prochaines étapes

1. ⏳ Configurer Supabase (action requise)
2. ⏳ Importer le CSS Webflow complet
3. ⏳ Finaliser les pages frontend
4. ⏳ Migrer les images vers Supabase Storage
5. ⏳ Déployer sur Vercel
