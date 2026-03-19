-- Cours Fébus - Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. STAGES TABLE
CREATE TABLE IF NOT EXISTS stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  dates JSONB NOT NULL DEFAULT '[]'::jsonb,
  max_students INTEGER DEFAULT 6,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. GALLERY ITEMS TABLE
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  asset_url TEXT NOT NULL,
  thumbnail_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PAGES TABLE
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read stages" ON stages FOR SELECT USING (true);
CREATE POLICY "Public can read gallery" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public can read pages" ON pages FOR SELECT USING (true);

-- Admin write policies (controlled via API with service role key)
CREATE POLICY "Admin can manage stages" ON stages FOR ALL USING (true);
CREATE POLICY "Admin can manage gallery" ON gallery_items FOR ALL USING (true);
CREATE POLICY "Admin can manage pages" ON pages FOR ALL USING (true);

-- 4. SEED INITIAL STAGES DATA
INSERT INTO stages (slug, title, description, dates, max_students, is_active, order_index) VALUES
(
  'stage-illustration-numerique',
  'Stage d''illustration numérique',
  'Découvrez les bases de l''illustration numérique avec Photoshop et Procreate. Idéal pour les débutants souhaitant explorer le monde du digital art.',
  '[
    {"session": "Session été 2026", "start": "2026-07-07", "end": "2026-07-11", "year": 2026}
  ]'::jsonb,
  6,
  true,
  1
),
(
  'stage-de-peinture-a-lhuile',
  'Stage de peinture à l''huile',
  'Initiation et perfectionnement à la peinture à l''huile. Apprenez les techniques classiques de la peinture académique.',
  '[
    {"session": "Session été 2026", "start": "2026-07-21", "end": "2026-07-26", "year": 2026},
    {"session": "Session été 2025", "start": "2025-08-19", "end": "2025-08-23", "year": 2025}
  ]'::jsonb,
  6,
  true,
  2
),
(
  'stage-de-dessin-traditionnel',
  'Stage de dessin traditionnel',
  'Maîtrisez les fondamentaux du dessin académique avec la méthode Bargue. Approche traditionnelle pour tous niveaux.',
  '[
    {"session": "Session été 2026", "start": "2026-08-04", "end": "2026-08-08", "year": 2026}
  ]'::jsonb,
  6,
  true,
  3
)
ON CONFLICT (slug) DO NOTHING;

-- 5. CREATE STORAGE BUCKET FOR IMAGES
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public can view gallery images" ON storage.objects 
FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Admin can upload gallery images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Admin can delete gallery images" ON storage.objects 
FOR DELETE USING (bucket_id = 'gallery');

-- 6. CREATE ADMIN USER (optional - using simple password auth instead)
-- Note: For simplicity, we're using a shared password in env variables
-- rather than individual user accounts

-- Done!
