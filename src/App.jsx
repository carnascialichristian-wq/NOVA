import { useEffect, useRef, useState } from 'react'

const heroAsset = '/assets/nova-hero-art-hi.webp'
const aboutAsset = '/assets/nova-about-sculpture.webp'

const navItems = [
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'work', label: 'Selected work' },
  { id: 'about', label: 'About' },
  { id: 'insights', label: 'Insights' },
  { id: 'contact', label: 'Contact' },
]

const capabilities = [
  { title: 'Product Strategy', text: 'Align vision with opportunity and create a roadmap for success.', icon: 'target', tone: 'blue' },
  { title: 'Experience Design', text: 'Craft intuitive, beautiful experiences users love.', icon: 'spark', tone: 'lime' },
  { title: 'Product Engineering', text: 'Build scalable, secure products with clean, modern code.', icon: 'code', tone: 'blue' },
  { title: 'Growth & Optimization', text: 'Ship, learn, and iterate to continuously drive outcomes.', icon: 'bars', tone: 'lime' },
]

const projects = [
  { client: 'Finova', title: 'Modern banking\nfor the next era.', text: 'A mobile banking experience that helps people manage money with confidence.', accent: 'blue' },
  { client: 'Orbit', title: 'A calmer way\nto move forward.', text: 'A planning platform that turns complex work into a clear shared direction.', accent: 'lime' },
  { client: 'Materia', title: 'Tools for a\nmore tactile web.', text: 'A new digital canvas for teams who want their best ideas to feel tangible.', accent: 'blue' },
]

const principles = [
  { title: 'Clarity in complexity', text: 'We simplify the complex to build products people truly understand.', icon: 'target', tone: 'blue' },
  { title: 'Partner, not vendor', text: 'We embed with your team, share ownership, and move as one.', icon: 'people', tone: 'lime' },
  { title: 'Craft that scales', text: 'We engineer clean, future-proof systems that grow with you.', icon: 'code', tone: 'dark' },
]

const articles = [
  { number: '01', category: 'Product strategy', title: 'Aligning strategy and design for measurable impact', date: 'May 12, 2024', tone: 'blue' },
  { number: '02', category: 'Design systems', title: 'Building design systems that scale with your product', date: 'Apr 28, 2024', tone: 'lime' },
  { number: '03', category: 'Engineering', title: 'Clean code, better outcomes: our engineering approach', date: 'Apr 10, 2024', tone: 'light' },
]

