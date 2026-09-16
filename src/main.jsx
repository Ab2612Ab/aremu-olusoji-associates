import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Menu, Search, X } from 'lucide-react';
import './styles.css';

const company = {
  name: 'Aremu Olusoji & Associates',
  tagline: 'Your Vision. Our Priority.',
  phone: '07031280458',
  phone2: '08023209689',
  whatsapp: '2347031280458',
  email: 'olusoji.aremu1@gmail.com',
  office: 'Gbemishola House, opposite Omole Social Club, Lagos, Nigeria',
  facebook: 'https://web.facebook.com/oiusoji.aremu1'
};

const properties = [
  { slug: 'the-meridian-residence', title: 'The Meridian Residence', status: 'FOR SALE', category: 'Residential', location: 'Ikoyi, Lagos', price: '₦485M', beds: 4, baths: 5, size: '—', description: 'A premium residential opportunity presented as a replaceable demo listing for the site experience.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=88', features: ['Private residence', 'Premium finishes', 'Secure environment', 'Replaceable demo listing'] },
  { slug: 'palm-court-apartments', title: 'Palm Court Apartments', status: 'FOR RENT', category: 'Residential', location: 'Lekki Phase 1, Lagos', price: '₦18M / yr', beds: 3, baths: 4, size: '—', description: 'A refined rental property concept used to demonstrate the rental discovery and enquiry journey.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=88', features: ['3-bedroom layout', 'Contemporary interiors', 'Residential setting', 'Replaceable demo listing'] },
  { slug: 'cedar-crest-land', title: 'Cedar Crest Land', status: 'LAND', category: 'Land', location: 'Ajah, Lagos', price: '₦95M', beds: null, baths: null, size: 'Development land', description: 'A demo land listing structured for future verified land inventory.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=88', features: ['Development land', 'Ajah location', 'Acquisition enquiry', 'Replaceable demo listing'] },
  { slug: 'eko-atlantic-view', title: 'Eko Atlantic View', status: 'FEATURED', category: 'Commercial', location: 'Eko Atlantic, Lagos', price: '₦1.2B', beds: 5, baths: 6, size: '—', description: 'A commercial property concept used to demonstrate premium listing presentation.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=88', features: ['Commercial opportunity', 'Prime Lagos location', 'Investor enquiry', 'Replaceable demo listing'] }
];

const services = [
  ['Property Sales', 'Acquire property with a structured process from discovery through transaction.'],
  ['Property Letting & Rentals', 'Find and secure suitable rental opportunities for residential and commercial needs.'],
  ['Land Sales', 'Explore land opportunities for ownership, development and long-term planning.'],
  ['Property Management', 'Professional oversight for owners who want their property and tenancy details managed.'],
  ['Real Estate Development', 'Support development opportunities from concept and acquisition through execution.'],
  ['Property Investment', 'Explore property opportunities with clear, practical guidance around the asset.'],
  ['Valuation', 'Property valuation support for informed ownership, transaction and planning decisions.'],
  ['Real Estate Consultancy', 'Independent property guidance tailored to a client’s objectives and situation.'],
  ['Facility Management', 'Structured care and operational oversight for property facilities and environments.']
];

const locations = {
  Lagos: ['Ikoyi', 'Victoria Island', 'Lekki', 'Lekki Phase 1', 'Banana Island', 'Ikeja', 'Ajah', 'Eko Atlantic', 'Oniru', 'Omole'],
  Abuja: ['Maitama', 'Asokoro', 'Wuse', 'Gwarinpa', 'Guzape']
};

const locationImages = [
  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=85'
];

const insights = [
  { slug: 'property-acquisition-in-lagos', category: 'REAL ESTATE', title: 'What to consider before acquiring property in Lagos', image: locationImages[0], text: 'A practical framework for thinking through location, property information, due diligence and professional guidance.' },
  { slug: 'building-a-property-portfolio', category: 'INVESTMENT', title: 'Building a property portfolio with a long-term view', image: locationImages[1], text: 'A straightforward look at how investors can think about property as part of a broader long-term plan.' },
  { slug: 'professional-property-management-guide', category: 'GUIDE', title: 'A practical guide to professional property management', image: locationImages[2], text: 'Key areas owners can consider when deciding how their property should be managed.' }
];

