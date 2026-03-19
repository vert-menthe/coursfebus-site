# Notes - Refonte Dynamic Cours Fébus

Date: 2026-03-14
Statut: En cours d'implémentation

## Décisions validées

| Choix | Décision |
|-------|----------|
| Frontend | Next.js 14 (SSR/SSG) |
| Hébergement | Vercel (prévu) |
| Backend + DB | Supabase (PostgreSQL) |
| Stockage images/vidéos | Supabase Storage |
| Auth | Supabase Auth (1 seul admin) |
| Priorité | Stages (dates, places) |

---

## 1. État Actuel du Site

### Structure
- **9 pages HTML** à la racine + **3 pages de stages** dans `cours-en-presentiel/`
- **Static-only** : tout le contenu est codé en dur dans les fichiers HTML
- **CSS**: 8,495 lignes (généré par Webflow)
- **123 images** dans `/images/`
- **28 vidéos** dans `/videos/`

### Contenu dynamique identifié

| Élément | Localisation | Fréquence de changement |
|---------|--------------|------------------------|
| **Dates des stages** | 3 pages HTML de stages | Haute (chaque session) |
| **Places disponibles** | Stages (6 max par groupe) | Haute |
| **Texte des pages** | Toutes pages HTML | Moyenne |
| **Galerie** | galerie.html (28 items) | Haute (régulier) |
| **Prix** | conditions-generales.html | Rare |
| **Formulaire contact** | Partout (déjà PHP) | Faible |

---

## 2. Objectifs du Projet

### Phase 1: Conversion React (SSR)
- **Objectif**: Converter le site en React avec Server-Side Rendering
- **Contrainte**: Conserver **exactement** le même aspect visuel
- **Framework suggéré**: Next.js (SSR/SSG natif, excellent pour SEO)

### Phase 2: Backend Admin
- **Gestion des stages**:
  - Modifier dates (début, fin)
  - Modifier places disponibles
  - Activer/désactiver un stage
  - Ajouter nouveau stage
  
- **Gestion du contenu**:
  - Modifier texte des pages
  - Modifier informations (adresse, email, etc.)
  
- **Gestion galerie**:
  - Voir liste des assets publiés
  - Ajouter nouvelle image/vidéo
  - Supprimer asset
  - Réordonner

---

## 3. Architecture Technique Suggérée

### Stack Technique

| Composant | Tech suggérée | Raison |
|-----------|---------------|--------|
| Frontend | Next.js 14 | SSR/SSG, SEO, même look |
| Backend | Node.js + Express ou Next.js API routes | Intégré |
| Base de données | PostgreSQL ou SQLite | Relationnel, structuré |
| Stockage images | Cloudinary ou AWS S3 | Facile, CDN |
| Authentification | NextAuth.js | Simple, flexible |
| Déploiement | Vercel | Gratuit pour hobby, facile |

### Structure Base de Données (Draft)

```
users
  - id
  - email
  - password_hash
  - role (admin)

stages
  - id
  - slug (stage-illustration-numerique)
  - title
  - description
  - dates (JSON: [{start, end, year}])
  - max_students
  - current_spots
  - is_active
  - order

gallery_items
  - id
  - title
  - type (image/video)
  - asset_url
  - thumbnail_url
  - order
  - is_published
  - created_at

pages
  - id
  - slug
  - title
  - content (Markdown/HTML)
  - metadata (JSON)

site_settings
  - key
  - value
```

---

## 4. Défis et Solutions

### Défi 1: Conserver le même look (Isomorphique)

**Problème**: Le CSS Webflow est complexe (8,500 lignes)

**Solutions**:
1. **Copy-paste CSS existant** -Importer le CSS Webflow directement dans Next.js
2. **Wrapper les composants** - Créer des composants React qui ressemblent exactement aux éléments Webflow
3. **CSS Modules** - Petit à petit, refactorer en modules CSS

**Approche recommandée**: Commencer avec approche 1, puis фасилит par composant

---

### Défi 2: Gestion des Images/Vidéos

**Problème**: 123 images + 28 vidéos, hébergement actuel?

**Solutions**:
1. **Garder sur le serveur actuel** - URLs absolues
2. **Migration vers Cloudinary** - Plus facile pour le backend admin
3. **AWS S3** - Plus flexible

**Recommandation**: Cloudinary (plus simple pour gallery + backend)