function Arrow({ direction = 'right' }) {
  return (
    <svg aria-hidden="true" className={`icon-arrow icon-arrow-${direction}`} viewBox="0 0 20 20" fill="none">
      <path d="M3 10h13M10.5 4.5 16 10l-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Icon({ name }) {
  const paths = {
    target: <><circle cx="12" cy="12" r="7.25" /><circle cx="12" cy="12" r="2.5" /><path d="M12 2.75v2M12 19.25v-2M2.75 12h2M19.25 12h-2" /></>,
    spark: <><path d="m12 3 1.85 5.15L19 10l-5.15 1.85L12 17l-1.85-5.15L5 10l5.15-1.85L12 3Z" /><path d="m18 3 .55 1.45L20 5l-1.45.55L18 7l-.55-1.45L16 5l1.45-.55L18 3Z" /></>,
    code: <><path d="m8 7-4 5 4 5M16 7l4 5-4 5M14 4l-4 16" /></>,
    bars: <><path d="M5 19V9M12 19V5M19 19v-7" /><path d="M3 19h18" /></>,
    people: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.45-3.2 2.15-5 5.5-5s5.05 1.8 5.5 5M16 5.5a2.5 2.5 0 0 1 0 5M16.5 14c2.25.25 3.45 1.7 4 4" /></>,
  }

  return <svg aria-hidden="true" className="card-icon" viewBox="0 0 24 24" fill="none">{paths[name]}</svg>
}

function Reveal({ children, className = '', delay = 0 }) {
  return <div className={`reveal ${className}`} style={{ '--delay': `${delay}ms` }}>{children}</div>
}

function Metric({ value, suffix, label }) {
  const [displayValue, setDisplayValue] = useState(0)
  const metricRef = useRef(null)

  useEffect(() => {
    const element = metricRef.current
    if (!element) return undefined

    let frameId
    let started = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return
      started = true
      const start = performance.now()
      const duration = 1000
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        setDisplayValue(Math.round(value * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) frameId = requestAnimationFrame(tick)
      }
      frameId = requestAnimationFrame(tick)
      observer.unobserve(element)
    }, { threshold: 0.6 })

    observer.observe(element)
    return () => {
      observer.disconnect()
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [value])

  return (
    <div ref={metricRef}>
      <strong>{displayValue}<span>{suffix}</span></strong>
      <small>{label}</small>
    </div>
  )
}

function ProductPreview({ project, index }) {
  return (
    <div className={`case-visual case-visual-${index}`}>
      <div className="case-glow" />
      <div className="phone-shell">
        <div className="phone-topbar">
          <span className="phone-time">9:41</span>
          <span className="phone-status"><i /><i /><i /></span>
        </div>
        <div className="phone-content">
          <div className="phone-greeting">Good morning, Mia</div>
          <div className="phone-total-label">Total balance</div>
          <div className="phone-total">$12,540.00</div>
          <div className="phone-actions">
            <span><b>＋</b> Send</span>
            <span><b>↓</b> Add money</span>
            <span><b>⌁</b> Cards</span>
          </div>
          <div className="phone-section-head"><span>Transactions</span><small>View all</small></div>
          <div className="transaction"><span className="transaction-icon orange">▣</span><span><strong>Corner House</strong><small>Today, 10:43</small></span><b>−$48.50</b></div>
          <div className="transaction"><span className="transaction-icon blue">▰</span><span><strong>Metrocard</strong><small>May 18</small></span><b>−$30.00</b></div>
          <div className="transaction"><span className="transaction-icon lime">◒</span><span><strong>Salary</strong><small>May 15</small></span><b className="positive">+$3,850.00</b></div>
        </div>
      </div>
      <div className="case-orbit case-orbit-blue" />
      <div className="case-orbit case-orbit-lime" />
      <div className="case-metal" />
      <div className="case-glass" />
      <div className="case-project-label">{project.client}</div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [contactOpen, setContactOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('top')
  const [isScrolled, setIsScrolled] = useState(false)
  const heroArtRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.14, rootMargin: '0px 0px -40px' },
    )
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))

    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.dataset.section)),
      { rootMargin: '-32% 0px -56%', threshold: 0 },
    )
    document.querySelectorAll('[data-section]').forEach((section) => sectionObserver.observe(section))

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
      setIsScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!contactOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => event.key === 'Escape' && setContactOpen(false)
    window.addEventListener('keydown', handleKeyDown)
    window.setTimeout(() => modalRef.current?.querySelector('input')?.focus(), 50)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [contactOpen])

  const currentProject = projects[activeProject]

  const openContact = () => {
    setSubmitted(false)
    setContactOpen(true)
  }

  const scrollTo = (event) => {
    setMenuOpen(false)
    const target = event.currentTarget.getAttribute('href')
    if (target?.startsWith('#')) {
      event.preventDefault()
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const moveProject = (direction) => {
    setActiveProject((current) => (current + direction + projects.length) % projects.length)
  }

  const handleHeroPointer = (event) => {
    if (!heroArtRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    heroArtRef.current.style.setProperty('--pointer-x', `${x.toFixed(3)}`)
    heroArtRef.current.style.setProperty('--pointer-y', `${y.toFixed(3)}`)
  }

  const resetHeroPointer = () => {
    heroArtRef.current?.style.setProperty('--pointer-x', '0')
    heroArtRef.current?.style.setProperty('--pointer-y', '0')
  }

  return (
    <div className="site-shell">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className={`site-header ${menuOpen ? 'menu-open' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <a className="brand" href="#top" onClick={scrollTo} aria-label="NOVA home">NOVA</a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}>
          <span /><span />
        </button>
        <nav className="main-nav" aria-label="Navigazione principale">
          {navItems.map((item) => <a key={item.id} className={activeSection === item.id ? 'active' : ''} href={`#${item.id}`} onClick={scrollTo}>{item.label}</a>)}
        </nav>
        <button className="button button-dark header-cta" type="button" onClick={openContact}>Start a project <Arrow /></button>
      </header>

      <main id="top">
        <section className="hero section-pad" data-section="top">
          <div className="container hero-grid">
            <div className="hero-copy">
              <Reveal className="eyebrow"><span className="eyebrow-dot" />Digital product studio</Reveal>
              <Reveal className="hero-heading-wrap" delay={80}><h1>Build what<br /><em>matters.</em></h1></Reveal>
              <Reveal delay={150}><p className="hero-lede">We partner with ambitious teams to design and build digital products that drive real impact.</p></Reveal>
              <Reveal className="hero-actions" delay={220}>
                <a className="button button-dark" href="#work" onClick={scrollTo}>Explore work <Arrow /></a>
                <a className="text-link" href="#capabilities" onClick={scrollTo}>Our capabilities <Arrow /></a>
              </Reveal>
              <Reveal className="trusted" delay={300}>
                <span className="trusted-label">Trusted by innovative companies</span>
                <div className="trusted-logos" aria-label="Client logos">
                  <span className="trust-symbol trust-flower">✣</span><span className="trust-symbol trust-diamond">◆</span><span className="trust-symbol trust-wave">≋</span><span className="trust-symbol trust-block">B</span><span className="trust-symbol trust-arch">Λ</span>
                </div>
              </Reveal>
            </div>
            <Reveal className="hero-art-wrap" delay={180}>
              <div className="hero-art-backdrop" />
              <div className="hero-art-stage" onMouseMove={handleHeroPointer} onMouseLeave={resetHeroPointer}>
                <img ref={heroArtRef} className="hero-art" src={heroAsset} alt="Scultura astratta in vetro, metallo e blu elettrico" />
                <span className="hero-art-orb orb-one" /><span className="hero-art-orb orb-two" />
              </div>
            </Reveal>
          </div>
          <a className="hero-scroll-cue" href="#capabilities" onClick={scrollTo}><span>Scroll to explore</span><Arrow /></a>
        </section>

        <section className="capabilities dark-band" id="capabilities" data-section="capabilities">
          <div className="container section-pad capabilities-inner">
            <div className="section-heading-row">
              <Reveal><div className="eyebrow eyebrow-light"><span className="eyebrow-dot" />Capabilities</div><h2>End-to-end product<br /><em>creation.</em></h2></Reveal>
              <Reveal delay={100}><a className="button button-outline-light" href="#contact" onClick={scrollTo}>View all capabilities <Arrow /></a></Reveal>
            </div>
            <div className="capability-grid">
              {capabilities.map((capability, index) => <Reveal key={capability.title} className="capability-card" delay={index * 70}><div className={`capability-icon capability-icon-${capability.tone}`}><Icon name={capability.icon} /></div><h3>{capability.title}</h3><p>{capability.text}</p><a href="#contact" onClick={scrollTo} aria-label={`Scopri ${capability.title}`}><Arrow /></a></Reveal>)}
            </div>
          </div>
        </section>

        <section className="stats-wrap container" aria-label="NOVA in numeri">
          <Reveal className="stats-strip"><Metric value={100} suffix="+" label="Products launched" /><Metric value={95} suffix="%" label="Client satisfaction" /><Metric value={10} suffix="+" label="Industries served" /><Metric value={30} suffix="+" label="Awards received" /></Reveal>
        </section>

        <section className="work section-pad" id="work" data-section="work">
          <div className="container">
            <div className="section-heading-row work-heading-row">
              <Reveal><div className="eyebrow"><span className="eyebrow-dot" />Selected work</div><h2>Digital products<br />that make a <em>difference.</em></h2></Reveal>
              <Reveal delay={100}><a className="button button-outline-dark" href="#contact" onClick={scrollTo}>View all work <Arrow /></a></Reveal>
            </div>
            <Reveal className="case-study" delay={100}>
              <div className="case-copy"><div className="case-client"><span className={`client-mark client-mark-${currentProject.accent}`}>{currentProject.client === 'Finova' ? 'A' : currentProject.client[0]}</span>{currentProject.client}</div><h3>{currentProject.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h3><p>{currentProject.text}</p><a className="text-link" href="#contact" onClick={scrollTo}>View case study <Arrow /></a></div>
              <div key={currentProject.client} className="case-preview-enter"><ProductPreview project={currentProject} index={activeProject} /></div>
              <div className="case-controls"><div className="case-dots">{projects.map((project, index) => <button key={project.client} className={index === activeProject ? 'active' : ''} type="button" aria-label={`Mostra progetto ${project.client}`} onClick={() => setActiveProject(index)} />)}</div><div className="case-arrows"><button type="button" aria-label="Progetto precedente" onClick={() => moveProject(-1)}><Arrow direction="left" /></button><button type="button" aria-label="Progetto successivo" onClick={() => moveProject(1)}><Arrow /></button></div></div>
            </Reveal>
          </div>
        </section>

        <section className="about-section section-pad" id="about" data-section="about">
          <div className="container about-layout">
            <Reveal className="about-copy"><div className="eyebrow"><span className="eyebrow-dot" />About NOVA</div><h2>Independent by design.<br /><em>Curious by nature.</em></h2><p>NOVA is a digital product studio partnering with ambitious teams to design and build meaningful products. We combine strategy, design, and engineering to create work that’s thoughtful, scalable, and built to last.</p><a className="button button-dark" href="#contact" onClick={scrollTo}>Learn more about us <Arrow /></a></Reveal>
            <Reveal className="about-visual" delay={100}><div className="about-art-frame"><img src={aboutAsset} alt="Scultura astratta trasparente del mondo visivo NOVA" /><span className="about-art-stamp">N / 01</span></div><div className="principles-list">{principles.map((principle) => <div className="principle-row" key={principle.title}><div className={`principle-icon principle-icon-${principle.tone}`}><Icon name={principle.icon} /></div><div><h3>{principle.title}</h3><p>{principle.text}</p></div><Arrow /></div>)}</div></Reveal>
          </div>
        </section>

        <section className="insights-section dark-band section-pad" id="insights" data-section="insights">
          <div className="container">
            <div className="section-heading-row insights-heading-row"><Reveal><div className="eyebrow eyebrow-light"><span className="eyebrow-dot" />Insights</div><h2>Ideas, stories,<br /><em>and perspectives.</em></h2></Reveal><Reveal delay={100}><a className="button button-outline-light" href="#contact" onClick={scrollTo}>View all insights <Arrow /></a></Reveal></div>
            <div className="article-list">{articles.map((article, index) => <Reveal key={article.number} delay={index * 80}><a className="article-row" href="#contact" onClick={scrollTo}><span className={`article-number article-number-${article.tone}`}>{article.number}</span><span className="article-copy"><small>{article.category}</small><strong>{article.title}</strong><time>{article.date}</time></span><Arrow /></a></Reveal>)}</div>
          </div>
        </section>

        <section className="contact-band container" id="contact" data-section="contact"><Reveal className="contact-card"><div className="contact-glow" /><div className="contact-icon"><Arrow /></div><div><h2>Have a project in mind?</h2><p>Let’s build something great together.</p></div><button className="button button-light" type="button" onClick={openContact}>Get in touch <Arrow /></button></Reveal></section>
      </main>

      <footer className="site-footer section-pad"><div className="container footer-grid"><div className="footer-brand"><a className="brand" href="#top" onClick={scrollTo}>NOVA</a><p>A digital product studio shaping<br />the future through design<br />and technology.</p><small>© 2024 NOVA. All rights reserved.</small></div><div className="footer-column"><span>Company</span><a href="#about" onClick={scrollTo}>About</a><a href="#contact" onClick={scrollTo}>Careers</a><a href="#insights" onClick={scrollTo}>Insights</a><a href="#contact" onClick={scrollTo}>Contact</a></div><div className="footer-column"><span>Capabilities</span><a href="#capabilities" onClick={scrollTo}>Product Strategy</a><a href="#capabilities" onClick={scrollTo}>Experience Design</a><a href="#capabilities" onClick={scrollTo}>Product Engineering</a><a href="#capabilities" onClick={scrollTo}>Growth & Optimization</a></div><div className="footer-column"><span>Info</span><a href="#contact" onClick={scrollTo}>Privacy</a><a href="#contact" onClick={scrollTo}>Terms</a><a href="#contact" onClick={scrollTo}>Cookie Policy</a></div><div className="footer-column footer-social"><span>Follow us</span><div><a href="#contact" onClick={scrollTo} aria-label="Dribbble">◉</a><a href="#contact" onClick={scrollTo} aria-label="LinkedIn">in</a><a href="#contact" onClick={scrollTo} aria-label="X">𝕏</a></div></div></div></footer>

      {contactOpen && <div className="modal-backdrop" role="presentation" onClick={() => setContactOpen(false)}><div ref={modalRef} className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setContactOpen(false)} aria-label="Chiudi">×</button>{!submitted ? <><div className="eyebrow"><span className="eyebrow-dot" />Start a project</div><h2 id="contact-title">Let’s make<br /><em>something matter.</em></h2><p>Tell us a little about what you’re building. We’ll get back to you shortly.</p><form onSubmit={(event) => { event.preventDefault(); event.currentTarget.reset(); setSubmitted(true) }}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>What do you need?<select name="project" defaultValue=""><option value="" disabled>Select a focus</option><option>Product strategy</option><option>Experience design</option><option>Product engineering</option><option>Growth & optimization</option></select></label><label>Brief<textarea required name="brief" rows="3" placeholder="Tell us about your project" /></label><button className="button button-dark" type="submit">Send enquiry <Arrow /></button></form></> : <div className="form-success" role="status" aria-live="polite"><div className="success-mark">✓</div><h2 id="contact-title">Message<br /><em>received.</em></h2><p>Thanks for reaching out. This demo form is ready to connect to your preferred inbox or CRM.</p><button className="button button-dark" type="button" onClick={() => setContactOpen(false)}>Close <Arrow /></button></div>}</div></div>}
    </div>
  )
}

export default App
