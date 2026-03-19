# Plan d'Implémentation - Cours Fébus Dynamic

## Objectif
Transformer le site statique en application Next.js + Supabase en moins de 10 jours.

---

## Checklist Globale

### Phase 1: Setup & Infrastructure
- [ ] 1. Créer projet Next.js
- [ ] 2. Configurer Supabase (projet + tables + storage)
- [ ] 3. Importer CSS Webflow existant
- [ ] 4. Tester rendu de base

### Phase 2: Core Backend (Supabase)
- [ ] 5. Créer table `stages`
- [ ] 6. Créer table `gallery_items`
- [ ] 7. Créer table `pages`
- [ ] 8. Configurer Supabase Storage (bucket images + videos)
- [ ] 9. Configurer authentification admin
- [ ] 10. Seed données stages initiaux

### Phase 3: API Routes
- [ ] 11. Routes CRUD stages (GET, PUT)
- [ ] 12. Routes gallery (GET, POST, DELETE)
- [ ] 13. Route upload image

### Phase 4: Admin Panel
- [ ] 14. Page login admin
- [ ] 15. Dashboard admin
- [ ] 16. Édition stages (dates, places)
- [ ] 17. Upload images gallery

### Phase 5: Frontend Next.js
- [ ] 18. Page d'accueil (index)
- [ ] 19. Pages stages dynamiques
- [ ] 20. Page galerie
- [ ] 21. Autres pages

### Phase 6: Déploiement
- [ ] 22. Déployer sur Vercel
- [ ] 23. Migration images vers Supabase Storage
- [ ] 24. Tests finaux

---

## Jours par Phase

| Phase | Jours estimés |
|-------|---------------|
| Phase 1: Setup | 0.5 jour |
| Phase 2: Backend Supabase | 1 jour |
| Phase 3: API Routes | 1 jour |
| Phase 4: Admin Panel | 2 jours |
| Phase 5: Frontend | 3 jours |
| Phase 6: Déploiement | 1 jour |
| **TOTAL** | **8.5 jours** |

---

## Sous-agents à utiliser

Pour accélérér, utiliser des sous-agents pour:
- Phase 3 & 4: Création API et Admin (tâches indépendantes)
- Phase 5: Création des pages frontend

---

## Accès Supabase à configurer

Une fois le projet Supabase créé, fournir:
- SUPABASE_URL
- SUPABASE_ANON_KEY

Tables à créer:
```sql
-- stages
CREATE TABLE stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  dates JSONB NOT NULL,
  max_students INTEGER DEFAULT 6,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- gallery_items
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  asset_url TEXT NOT NULL,
  thumbnail_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- pages
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  metadata JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

Row Level Security:
- stages: public read, admin write
- gallery_items: public read, admin write  
- pages: public read, admin write

---

## Structure Next.js

```
cours-febus/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (accueil)
│   ├── stages/
│   │   └── [slug]/page.tsx
│   ├── galerie/page.tsx
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   └── stages/page.tsx
│   └── api/
│       ├── stages/route.ts
│       ├── gallery/route.ts
│       └── upload/route.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── StageCard.tsx
│   └── GalleryGrid.tsx
├── lib/
│   ├── supabase.ts
│   └── utils.ts
├── styles/
│   └── globals.css (CSS Webflow importé)
└── public/
    └── (images migrées depuis /images/)
```

---

## Priorité: Stages

Fonctionnalités admin pour stages:
1. Voir liste des stages
2. Éditer dates (tableau: session, date début, date fin)
3. Éditer places disponibles
4. Activer/désactiver stage

Données stages initiaux à seed:
- stage-illustration-numerique
- stage-de-peinture-a-lhuile  
- stage-de-dessin-traditionnel
