import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase';

async function getStages() {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from('stages')
    .select('slug, title')
    .eq('is_active', true)
    .order('order_index', { ascending: true });
  
  if (error) {
    console.error('Error fetching stages:', error);
    return [];
  }
  
  return data || [];
}

export default async function Home() {
  const stages = await getStages();

  return (
    <div className="page-wrapper">
      {/* Navigation */}
      <nav className="navbar14_component w-nav">
        <div className="navbar14_container">
          <Link href="/" className="navbar14_logo-link w-nav-brand w--current">
            <img src="/images/relume-106888.png" width={134} alt="Cours Fébus" className="navbar14_logo" />
          </Link>
          <nav className="navbar14_menu w-nav-menu" role="navigation">
            <div className="navbar14_menu-link-wrapper">
              <div className="navbar14_menu-links">
                <Link href="/" className="navbar14_link w-nav-link w--current">Accueil</Link>
                <div className="navbar14_menu-dropdown w-dropdown">
                  <div className="navbar14_dropdown-toggle w-dropdown-toggle">
                    <Link href="/stages" className="text-size-regular">Stages</Link>
                  </div>
                  <nav className="navbar14_dropdown-list-2 w-dropdown-list">
                    <Link href="/stages" className="navbar14_dropdown-link-2 w-dropdown-link">Tous nos stages</Link>
                    {stages.map(stage => (
                      <Link key={stage.slug} href={`/stages/${stage.slug}`} className="navbar14_dropdown-link-2 w-dropdown-link">
                        {stage.title}
                      </Link>
                    ))}
                  </nav>
                </div>
                <Link href="/galerie.html" className="navbar14_link w-nav-link">Galerie</Link>
              </div>
              <div className="navbar14_button-wrapper">
                <Link href="#contact" className="button-2 is-small trigger-contact w-button">Nous contacter</Link>
              </div>
            </div>
          </nav>
          <div className="navbar14_menu-button trigger-contact w-nav-button">
            <div className="menu-icon2">
              <div className="menu-icon2_line-top"></div>
              <div className="menu-icon2_line-middle">
                <div className="menu-icon1_line-middle-inner"></div>
              </div>
              <div className="menu-icon2_line-bottom"></div>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-wrapper">
        {/* Hero Section */}
        <header className="section_header127 color-scheme-1">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-header">
                <div className="header127_component">
                  <div className="header127_content">
                    <div className="header127_content-left">
                      <div className="title-fluid-container">
                        <h1 className="heading-style-h1-giant title-fluid">
                          Cours de Dessin<br />et de Peinture<br />
                          <span className="text-weight-bold">en Ariège</span>
                        </h1>
                      </div>
                      <p className="text-size-medium text-color-2">
                        Une formation artistique guidée par un artiste diplômé de l&apos;Académie des Arts classiques de Florence. 
                        Nous enseignons en petits groupes les savoirs-faire fondamentaux qui vous permettront de construire votre propre style.
                      </p>
                      <div className="margin-top margin-medium">
                        <div className="button-group">
                          <Link href="#contact" className="button w-button">Contactez-nous</Link>
                          <Link href="#en-savoir-plus" className="button is-secondary w-button">En savoir plus</Link>
                        </div>
                      </div>
                    </div>
                    <div className="header127_image-group">
                      <img 
                        src="/images/cours-dessin-peinture-ariege_1.avif" 
                        width={537} 
                        alt="Cours Fébus - Cours de Dessin &amp; Peinture en Ariège" 
                        className="image" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Cours en présentiel / à distance / Atelier */}
        <section className="section_layout236 color-scheme-1">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-bottom padding-xlarge">
                <div className="layout236_component">
                  <div className="w-layout-grid layout236_list">
                    {/* Cours en présentiel */}
                    <div className="layout236_item">
                      <div className="layout236_item_content">
                        <div className="margin-bottom margin-xxsmall">
                          <h2 className="heading-style-h4">Nos cours en présentiel</h2>
                        </div>
                        <div className="margin-bottom margin-xxsmall">
                          <p className="text-size-regular text-color-3">
                            <strong>trois sessions de cours par an</strong>.
                          </p>
                        </div>
                        <p className="text-size-regular text-color-3">
                          Vous intégrerez un groupe de six étudiants maximum et progresserez à votre rythme grâce à un encadrement personnalisé.
                        </p>
                        <div className="margin-top margin-xsmall">
                          <div className="button-group">
                            <Link href="/stages" className="button is-secondary is-small w-inline-block">
                              <div>En savoir plus</div>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <img 
                        src="/images/soleil-presentiel2x.avif" 
                        width={528} 
                        alt="Découvrez nos cours de dessin et de peinture en atelier" 
                        className="image-bloc-bottom" 
                      />
                    </div>

                    {/* Cours à distance */}
                    <div className="layout236_item color-scheme-3">
                      <div className="layout236_item_content">
                        <div className="margin-bottom margin-xsmall">
                          <h2 className="heading-style-h4">Nos cours à distance</h2>
                        </div>
                        <div className="margin-bottom margin-xxsmall">
                          <p className="text-size-regular text-color-4">Les formations en lignes seront bientôt disponibles. </p>
                        </div>
                        <div className="margin-bottom margin-xxsmall">
                          <p className="text-size-regular text-color-4">
                            <strong>Des dizaines de fiches PDF et des vidéos explicatives.</strong>
                          </p>
                        </div>
                        <p className="text-size-regular text-color-4">Restez connectés !</p>
                      </div>
                      <img 
                        src="/images/soleil-distanciel2x.avif" 
                        width={528} 
                        alt="Découvrez nos cours de peinture et de dessin en ligne" 
                        className="image-bloc-bottom" 
                      />
                    </div>

                    {/* Atelier */}
                    <div className="layout236_item">
                      <div className="layout236_item_content">
                        <div className="margin-bottom margin-xxsmall">
                          <h2 className="heading-style-h4">Notre atelier</h2>
                        </div>
                        <p className="text-size-regular text-color-3">
                          Les cours sont donnés à <strong>notre atelier de Saint-Jean-du-Falga</strong>, en Ariège. 
                          Nos étudiants profitent sur place de tout le matériel nécessaire : crayons, papiers, pinceaux, toiles, palettes, couleurs, etc.
                        </p>
                      </div>
                      <img 
                        src="/images/soleil-atelier2x.avif" 
                        width={528} 
                        alt="Découvrez nos cours de peinture et de dessin en atelier" 
                        className="image-bloc-bottom" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instructor Section */}
        <section className="section_layout412 color-scheme-2">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-medium">
                <div className="layout412_component">
                  <div className="w-layout-grid layout412_content">
                    <div className="layout412_content-left">
                      <div className="margin-bottom margin-small">
                        <h2 className="heading-style-h2">Loïc, votre instructeur</h2>
                      </div>
                      <div className="margin-bottom margin-medium">
                        <p className="text-size-medium text-color-2">
                          Notre artiste, formé à l&apos;Académie des Arts classiques de Florence, allie tradition et innovation. 
                          Son expertise technique et sa passion pour la peinture font de chaque cours une expérience unique.
                        </p>
                      </div>
                      <div className="w-layout-grid layout412_item-list">
                        <div className="layout412_text-wrapper">
                          <div className="margin-bottom margin-xsmall">
                            <h3 className="heading-style-h6">Biographie</h3>
                          </div>
                          <p className="text-size-regular text-color-3">
                            Loïc est diplômé d&apos;un certificat en arts visuels obtenu en 2023 à l&apos;
                            <strong>Académie des Arts classiques de Florence</strong>. Inspirée du manga, son approche met l&apos;accent sur la technique, la délicatesse et le réalisme.
                          </p>
                        </div>
                        <div className="layout412_text-wrapper">
                          <div className="margin-bottom margin-xsmall">
                            <h3 className="heading-style-h6">Expérience</h3>
                          </div>
                          <p className="text-size-regular text-color-3">
                            <strong>Auteur et dessinateur indépendant</strong>. Loïc a signé en 2019 chez Vivlio pour un roman feuilleton en quinze épisodes. 
                            Il répond à diverses commandes artistiques, alliant son <strong>expertise classique</strong> à sa passion pour le manga.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="layout412_image-wrapper">
                      <img 
                        src="/images/votre-instructeur2x_1.avif" 
                        width={616} 
                        alt="Loïc, votre instructeur" 
                        className="layout412_image img-cut-left img-shadow" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section_contact19 color-scheme-3">
          <img src="/images/soleil_dark.png" loading="lazy" alt="" className="image-2" />
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-mediumsmall">
                <div className="contact19_component">
                  <div className="margin-bottom margin-medium">
                    <div className="max-width-large">
                      <h2 className="heading-style-h3">Contactez-nous</h2>
                    </div>
                  </div>
                  <div className="w-layout-grid contact19_grid-list">
                    <div className="contact19_item">
                      <div className="contact19_icon-wrapper">
                        <div className="icon-embed-medium w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="none" viewBox="0 0 30 24">
                            <path fill="#D8BB7B" d="M27 0H3C1.345 0 0 1.345 0 3v18c0 1.654 1.345 3 3 3h24c1.654 0 3-1.346 3-3V3c0-1.655-1.346-3-3-3Zm0 3v.767L15 13.1 3 3.768V3h24ZM3 21V7.566l11.079 8.617a1.491 1.491 0 0 0 1.842 0L27 7.566 27.003 21H3Z"></path>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="margin-bottom margin-xsmall">
                          <h3 className="heading-style-h4">Par e-mail</h3>
                        </div>
                        <p className="text-size-regular text-color-4">N&apos;hésitez pas à nous écrire pour toute demande.</p>
                        <div className="margin-top margin-small">
                          <a href="mailto:coursfebus@gmail.com?subject=Demande%20de%20contact" className="text-style-link">coursfebus@gmail.com</a>
                        </div>
                      </div>
                    </div>
                    <div className="contact19_item">
                      <div className="contact19_icon-wrapper">
                        <div className="icon-embed-medium w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" fill="none" viewBox="0 0 30 29">
                            <path fill="#D8BB7B" d="M22.894 15.44a1.5 1.5 0 0 0-2.121 0l-2.391 2.39c-1.109-.33-3.177-1.08-4.488-2.39-1.311-1.312-2.061-3.38-2.391-4.489l2.391-2.39a1.5 1.5 0 0 0 0-2.122l-6-6a1.499 1.499 0 0 0-2.121 0L1.705 4.507A2.998 2.998 0 0 0 .826 6.66c.035 2.136.6 9.555 6.447 15.402 5.847 5.847 13.266 6.41 15.404 6.447h.041a2.96 2.96 0 0 0 2.108-.88l4.068-4.067a1.499 1.499 0 0 0 0-2.121l-6-6.002Z"></path>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="margin-bottom margin-xsmall">
                          <h3 className="heading-style-h4">Par téléphone</h3>
                        </div>
                        <p className="text-size-regular text-color-4">Appelez-nous pour des informations supplémentaires.</p>
                        <div className="margin-top margin-small">
                          <a href="tel:0620362137" className="text-style-link">06 20 36 21 37</a>
                        </div>
                      </div>
                    </div>
                    <div className="contact19_item">
                      <div className="contact19_icon-wrapper">
                        <div className="icon-embed-medium w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" fill="none" viewBox="0 0 31 30">
                            <path fill="#D8BB7B" d="M8.167 7.5h15v3h-15v-3Zm0 6h10.5v3h-10.5v-3Z"></path>
                            <path fill="#D8BB7B" d="M27.667 0h-24c-1.655 0-3 1.345-3 3v27l8-6h19c1.654 0 3-1.346 3-3V3c0-1.655-1.346-3-3-3Zm0 21h-20l-4 3V3h24v18Z"></path>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="margin-bottom margin-xsmall">
                          <h3 className="heading-style-h4">Via le formulaire</h3>
                        </div>
                        <p className="text-size-regular text-color-4">Envoyez-nous un message depuis notre formulaire de contact.</p>
                        <div className="margin-top margin-small">
                          <a href="#contact-form" className="text-style-link">Aller au formulaire de contact</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Sections */}
        <section id="en-savoir-plus" className="section_layout349">
          <div className="padding-global">
            <div className="container-large">
              <div className="w-layout-grid layout349_component">
                <div className="layout349_content-wrapper">
                  {/* Savoir-faire classique */}
                  <div className="layout349_content">
                    <div className="text-style-tagline text-color-2">Notre philosophie</div>
                    <div className="margin-bottom margin-xsmall">
                      <h2 className="heading-style-h2">Un savoir-faire classique</h2>
                    </div>
                    <div className="margin-bottom margin-small">
                      <p className="text-size-medium text-color-2">
                        La mission du Cours Fébus est de vous offrir les savoirs-faire fondamentaux qui vous permettront de dessiner ce que vous voulez, comme vous le voulez.
                      </p>
                    </div>
                    <div className="margin-bottom margin-xxsmall">
                      <p className="text-size-regular text-color-3">Pour cela, nous nous basons sur des méthodes qui ont fait leurs preuves, héritées de la Renaissance ou du XIXe siècle.</p>
                    </div>
                    <div className="margin-bottom margin-xxsmall">
                      <p className="text-size-regular text-color-3">Nous enseignons les concepts incontournables que la perspective, la théorie des couleurs, le dessin tonal et constructif.</p>
                    </div>
                    <div className="margin-bottom margin-xxsmall">
                      <p className="text-size-regular text-color-3">Sans oublier la technique de la peinture à l&apos;huile, qui, par l&apos;infinité de possibilités qu&apos;elle offre à l&apos;artiste, vous permettra de trouver votre propre style.</p>
                    </div>
                    <div className="layout349_mobile-image-wrapper">
                      <img 
                        src="/images/peinture-savoir-faire-classique-mobile_1.avif" 
                        width={616} 
                        alt="Un savoir-faire classique" 
                        className="layout349_mobile-image img-cut-right img-shadow" 
                      />
                    </div>
                  </div>

                  {/* Le meilleur matériel */}
                  <div className="layout349_content">
                    <div className="text-style-tagline text-color-2">Notre philosophie</div>
                    <div className="margin-bottom margin-small">
                      <h2 className="heading-style-h2">Le meilleur matériel</h2>
                    </div>
                    <div className="margin-bottom margin-xsmall">
                      <p className="text-size-medium text-color-2">Un matériel inadéquat ou de mauvaise qualité est la meilleure façon de décourager les jeunes artistes.</p>
                    </div>
                    <div className="margin-bottom margin-xsmall">
                      <p className="text-size-regular text-color-3">
                        Pour que peindre soit toujours un plaisir, nous mettons à votre disposition un matériel d&apos;excellence : des pigments purs, extra-fins, moulus en France ou en Hollande. 
                        Quant à nos pinceaux, ils sont fabriqués à la main par la maison Rosemary&amp;Co, en Angleterre.
                      </p>
                    </div>
                    <div className="margin-bottom margin-xsmall">
                      <p className="text-size-regular text-color-3">Tout le matériel nécessaires à votre formation vous sera remis sur place, sans supplément de tarif.</p>
                    </div>
                    <div className="layout349_mobile-image-wrapper">
                      <img 
                        src="/images/peinture-materiel-mobile_1.avif" 
                        width={371} 
                        alt="Le meilleur matériel de peinture et de dessin" 
                        className="layout349_mobile-image img-cut-left img-shadow" 
                      />
                    </div>
                  </div>

                  {/* Accompagnement personnalisé */}
                  <div className="layout349_content">
                    <div className="text-style-tagline text-color-2">Notre philosophie</div>
                    <div className="margin-bottom margin-small">
                      <h2 className="heading-style-h2">Un accompagnement personnalisé</h2>
                    </div>
                    <div className="margin-bottom margin-xsmall">
                      <p className="text-size-medium text-color-2">Des cours particuliers ou en petits groupes.</p>
                    </div>
                    <div className="margin-bottom margin-xsmall">
                      <p className="text-size-regular text-color-3">Nous ne recevons jamais plus de six étudiants à la fois. Ainsi, nous sommes en mesure d&apos;offrir des leçons personnalisées à chacun d&apos;entre vous.</p>
                    </div>
                    <div className="margin-bottom margin-xsmall">
                      <p className="text-size-regular text-color-3">Grâce à notre catalogue étendu de références et d&apos;exercices, vous êtes en mesure de travailler sur des sujets adaptés à votre niveau et à vos envies.</p>
                    </div>
                    <div className="button-group">
                      <Link href="/stages" className="button is-secondary is-small w-button">Nos cours en atelier</Link>
                    </div>
                    <div className="layout349_mobile-image-wrapper">
                      <img 
                        src="/images/accompagnement-perso-mobile_1.avif" 
                        width={371} 
                        alt="Un accompagnement personnalisé" 
                        className="layout349_mobile-image img-cut-right img-shadow" 
                      />
                    </div>
                  </div>
                </div>
                <div className="layout349_desktop-image-wrapper">
                  <img 
                    src="/images/peinture-savoir-faire-classique2x_1.avif" 
                    width={616} 
                    alt="Un savoir-faire classique" 
                    className="layout349_image is-image1 img-shadow" 
                  />
                  <img 
                    src="/images/peinture-materiel2x_1.avif" 
                    width={616} 
                    alt="Le meilleur matériel de peinture et de dessin" 
                    className="layout349_image is-image2 img-shadow" 
                  />
                  <img 
                    src="/images/accompagnement-perso2x_1.avif" 
                    width={616} 
                    alt="Un accompagnement personnalisé" 
                    className="layout349_image is-image3 img-shadow" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer_content">
            <div>
              <h3 className="heading-style-h4" style={{ color: '#fff' }}>Cours Fébus</h3>
              <p className="text-size-regular" style={{ color: '#fff0d3' }}>
                Cours de dessin et de peinture en Ariège
              </p>
            </div>
            <div>
              <h4 style={{ color: '#fff' }}>Contact</h4>
              <p style={{ color: '#fff0d3' }}>
                <a href="mailto:coursfebus@gmail.com" style={{ color: '#fff0d3' }}>coursfebus@gmail.com</a>
                <br />
                <a href="tel:0620362137" style={{ color: '#fff0d3' }}>06 20 36 21 37</a>
              </p>
            </div>
            <div>
              <h4 style={{ color: '#fff' }}>Adresse</h4>
              <p style={{ color: '#fff0d3' }}>
                32 rue Gaston de Foix<br />
                09100 Saint-Jean-du-Falga
              </p>
            </div>
            <div>
              <h4 style={{ color: '#fff' }}>Liens</h4>
              <p>
                <Link href="/stages" style={{ color: '#fff0d3' }}>Stages</Link><br />
                <Link href="/galerie.html" style={{ color: '#fff0d3' }}>Galerie</Link><br />
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px', color: '#fff0d3' }}>
            <p>&copy; 2025 Cours Fébus - Tous droits réservés</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
