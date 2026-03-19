import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cours Fébus - Cours de dessin et peinture en Ariège',
  description: 'Cours de dessin, peinture et illustration numérique à Saint-Jean-du-Falga. Stages et formations pour tous niveaux.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="stylesheet" href="/css/webflow.css" />
        <link rel="stylesheet" href="/css/cours-febus.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