---

### Défi 3: Backend Ultra-spécifique

**Problème**: Besoins très custom (dates, places, gallery)

**Solutions**:
1. **CMS headless** (Strapi, Sanity) - Peut-être trop générique
2. **Custom + Admin panel** - Plus de travail, mais exactement ce qu'il faut
3. **Notion comme CMS** - Simple, mais peut-être trop limité

**Recommandation**: Custom + Admin panel (précision des besoins)

---

### Défi 4: Ajouter/Supprimer pages

**Problème**: Comment créer dynamiquement les routes?

**Solution Next.js**:
- Utiliser le système de fichiers pour les routes
- ou API routes + base de données
- ou SSG avec generateStaticParams

---

## 5. Questions en Suspens

### À clarifier avec l'utilisateur

1. **Hébergement cible**?
   - Vercel (facile, gratuit hobby)
   - VPS/Dedicated (plus de contrôle)
   - Garder hébergement actuel?

2. **Budget temporel**?
   - Ce projet est conséquent (plusieurs semaines)

3. **Migration images**?
   - Garder sur serveur actuel?
   - Migrer vers Cloudinary/S3?

4. **Base de données**?
   - PostgreSQL (production)
   - SQLite (développement, suffisant pour ce حجم)

5. **Gestion des utilisateurs**?
   - Un seul admin (Julien)?
   - Plusieurs utilisateurs?

6. **Contenus autres que stages et galerie**?
   - Modifier le texte des autres pages aussi?
   - Pages statiques ou dynamiques?

---

## 6. Étapes d'implémentation Suggérées

### Étape 1: Préparation (1-2 jours)
- [ ] Extraire tout le contenu texte des pages
- [ ] Cataloguer toutes les images/vidéos
- [ ] Lister tous les champs à modifier en admin

### Étape 2: Setup Next.js (1 jour)
- [ ] Initialiser projet Next.js
- [ ] Importer CSS existant
- [ ] Tester rendu des pages

### Étape 3: Base de données (1 jour)
- [ ] Définir schéma complet
- [ ] Créer migrations
- [ ] Seed données initiales

### Étape 4: Backend API (2-3 jours)
- [ ] Routes CRUD stages
- [ ] Routes CRUD gallery
- [ ] Routes CRUD pages
- [ ] Upload images/vidéos

### Étape 5: Frontend Admin (3-5 jours)
- [ ] Dashboard admin
- [ ] Gestion stages (dates, places)
- [ ] Gestion galerie (drag-drop reorder)
- [ ] Édition texte pages

### Étape 6: Intégration Frontend (2-3 jours)
- [ ] Connecter pages au données
- [ ] Tester responsive
- [ ] Vérifier SEO

### Étape 7: Déploiement (1 jour)
- [ ] Deploy Vercel
- [ ] Migration images si nécessaire
- [ ] Tests end-to-end

**Estimation totale**: ~12-17 jours

---

## 7. Alternatives à Considérer

### Option A: CMS Headless (Sanity/Strapi)
- **Avantages**: Plus rapide à démarrer, UI admin déjà faite
- **Inconvénients**: Peut être overkill, moins flexible pour les besoins spécifiques

### Option B: WordPress + Thème Custom
- **Avantages**: Backend déjà fait, familier
- **Inconvénients**: Lourd, pas vraiment "moderne"

### Option C: Webflow CMS
- **Avantages**: Garder l'écosystème Webflow
- **Inconvénients**: Abonnement mensuel, moins de contrôle

### Option D: Notion comme CMS
- **Avantages**: Ultra-simple, interface connue
- **Inconvénients**: Limité pour gallery, dépendance externe

---

## 8. Risques

| Risque | Impact | Mitigation |
|--------|--------|-------------|
| CSS trop complexe | Moyen | Approche progressive, ne pas tout réécrire |
| Temps de développement | Élevé | Prioriser fonctionnalités, itérer |
| Migration images | Moyen | Garder URLs actuelles si possible |
| Perte de SEO | Élevé | Tester avant/après, redirections si needed |

---

## Prochaines Étapes

1. **Réunion de clarification** pour répondre aux questions en suspens
2. **Décision architecture** (Next.js vs autre)
3. **Décision hébergement**
4. **Extraction contenu** poursee prototype

---

*Document à compléter au fur et à mesure*
