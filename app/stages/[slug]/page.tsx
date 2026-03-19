import { createAdminClient } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface StagePageProps {
  params: Promise<{ slug: string }>;
}

async function getStage(slug: string) {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from('stages')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  return data;
}

export default async function StagePage({ params }: StagePageProps) {
  const { slug } = await params;
  const stage = await getStage(slug);
  
  if (!stage) {
    notFound();
  }
  
  // Format dates for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Get all active stages for the navigation
  const supabase = createAdminClient();
  const { data: allStages } = await supabase
    .from('stages')
    .select('slug, title')
    .eq('is_active', true)
    .order('order_index', { ascending: true });
  
  const stages = allStages || [];

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
                    {stages.map(s => (
                      <Link key={s.slug} href={`/stages/${s.slug}`} className="navbar14_dropdown-link-2 w-dropdown-link">
                        {s.title}
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
        {/* Blog Post Header */}
        <header className="blog-post-header3_component">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-blogpost">
                <div className="blog-post-header3_content">
                  <div className="margin-bottom margin-xsmall">
                    <Link href="/stages" className="text-size-regular text-color-2">← Retour aux stages</Link>
                  </div>
                  <h1 className="heading-style-h2">{stage.title}</h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stage Content */}
        <section className="section_layout361 color-scheme-1">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-medium">
                <div className="w-layout-grid layout361_grid">
                  <div className="layout361_content">
                    <div className="margin-bottom margin-medium">
                      <p className="text-size-medium text-color-2">
                        {stage.description}
                      </p>
                    </div>
                    
                    {stage.dates && stage.dates.length > 0 && (
                      <div className="margin-bottom margin-large">
                        <div className="margin-bottom margin-small">
                          <h2 className="heading-style-h3">Dates des sessions</h2>
                        </div>
                        <div className="w-layout-grid layout361_dates-list" style={{ gap: '16px' }}>
                          {stage.dates.map((session: any, index: number) => (
                            <div 
                              key={index}
                              className="layout361_date-card"
                              style={{ 
                                padding: '24px', 
                                background: '#f5f5f5', 
                                borderRadius: '8px'
                              }}
                            >
                              <div className="margin-bottom margin-xsmall">
                                <h3 className="heading-style-h5">{session.session}</h3>
                              </div>
                              <p className="text-size-regular text-color-3">
                                Du {formatDate(session.start)} au {formatDate(session.end)}
                              </p>
                              <p className="text-size-regular text-color-3">
                                <strong>{stage.max_students} places</strong> disponibles
                              </p>
                              <div className="margin-top margin-small">
                                <a href="#contact" className="button w-button">Réserver</a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="margin-top margin-large" id="contact">
                      <div className="margin-bottom margin-small">
                        <h2 className="heading-style-h3">Réserver ce stage</h2>
                      </div>
                      <p className="text-size-regular text-color-2">
                        Pour vous inscrire ou poser vos questions sur ce stage, remplissez le formulaire ci-dessous.
                      </p>
                      <div className="margin-top margin-medium">
                        <form 
                          method="POST" 
                          action="/api/contact" 
                          className="w-form"
                        >
                          <div className="w-layout-grid form_grid-2col">
                            <div className="form_field-wrapper">
                              <label htmlFor="prenom" className="form_label">Prénom</label>
                              <input 
                                type="text" 
                                name="prenom" 
                                placeholder="Votre prénom" 
                                required 
                                className="form_input w-input" 
                              />
                            </div>
                            <div className="form_field-wrapper">
                              <label htmlFor="nom" className="form_label">Nom</label>
                              <input 
                                type="text" 
                                name="nom" 
                                placeholder="Votre nom" 
                                required 
                                className="form_input w-input" 
                              />
                            </div>
                          </div>
                          <div className="form_field-wrapper">
                            <label htmlFor="email" className="form_label">Email</label>
                            <input 
                              type="email" 
                              name="email" 
                              placeholder="votre@email.com" 
                              required 
                              className="form_input w-input" 
                            />
                          </div>
                          <div className="form_field-wrapper">
                            <label htmlFor="stage" className="form_label">Stage</label>
                            <select 
                              name="stage" 
                              required 
                              className="form_input w-select"
                              defaultValue={stage.title}
                            >
                              <option value={stage.title}>{stage.title}</option>
                            </select>
                          </div>
                          <div className="form_field-wrapper">
                            <label htmlFor="message" className="form_label">Message</label>
                            <textarea 
                              name="message" 
                              placeholder="Votre message ou questions..." 
                              rows={4} 
                              required 
                              className="form_input w-input"
                            ></textarea>
                          </div>
                          <button 
                            type="submit" 
                            className="button w-button"
                            style={{ width: '100%' }}
                          >
                            Envoyer ma demande
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="layout361_image-wrapper">
                    <img 
                      src="/images/stage-peinture-à-lhuile2x_1.avif" 
                      width={616} 
                      alt={stage.title}
                      className="layout361_image img-cut-right-small img-shadow" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section_contact19 color-scheme-3">
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
