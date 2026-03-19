import { createAdminClient } from '@/lib/supabase';
import Link from 'next/link';

async function getStages() {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from('stages')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });
  
  if (error) {
    console.error('Error fetching stages:', error);
    return [];
  }
  
  return data || [];
}

export default async function StagesPage() {
  const stages = await getStages();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  };

  const getNextSession = (dates: any[]) => {
    if (!dates || dates.length === 0) return null;
    const today = new Date();
    const upcoming = dates
      .filter(d => new Date(d.start) >= today)
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    return upcoming[0] || dates[0];
  };

  return (
    <div className="page-wrapper">
      {/* Navigation */}
      <nav className="navbar14_component w-nav">
        <div className="navbar14_container">
          <Link href="/" className="navbar14_logo-link w-nav-brand">
            <img src="/images/relume-106888.png" width={134} alt="Cours Fébus" className="navbar14_logo" />
          </Link>
          <nav className="navbar14_menu w-nav-menu" role="navigation">
            <div className="navbar14_menu-link-wrapper">
              <div className="navbar14_menu-links">
                <Link href="/" className="navbar14_link w-nav-link">Accueil</Link>
                <div className="navbar14_menu-dropdown w-dropdown">
                  <div className="navbar14_dropdown-toggle w-dropdown-toggle">
                    <Link href="/stages" className="text-size-regular">Stages</Link>
                  </div>
                  <nav className="navbar14_dropdown-list-2 w-dropdown-list">
                    {stages.map(stage => (
                      <Link key={stage.id} href={`/stages/${stage.slug}`} className="navbar14_dropdown-link-2 w-dropdown-link">
                        {stage.title}
                      </Link>
                    ))}
                  </nav>
                </div>
                <Link href="/galerie.html" className="navbar14_link w-nav-link">Galerie</Link>
              </div>
              <div className="navbar14_button-wrapper">
                <Link href="/#contact" className="button-2 is-small trigger-contact w-button">Nous contacter</Link>
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
                          Nos <span className="text-weight-bold">Stages</span>
                        </h1>
                      </div>
                      <p className="text-size-medium text-color-2">
                        Perfectionnez vos compétences artistiques lors de nos stages intensifs. 
                        Encadrement personnalisé en petits groupes pour tous niveaux.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stages Grid */}
        <section className="section_layout236 color-scheme-2">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-bottom padding-xlarge">
                <div className="layout236_component">
                  <div className="w-layout-grid layout236_list">
                    {stages.map(stage => {
                      const nextSession = getNextSession(stage.dates);
                      return (
                        <div key={stage.id} className="layout236_item">
                          <div className="layout236_item_content">
                            <div className="margin-bottom margin-xxsmall">
                              <h2 className="heading-style-h4">{stage.title}</h2>
                            </div>
                            {nextSession && (
                              <div className="margin-bottom margin-xxsmall">
                                <p className="text-size-regular text-color-3">
                                  <strong>Prochaine session: </strong>
                                  {nextSession.session} - {formatDate(nextSession.start)} au {formatDate(nextSession.end)}
                                </p>
                              </div>
                            )}
                            <p className="text-size-regular text-color-3">
                              {stage.description}
                            </p>
                            <div className="margin-top margin-xsmall">
                              <div className="button-group">
                                <Link href={`/stages/${stage.slug}`} className="button is-secondary is-small w-inline-block">
                                  <div>Voir les détails</div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {stages.length === 0 && (
                      <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                        <p>Aucun stage disponible pour le moment.</p>
                      </div>
                    )}
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
                  </div>
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