function go(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function LogoTreatment() {
  return <div className="brand-wordmark" aria-label={company.name}><span>AREMU OLUSOJI</span><small>&amp; ASSOCIATES</small></div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [['Properties', '/properties'], ['Services', '/services'], ['Locations', '/locations'], ['About', '/about'], ['Insights', '/insights']];
  return <header className="nav">
    <button className="brand" onClick={() => go('/')}><LogoTreatment /></button>
    <nav className={open ? 'nav-links open' : 'nav-links'}>
      {nav.map(([label, path]) => <button key={path} onClick={() => { setOpen(false); go(path); }}>{label}</button>)}
      <button className="nav-cta" onClick={() => { setOpen(false); go('/contact'); }}>Speak with an advisor <ArrowUpRight size={15} /></button>
    </nav>
    <button className="mobile-menu" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
  </header>;
}

function Footer() {
  return <footer>
    <div className="footer-brand"><LogoTreatment /><p>{company.tagline}</p></div>
    <div><span>CONTACT</span><a href={`tel:${company.phone}`}>0703 128 0458</a><a href={`mailto:${company.email}`}>{company.email}</a></div>
    <div><span>CONNECT</span><a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a><a href={company.facebook} target="_blank" rel="noreferrer">Facebook</a></div>
    <div><span>NAVIGATE</span><button onClick={() => go('/properties')}>Properties</button><button onClick={() => go('/services')}>Services</button><button onClick={() => go('/contact')}>Contact</button></div>
    <div className="copyright">© {new Date().getFullYear()} {company.name}. All rights reserved.</div>
  </footer>;
}

function Page({ children, dark = false }) {
  return <div className={`site-shell ${dark ? 'dark-page' : ''}`}><Header />{children}<Footer /></div>;
}

function BrandHero({ eyebrow, title, emphasis, copy, image = locationImages[0] }) {
  return <section className="page-hero" style={{ '--page-image': `url(${image})` }}>
    <div className="page-hero-logo" aria-hidden="true"><div className="star-mark"><span>AO</span></div></div>
    <div className="page-hero-content"><p className="eyebrow">{eyebrow}</p><h1>{title}<br /><em>{emphasis}</em></h1>{copy && <p>{copy}</p>}</div>
  </section>;
}

function Home() {
  return <Page dark>
    <main>
      <section className="hero">
        <div className="hero-media" />
        <div className="hero-brand-background" aria-hidden="true"><div className="star-mark large"><span>AO</span></div><div className="hero-brand-text">AREMU OLUSOJI<br /><small>&amp; ASSOCIATES</small></div></div>
        <div className="hero-grain" />
        <div className="hero-copy reveal"><p className="eyebrow">Aremu Olusoji &amp; Associates · Lagos · Nigeria</p><h1>Property,<br /><em>elevated.</em></h1><p className="hero-sub">Exceptional homes. Strategic investments. Professional real-estate solutions.</p><div className="hero-actions"><button className="gold-btn" onClick={() => go('/properties')}>Explore properties <ArrowUpRight size={17} /></button><button className="text-btn" onClick={() => go('/contact')}>Speak with an advisor <span>↗</span></button></div></div>
        <div className="hero-footer"><span>{company.tagline.toUpperCase()}</span><span>Scroll to discover ↓</span></div>
      </section>
      <section className="search-panel"><div className="search-intro"><span>01</span><h2>Find your next<br /><em>address.</em></h2></div><div className="search-fields">{['Purpose', 'Location', 'Property type', 'Price range'].map((label, i) => <button className="field" key={label} onClick={() => go('/properties')}><small>{label}</small><strong>{['Buy / Rent', 'Lagos, Nigeria', 'Any property', 'Any budget'][i]}</strong><ChevronDown size={16} /></button>)}<button className="search-submit" onClick={() => go('/properties')}><Search size={19} /><span>Search</span></button></div></section>
      <PropertyPreview />
      <section className="statement"><div className="statement-number">02</div><p className="eyebrow">Our approach</p><h2>More than property.<br /><em>Peace of mind.</em></h2><p className="statement-copy">We combine local market understanding, careful property selection and professional guidance to make every real-estate decision clearer — from first enquiry to long-term ownership.</p><div className="principles">{['Professional guidance', 'Curated opportunities', 'End-to-end service', 'Client-centred approach'].map((x, i) => <div key={x}><span>0{i + 1}</span><strong>{x}</strong></div>)}</div></section>
      <section className="section services-preview"><div className="section-head"><div><p className="eyebrow dark">What we do</p><h2>One partner.<br /><em>Every property need.</em></h2></div><button className="outline-btn" onClick={() => go('/services')}>View all services <ArrowUpRight size={16} /></button></div><div className="service-list">{services.slice(0, 6).map(([service], i) => <button key={service} onClick={() => go('/services')}><span>0{i + 1}</span><strong>{service}</strong><ArrowUpRight size={20} /></button>)}</div></section>
      <LocationsPreview />
      <section className="split-feature"><div className="split-image"/><div className="split-copy"><p className="eyebrow dark">About Aremu Olusoji &amp; Associates</p><h2>A more thoughtful approach to <em>real estate.</em></h2><p>Aremu Olusoji &amp; Associates is a full-service real estate firm dedicated to connecting individuals, families, businesses and investors with exceptional property opportunities across Nigeria.</p><p>From premium residential properties and strategically located land to property management, development, valuation and investment advisory, we provide a comprehensive approach to real estate.</p><button className="outline-btn" onClick={() => go('/about')}>Discover our approach <ArrowUpRight size={16} /></button></div></section>
      <section className="investment"><div><p className="eyebrow">For investors &amp; developers</p><h2>Build beyond <em>today.</em></h2><p>Explore acquisition, development and investment opportunities with a partner focused on the details behind the asset.</p><button className="gold-btn" onClick={() => go('/contact')}>Discuss an opportunity <ArrowUpRight size={17} /></button></div><div className="investment-orbit"><span>PROPERTY</span><strong>VALUE</strong><small>LONG-TERM</small></div></section>
      <InsightsPreview />
      <ContactCta />
    </main>
  </Page>;
}

function PropertyPreview() {
  return <section className="section properties"><div className="section-head"><div><p className="eyebrow dark">Curated opportunities</p><h2>Featured <em>properties.</em></h2></div><button className="outline-btn" onClick={() => go('/properties')}>View all properties <ArrowUpRight size={16} /></button></div><div className="property-grid">{properties.map((p, i) => <PropertyCard key={p.slug} p={p} index={i} />)}</div></section>;
}

function PropertyCard({ p, index = 0 }) {
  return <article className="property-card" onClick={() => go(`/properties/${p.slug}`)}><div className="property-image"><img src={p.image} alt="" loading={index > 1 ? 'lazy' : 'eager'} /><span>{p.status}</span><button aria-label={`View ${p.title}`}><ArrowUpRight size={17} /></button></div><div className="property-meta"><div><h3>{p.title}</h3><p>{p.location}</p></div><strong>{p.price}</strong></div><div className="property-stats">{p.beds ? <><span>{p.beds} beds</span><i /><span>{p.baths} baths</span><i /></> : <><span>{p.size}</span><i /></>}<span>{p.category}</span></div></article>;
}

function PropertiesPage() {
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(() => filter === 'All' ? properties : properties.filter(p => p.category === filter), [filter]);
  return <Page><main><BrandHero eyebrow="Property collection" title="Find the right" emphasis="place." copy="Explore the current property experience across residential, land and commercial opportunities." image={properties[0].image} /><section className="section listing-page"><div className="listing-toolbar"><div><p className="eyebrow dark">Available categories</p><h2>Curated <em>opportunities.</em></h2></div><div className="filters">{['All', 'Residential', 'Land', 'Commercial'].map(f => <button className={filter === f ? 'active' : ''} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div></div><div className="property-grid">{filtered.map((p, i) => <PropertyCard key={p.slug} p={p} index={i} />)}</div><div className="demo-note"><strong>Demo inventory:</strong> These property cards are structured as replaceable demo content until verified live listings are supplied.</div></section></main></Page>;
}

function PropertyDetail({ slug }) {
  const p = properties.find(x => x.slug === slug) || properties[0];
  return <Page><main><section className="detail-hero"><img src={p.image} alt="" /><div className="detail-overlay"><button className="back-link" onClick={() => go('/properties')}><ArrowLeft size={16} /> Back to properties</button><p className="eyebrow">{p.status} · {p.category}</p><h1>{p.title}</h1><p>{p.location}</p></div></section><section className="detail-body"><div><p className="eyebrow dark">Property overview</p><h2>{p.price}</h2><p className="detail-description">{p.description}</p><div className="spec-grid">{p.beds && <div><span>Bedrooms</span><strong>{p.beds}</strong></div>}{p.baths && <div><span>Bathrooms</span><strong>{p.baths}</strong></div>}<div><span>Property type</span><strong>{p.category}</strong></div><div><span>Location</span><strong>{p.location}</strong></div></div><h3>Features</h3><ul className="feature-list">{p.features.map(f => <li key={f}><Check size={16} />{f}</li>)}</ul></div><aside className="enquiry-card"><p className="eyebrow dark">Private enquiry</p><h3>Interested in this property?</h3><p>Contact the team for verified availability, full details or to arrange a viewing.</p><a className="gold-btn" href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hello ${company.name}, I am interested in ${p.title} in ${p.location}. Please share availability and details.`)}`} target="_blank" rel="noreferrer">WhatsApp enquiry <ArrowUpRight size={17} /></a><button className="outline-btn" onClick={() => go('/schedule-viewing')}>Schedule a viewing <ArrowUpRight size={16} /></button></aside></section></main></Page>;
}

function ServicesPage() {
  return <Page><main><BrandHero eyebrow="Our services" title="Every property" emphasis="need." copy="A full-service approach covering acquisition, leasing, management, development, valuation and advisory." image={locationImages[1]} /><section className="section services-page"><div className="service-detail-grid">{services.map(([name, desc], i) => <article key={name}><span>0{i + 1}</span><h2>{name}</h2><p>{desc}</p><button onClick={() => go('/contact')}>Discuss this service <ArrowUpRight size={17} /></button></article>)}</div></section><ContactCta /></main></Page>;
}

function LocationsPage() {
  const all = Object.entries(locations).flatMap(([city, areas]) => areas.map(area => ({ city, area })));
  return <Page><main><BrandHero eyebrow="Explore by location" title="Places with" emphasis="possibility." copy="Explore areas across Lagos and Abuja, with architecture ready to expand to additional Nigerian cities." image={locationImages[2]} /><section className="section locations-page"><div className="location-directory">{all.map((item, i) => <button key={`${item.city}-${item.area}`} onClick={() => go(`/locations/${item.area.toLowerCase().replace(/ /g, '-')}`)}><span>{String(i + 1).padStart(2, '0')}</span><strong>{item.area}</strong><small>{item.city}, Nigeria</small><ArrowUpRight size={18} /></button>)}</div></section></main></Page>;
}

function LocationsPreview() {
  const [index, setIndex] = useState(0);
  const all = Object.entries(locations).flatMap(([city, areas]) => areas.map(area => ({ city, area })));
  return <section className="locations section"><div className="section-head"><div><p className="eyebrow dark">Explore by location</p><h2>Places with<br /><em>possibility.</em></h2></div><div className="carousel-controls"><button onClick={() => setIndex(Math.max(0, index - 1))}><ChevronLeft /></button><button onClick={() => setIndex(Math.min(all.length - 4, index + 1))}><ChevronRight /></button></div></div><div className="location-track" style={{ transform: `translateX(-${index * 25}%)` }}>{all.map((loc, i) => <button className="location-card" key={loc.area} onClick={() => go(`/locations/${loc.area.toLowerCase().replace(/ /g, '-')}`)}><div style={{ backgroundImage: `url(${locationImages[i % locationImages.length]})` }} /><span>{String(i + 1).padStart(2, '0')}</span><h3>{loc.area}</h3><p>{loc.city}, Nigeria</p></button>)}</div></section>;
}

function LocationDetail({ slug }) {
  const all = Object.entries(locations).flatMap(([city, areas]) => areas.map(area => ({ city, area, slug: area.toLowerCase().replace(/ /g, '-') })));
  const loc = all.find(x => x.slug === slug) || all[0];
  return <Page><main><BrandHero eyebrow={`${loc.city} · Nigeria`} title={loc.area} emphasis="property." copy={`Explore property opportunities and professional real-estate support in ${loc.area}.`} image={locationImages[all.indexOf(loc) % locationImages.length]} /><section className="section location-detail"><div><p className="eyebrow dark">Local focus</p><h2>Real estate in <em>{loc.area}.</em></h2><p>Use this location page as the dedicated destination for verified properties, market information and local enquiries as inventory is added.</p></div><div className="location-actions"><button className="gold-btn" onClick={() => go('/properties')}>Explore properties <ArrowUpRight size={17} /></button><button className="outline-btn" onClick={() => go('/contact')}>Speak with an advisor <ArrowUpRight size={16} /></button></div></section></main></Page>;
}

function AboutPage() {
  return <Page><main><BrandHero eyebrow="About the firm" title="A more thoughtful" emphasis="approach." copy="Professional real-estate guidance built around clarity, property knowledge and the client's objectives." image={locationImages[3]} /><section className="section about-copy"><div className="about-lead"><p className="eyebrow dark">Who we are</p><h2>Property decisions deserve <em>attention.</em></h2></div><div><p>Aremu Olusoji &amp; Associates is a full-service real estate firm dedicated to connecting individuals, families, businesses and investors with exceptional property opportunities across Nigeria.</p><p>From premium residential properties and strategically located land to property management, development, valuation and investment advisory, we provide a comprehensive approach to real estate.</p><p>Our philosophy is simple: understand what our clients want, identify the right opportunity and guide them through the process with professionalism, clarity and attention to detail.</p></div></section><section className="values-band"><div><span>01</span><h3>Professional guidance</h3><p>Clear communication and practical support through the property journey.</p></div><div><span>02</span><h3>Curated opportunities</h3><p>A structured presentation for property opportunities as verified inventory becomes available.</p></div><div><span>03</span><h3>Client-centred approach</h3><p>Solutions designed around the objectives and circumstances of each client.</p></div></section><section className="placeholder-section"><p className="eyebrow dark">Our team</p><h2>People behind the <em>service.</em></h2><p>Team profiles can be added here when verified names, roles, biographies and photographs are provided.</p></section></main></Page>;
}

function InsightsPage() {
  return <Page><main><BrandHero eyebrow="Insights" title="Ideas worth" emphasis="knowing." copy="Practical property perspectives designed to help clients ask better questions and make more informed decisions." image={locationImages[0]} /><section className="section insight-list-page"><div className="insight-grid">{insights.map(item => <InsightCard key={item.slug} item={item} />)}</div></section></main></Page>;
}

function InsightCard({ item }) {
  return <article className="insight-card"><div className="insight-image" style={{ backgroundImage: `url(${item.image})` }} /><p>{item.category}</p><h3>{item.title}</h3><span>{item.text}</span><button onClick={() => go(`/insights/${item.slug}`)}>Read insight <ArrowUpRight size={16} /></button></article>;
}

function InsightsPreview() {
  return <section className="insights section"><div className="section-head"><div><p className="eyebrow dark">Insights</p><h2>Ideas worth<br /><em>knowing.</em></h2></div><button className="outline-btn" onClick={() => go('/insights')}>Explore insights <ArrowUpRight size={16} /></button></div><div className="insight-grid">{insights.map(item => <InsightCard key={item.slug} item={item} />)}</div></section>;
}

function ArticlePage({ slug }) {
  const item = insights.find(x => x.slug === slug) || insights[0];
  return <Page><main><section className="article-hero" style={{ '--article-image': `url(${item.image})` }}><div><button className="back-link" onClick={() => go('/insights')}><ArrowLeft size={16} /> Back to insights</button><p className="eyebrow">{item.category}</p><h1>{item.title}</h1></div></section><article className="article-body"><p className="article-intro">{item.text}</p><h2>Start with the right questions.</h2><p>Every property decision has a different context. Before committing to a purchase, rental, land acquisition or investment, clients can benefit from understanding the property itself, the surrounding location, the available documentation and the professional support required to complete the process.</p><h2>Clarity before commitment.</h2><p>This page is intentionally structured as an editorial destination. Verified market data, original articles and company-approved insights can be added here without changing the wider site architecture.</p><button className="gold-btn" onClick={() => go('/contact')}>Speak with an advisor <ArrowUpRight size={17} /></button></article></main></Page>;
}

function ContactCta() {
  return <section className="contact-cta"><div><p className="eyebrow">Let's start the conversation</p><h2>Your next property decision starts <em>here.</em></h2><p>Tell us what you are looking for and our team will help you identify the right next step.</p></div><button className="gold-btn" onClick={() => go('/contact')}>Contact the team <ArrowUpRight size={17} /></button></section>;
}

function ContactPage() {
  return <Page dark><main><BrandHero eyebrow="Contact" title="Let's start the" emphasis="conversation." copy="Tell us what you are looking for and the team can guide you to the right next step." image={properties[3].image} /><section className="contact standalone-contact"><div className="contact-copy"><p className="eyebrow">Direct contact</p><h2>Property guidance, <em>when you need it.</em></h2><div className="contact-details"><a href={`tel:${company.phone}`}>0703 128 0458</a><a href={`tel:${company.phone2}`}>0802 320 9689</a><a href={`mailto:${company.email}`}>{company.email}</a><span>{company.office}</span></div></div><EnquiryForm /></section></main></Page>;
}

function EnquiryForm() {
  const submit = e => { e.preventDefault(); alert('Thank you. Your enquiry has been prepared for the Aremu Olusoji & Associates team.'); };
  return <form className="contact-form" onSubmit={submit}><label>Full name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Phone number<input placeholder="0703..." /></label><label>How can we help?<textarea rows="5" placeholder="Tell us what you are looking for..." /></label><button className="gold-btn" type="submit">Send enquiry <ArrowUpRight size={17} /></button></form>;
}

function SchedulePage() {
  return <Page><main><BrandHero eyebrow="Private viewing" title="Arrange a" emphasis="viewing." copy="Share your preferred property and contact details. The team can follow up to coordinate the next step." image={properties[0].image} /><section className="section schedule-layout"><div><p className="eyebrow dark">Viewing request</p><h2>Tell us when you'd like to <em>visit.</em></h2><p>Use this form as the dedicated scheduling destination. Calendar integration can be connected when the firm's preferred booking workflow is supplied.</p></div><form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Your viewing request has been prepared. The team can follow up to confirm the appointment.'); }}><label>Full name<input required placeholder="Your name" /></label><label>Phone number<input required placeholder="0703..." /></label><label>Property or area<input placeholder="Property name / location" /></label><label>Preferred date<input type="date" /></label><label>Preferred time<input type="time" /></label><label>Notes<textarea rows="4" placeholder="Anything we should know?" /></label><button className="gold-btn" type="submit">Request viewing <ArrowUpRight size={17} /></button></form></section></main></Page>;
}

function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, '') || '/');
  useEffect(() => { const onPop = () => setPath(window.location.pathname.replace(/\/$/, '') || '/'); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const parts = path.split('/').filter(Boolean);
  if (path === '/') return <Home />;
  if (path === '/properties') return <PropertiesPage />;
  if (parts[0] === 'properties' && parts[1]) return <PropertyDetail slug={parts[1]} />;
  if (path === '/services') return <ServicesPage />;
  if (path === '/locations') return <LocationsPage />;
  if (parts[0] === 'locations' && parts[1]) return <LocationDetail slug={parts[1]} />;
  if (path === '/about') return <AboutPage />;
  if (path === '/insights') return <InsightsPage />;
  if (parts[0] === 'insights' && parts[1]) return <ArticlePage slug={parts[1]} />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/schedule-viewing') return <SchedulePage />;
  return <Page><main><BrandHero eyebrow="Page not found" title="Let's find the" emphasis="right place." copy="The page you requested does not exist. Use the navigation to continue exploring." /><section className="placeholder-section"><button className="gold-btn" onClick={() => go('/')}>Return home <ArrowUpRight size={17} /></button></section></main></Page>;
}

createRoot(document.getElementById('root')).render(<App />);
