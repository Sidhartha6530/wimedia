import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import heroArtwork from './assets/about-campaign-analytics.svg'
import storyArtwork from './assets/about-marketing-channels.svg'
import './App.css'

function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const match = value.match(/(\d+(?:\.\d+)?)/)
    if (!match) return

    const target = Number(match[0])
    const duration = 2200
    const startTime = performance.now()

    const tick = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const nextValue = target * eased
      setDisplayValue(nextValue)

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    const animationFrame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrame)
  }, [value])

  const numericString = Number.isInteger(Number(displayValue))
    ? Math.round(displayValue).toString()
    : displayValue.toFixed(1)

  return <strong>{numericString}{value.includes('x') ? 'x' : value.includes('+') ? '+' : ''}</strong>
}

const stats = [
  { value: '500+', label: 'Campaigns' },
  { value: '150+', label: 'Clients' },
  { value: '300+', label: 'Events' },
  { value: '2.5x', label: 'Avg growth', emphasis: true },
]

const services = [
  { icon: '✦', title: 'Digital Marketing', text: 'Precision-targeted campaigns that convert attention into measurable revenue.' },
  { icon: '◎', title: 'IT Services', text: 'Reliable technology support and digital solutions that keep your business running smoothly.' },
]

const getServiceSlug = (title) => title
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const servicePageContent = {
  'digital-marketing': {
    title: 'Digital Marketing',
    summary: 'Full-funnel marketing systems built to capture attention, build trust, and convert momentum into measurable revenue through strategic storytelling, audience targeting, and performance-driven execution.',
    items: [
      {
        title: 'Videos',
        description: 'High-converting video content designed for awareness, engagement, and conversion. From short-form reels to cinematic brand films, we create visuals that clarify your message, humanize your brand, and turn attention into action.',
      },
      {
        title: 'Influencer marketing',
        description: 'Creator-first campaigns that connect your brand with the right communities and voices. We identify authentic partnerships, shape campaign strategy, and drive reach, credibility, and qualified demand through trusted content creators.',
      },
    ],
  },
  'it-services': {
    title: 'IT Services',
    summary: 'Reliable digital infrastructure and technical execution that keeps your business efficient, secure, and ready to grow through smart systems, scalable platforms, and seamless user experiences.',
    items: [
      {
        title: 'Web Development',
        description: 'High-performance websites and digital experiences designed for clarity, speed, and conversion. We build responsive, brand-aligned platforms that help your business communicate clearly and operate with confidence online.',
      },
      {
        title: 'App Development',
        description: 'Custom mobile and web applications tailored to your business goals, workflows, and audience needs. From user experience design to robust feature delivery, we create experiences that are usable, scalable, and built for impact.',
      },
      {
        title: 'Cyber Security',
        description: 'Protection that goes beyond basic defense. We help businesses strengthen their security posture with practical strategies, resilient infrastructure, and safeguards that reduce risk while keeping operations smooth and dependable.',
      },
    ],
  },
}

const faqs = [
  {
    question: 'What is your typical project timeline?',
    answer: 'Most projects take between 3 and 8 weeks depending on scope, complexity, and delivery needs.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes, we collaborate with clients worldwide across strategy, design, and campaign execution.',
  },
  {
    question: 'What is your pricing structure?',
    answer: 'Pricing varies by scope and deliverables, but we tailor engagements to your business objectives.',
  },
  {
    question: 'Can we schedule an initial consultation?',
    answer: 'Absolutely. We offer a discovery conversation to understand your goals and recommend a direction.',
  },
]

const portfolioProjects = [
  {
    id: 'stay',
    category: 'Campaigns',
    sector: 'Travel & hospitality',
    title: 'A slower kind of escape',
    summary: 'A launch direction for a boutique stay, built around the feeling of getting away rather than a list of amenities.',
    challenge: 'Give a new destination a distinct point of view and a story people want to share.',
    approach: 'Pair a clear brand narrative with cinematic short-form content and a focused launch campaign.',
    deliverables: ['Campaign strategy', 'Brand storytelling', 'Social video'],
    artLabel: 'TAKE THE LONG WAY',
    artNote: 'A place to pause',
  },
  {
    id: 'good-things',
    category: 'Video',
    sector: 'Wellness & lifestyle',
    title: 'Good things, daily',
    summary: 'A content system for a modern wellness brand that makes everyday rituals feel worth returning to.',
    challenge: 'Translate a broad product range into a consistent, recognizable social presence.',
    approach: 'Create repeatable visual formats that balance product education with human stories.',
    deliverables: ['Creative direction', 'Short-form video', 'Content planning'],
    artLabel: 'A LITTLE MORE YOU',
    artNote: 'Make room for good',
  },
  {
    id: 'gathered',
    category: 'Campaigns',
    sector: 'Events & culture',
    title: 'Gathered in motion',
    summary: 'An event campaign concept designed to build anticipation before the doors open and keep the energy going after.',
    challenge: 'Make a one-day experience feel like a community people can belong to.',
    approach: 'Connect a strong event identity with creator moments, attendee stories, and a clear content journey.',
    deliverables: ['Event identity', 'Creator activation', 'Live content'],
    artLabel: 'MEET HERE',
    artNote: 'Good things happen together',
  },
  {
    id: 'form-and-field',
    category: 'Digital',
    sector: 'Digital experience',
    title: 'Made for what’s next',
    summary: 'A digital experience concept for a growing business ready to make its offer easier to understand and act on.',
    challenge: 'Turn a complex set of services into a clear, confident path for prospective customers.',
    approach: 'Reshape the information around customer needs, then build a responsive experience with purposeful calls to action.',
    deliverables: ['UX direction', 'Web development', 'Conversion-led content'],
    artLabel: 'CLEAR BY DESIGN',
    artNote: 'A better way forward',
  },
]

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  projectType: '',
  budget: '',
  timeline: '',
  preferredContact: '',
  location: '',
  referralSource: '',
  subject: '',
  message: '',
}

function TopBar() {
  return (
    <header className="topbar">
      <Link to="/" className="brand-wrap" aria-label="Wander Infinity home page">
        <div className="brand-mark" aria-hidden="true">
          <span className="brand-ring"></span>
        </div>
        <div className="brand-text">
          <span className="brand-name">WANDER INFINITY MEDIA</span>
        </div>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <Link className="button button-primary small" to="/contact">Let’s Talk</Link>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link to="/" className="footer-mark" aria-label="Return to home" style={{ textDecoration: 'none', display: 'inline-flex' }}></Link>
        <div className="footer-name" aria-label="WI Media">
          <span className="footer-name-regular">WI</span>
          <span className="footer-name-signature"> Media</span>
        </div>
      </div>

      <div className="footer-meta">
        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024 WANDER INFINITY MEDIA. ALL RIGHTS RESERVED.</span>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Careers</a>
          <a href="#">Press Kit</a>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  return (
    <div className="page-shell">
      <TopBar />
      <main>
        <section className="journey-block">
          <div className="journey-copy">
            <h3>Turning Ideas Into Icons</h3>
            <p>
              Founded in the quiet spaces between noise and signal, WANDER INFINITY MEDIA began
              as a collective of digital artisans dedicated to the craft of high-end visual
              storytelling. We believe that true luxury in the digital age is found in meticulous
              attention to detail, the thoughtful use of negative space, and interfaces that feel
              less like tools and more like finely crafted instruments.
            </p>
          </div>
        </section>

        <section className="stats" aria-label="WIM results">
          {stats.map((item) => (
            <div className={`stat-item ${item.emphasis ? 'emphasis' : ''}`} key={item.label}>
              <AnimatedNumber value={item.value} />
              <span>{item.label}</span>
            </div>
          ))}
        </section>

        <section className="about-section" id="about">
          <div className="section-tag">About us</div>
          <h2>
            The <span>Story Behind</span><br />
            <span className="highlight">The Vision</span>
          </h2>
          <p>
            Forging celestial aesthetics into tangible digital experiences. We wander through the
            infinite possibilities of design to anchor your brand in timeless luxury.
          </p>

          <div className="mission-grid">
            <article className="mini-card">
              <div className="mini-icon">◌</div>
              <h4>Our Mission</h4>
              <p>
                To navigate the complex digital cosmos, crafting bespoke brand identities and
                immersive media that elevate our clients beyond the ordinary and into the realm of
                timeless distinction.
              </p>
            </article>
            <article className="mini-card">
              <div className="mini-icon">◌</div>
              <h4>Our Vision</h4>
              <p>
                To be the premier architect of digital luxury, where every pixel is purposeful and
                every interaction resonates with the profound depth of an infinite universe.
              </p>
            </article>
          </div>
        </section>

        <section className="values-section">
          <div className="section-tag">What drives us</div>
          <h2>Our Core Values</h2>

          <div className="values-grid">
            <article className="value-card">
              <div className="value-icon">✦</div>
              <h4>Creativity</h4>
              <p>Push boundaries to discover uncharted aesthetic territories.</p>
            </article>
            <article className="value-card">
              <div className="value-icon">◍</div>
              <h4>Integrity</h4>
              <p>Uncompromising standards in every line of code and pixel rendered.</p>
            </article>
            <article className="value-card">
              <div className="value-icon">✧</div>
              <h4>Excellence</h4>
              <p>Crafting experiences that feel luxurious and perform flawlessly.</p>
            </article>
            <article className="value-card">
              <div className="value-icon">✦</div>
              <h4>Collaboration</h4>
              <p>Forging deep connections between visionaries and the communities they serve.</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

const serviceDescriptions = {
  videos: 'Cinematic storytelling and high-impact visual production tailored to elevate your message.',
  'influencer-marketing': 'Strategic creator partnerships and audience-first campaigns designed to grow your brand.',
  'web-development': 'Custom digital experiences designed for performance, clarity, and business growth.',
  'app-development': 'High-quality mobile and web app experiences built to engage users and scale efficiently.',
  'cyber-security': 'Proactive digital protection that keeps your data, systems, and reputation resilient.',
}

function ServiceDetailPage() {
  const { serviceName } = useParams()
  const content = servicePageContent[serviceName]
  const title = content?.title || (serviceName
    ? serviceName
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    : 'Service')

  return (
    <div className="page-shell">
      <TopBar />
      <main>
        <section className="service-detail page-section">
          <div className="section-tag">Service</div>
          <h2>{title}</h2>
          <p>{content?.summary || 'Tailored solutions designed to move your business forward.'}</p>

          {content?.items && (
            <div className="service-detail-grid">
              {content.items.map((item) => (
                <article key={item.title} className="service-detail-item">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          )}

          <Link to="/services" className="button button-primary explore">Back to Services</Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null)

  const isITServicePopup = selectedService?.title === 'IT Services'
  const modalItems = isITServicePopup
    ? ['Web Development', 'App Development', 'Cyber Security']
    : ['Videos', 'Influencer marketing']

  return (
    <div className="page-shell">
      <TopBar />
      <main>
        <section className="services-section page-section" id="services">
          <div className="section-tag">Our services</div>
          <h2>What We Do</h2>
          <p className="services-intro">
            We navigate the complex digital landscape to elevate your brand. From celestial strategy
            to gravitational content, our full-service capabilities ensure your message resonates
            across the cosmos.
          </p>
          <Link to="/contact" className="button button-primary explore">Explore Services</Link>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link to={`/services/${getServiceSlug(service.title)}`} className="learn-more-button">
                Learn More →
              </Link>
              </article>
            ))}
          </div>
        </section>

        {selectedService && (
          <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
            <div className="service-modal" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className="service-modal-close"
                aria-label="Close popup"
                onClick={() => setSelectedService(null)}
              >
                ×
              </button>
              <div className="section-tag">Explore</div>
              <div className="service-modal-list">
                {modalItems.map((item, index) => {
                  const destination = `/services/${item
                    .toLowerCase()
                    .replace(/&/g, 'and')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '')}`

                  return (
                    <Link
                      to={destination}
                      className={`service-modal-item ${isITServicePopup && index === modalItems.length - 1 ? 'full-width-item' : ''}`}
                      key={item}
                      onClick={() => setSelectedService(null)}
                    >
                      {item}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

function PortfolioPage() {
  const [activeFaq, setActiveFaq] = useState(0)
  const [activeCategory, setActiveCategory] = useState('All work')
  const categories = ['All work', 'Campaigns', 'Video', 'Digital']
  const visibleProjects = activeCategory === 'All work'
    ? portfolioProjects
    : portfolioProjects.filter((project) => project.category === activeCategory)

  return (
    <div className="page-shell">
      <TopBar />
      <main>
        <div className="portfolio-page">
          <section className="portfolio-hero" id="portfolio">
            <div className="section-tag">Selected directions · Wander Infinity Media</div>
            <h1>Good work starts<br /><span>with a good story.</span></h1>
            <div className="portfolio-hero-bottom">
              <p>
                A closer look at how strategy, creative, and technology can work together.
                Explore representative project concepts across campaigns, video, and digital
                experiences.
              </p>
              <a className="portfolio-scroll-link" href="#selected-work">
                Explore the work <span aria-hidden="true">↓</span>
              </a>
            </div>
          </section>

          <section className="portfolio-work" id="selected-work">
            <div className="portfolio-section-heading">
              <div>
                <div className="section-tag">The work, up close</div>
                <h2>Selected project<br /><span>directions.</span></h2>
              </div>
              <p>
                These illustrative concepts show the kinds of challenges we help solve and the
                thinking that goes into each response.
              </p>
            </div>

            <div className="portfolio-toolbar">
              <div className="portfolio-filters" aria-label="Filter projects">
                {categories.map((category) => (
                  <button
                    className={`portfolio-filter ${activeCategory === category ? 'active' : ''}`}
                    type="button"
                    key={category}
                    aria-pressed={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <span className="portfolio-count">
                {String(visibleProjects.length).padStart(2, '0')} / {String(portfolioProjects.length).padStart(2, '0')} concepts
              </span>
            </div>

            <div className="portfolio-grid" aria-live="polite">
              {visibleProjects.map((project) => (
                <article className={`portfolio-card portfolio-card--${project.id}`} key={project.id}>
                  <div className={`portfolio-art portfolio-art--${project.id}`} aria-hidden="true">
                    <span className="portfolio-art-note">{project.artNote}</span>
                    <span className="portfolio-art-shape"></span>
                  </div>
                  <div className="portfolio-card-body">
                    <div className="portfolio-card-meta">
                      <span>{project.sector}</span>
                      <span>{project.category}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="portfolio-card-summary">{project.summary}</p>
                    <div className="portfolio-project-details">
                      <div>
                        <h4>The challenge</h4>
                        <p>{project.challenge}</p>
                      </div>
                      <div>
                        <h4>Our approach</h4>
                        <p>{project.approach}</p>
                      </div>
                    </div>
                    <ul className="portfolio-deliverables" aria-label="Example deliverables">
                      {project.deliverables.map((deliverable) => (
                        <li key={deliverable}>{deliverable}</li>
                      ))}
                    </ul>
                    <span className="portfolio-concept-label">Illustrative project concept</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="portfolio-approach">
            <div className="section-tag">A little more than good-looking</div>
            <h2>Built with intention.<br /><span>Measured by what matters.</span></h2>
            <div className="portfolio-approach-grid">
              <article>
                <span>01 / FIND THE FOCUS</span>
                <h3>Start with the real brief.</h3>
                <p>We align the work to your audience, ambition, and the change you want to make.</p>
              </article>
              <article>
                <span>02 / MAKE IT DISTINCT</span>
                <h3>Give the story a shape.</h3>
                <p>Strategy and creative come together in a clear idea people can recognize and remember.</p>
              </article>
              <article>
                <span>03 / KEEP IT MOVING</span>
                <h3>Learn as the work lands.</h3>
                <p>We define meaningful signals up front, then use what we learn to improve what comes next.</p>
              </article>
            </div>
          </section>

          <section className="portfolio-contact">
            <div>
              <div className="section-tag">Have a good one?</div>
              <h2>Let’s make your<br /><span>next story matter.</span></h2>
            </div>
            <Link to="/contact" className="button button-primary">Start a conversation <span aria-hidden="true">↗</span></Link>
          </section>
        </div>

        <section className="faq-section portfolio-faq page-section" id="portfolio-faq">
          <div className="section-tag">A few useful things to know</div>
          <h2>Frequently asked<br />questions.</h2>

          <div className="faq-list">
            {faqs.map((item, index) => (
              <div className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={item.question}>
                <button className="faq-question" type="button" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}>
                  <span>{item.question}</span>
                  <span className="faq-plus">{activeFaq === index ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function AboutPage() {
  return (
    <div className="page-shell">
      <TopBar />
      <main>
        <div className="about-page">
          <section className="about-hero page-section" id="about">
            <div className="about-hero-copy">
              <div className="section-tag">The people behind the perspective</div>
              <h1>
                We make brands
                <span> impossible to ignore.</span>
              </h1>
              <p>
                WANDER INFINITY MEDIA brings strategy, storytelling, and technology together to
                help ambitious brands find their place—and make it matter—in a crowded digital
                world.
              </p>
              <Link to="/contact" className="button button-primary about-cta">
                Let’s create something meaningful <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <figure className="about-hero-art">
              <img
                src={heroArtwork}
                alt="Digital marketing campaign dashboard with audience insights, a content preview, and performance charts"
              />
              <figcaption>
                <span>Insight meets imagination.</span>
                <span>Every campaign, considered.</span>
              </figcaption>
            </figure>
          </section>

          <section className="about-story">
            <figure className="about-story-art">
              <img
                src={storyArtwork}
                alt="Illustration of a connected digital marketing campaign across social, search, video, and email"
                loading="lazy"
              />
              <figcaption>One clear story. Every channel working together.</figcaption>
            </figure>
            <div className="about-story-copy">
              <div className="section-tag">Our story</div>
              <h2>Built for the space between <span>bold ideas and what’s next.</span></h2>
              <p>
                We began with a simple belief: the best digital experiences should feel as
                considered as they look. What started as a shared love of visual storytelling
                grew into a creative media partner for brands ready to move forward with purpose.
              </p>
              <p>
                Today, we bring creative thinking and technical craft into the same conversation.
                From the first spark of a strategy to the final detail of a digital experience,
                we make every element work harder for the story it serves.
              </p>
              <div className="about-story-note">
                <span aria-hidden="true">“</span>
                <p>Thoughtful by design. Fearless by nature.</p>
              </div>
            </div>
          </section>

          <section className="about-purpose">
            <div className="about-section-heading">
              <div className="section-tag">What we’re here to do</div>
              <h2>A clear purpose.<br /><span>A limitless point of view.</span></h2>
            </div>
            <div className="about-purpose-grid">
              <article className="about-purpose-card">
                <div className="mini-icon" aria-hidden="true">↗</div>
                <h3>Make meaningful work.</h3>
                <p>
                  We turn complex challenges into clear, compelling brand experiences—combining
                  thoughtful strategy, distinctive creative, and reliable digital execution.
                </p>
              </article>
              <article className="about-purpose-card about-purpose-card-dark">
                <div className="mini-icon" aria-hidden="true">∞</div>
                <h3>Open up what’s possible.</h3>
                <p>
                  We want a digital landscape where ambitious ideas can travel further, connect
                  more deeply, and leave a lasting impression on the people they’re made for.
                </p>
              </article>
            </div>
          </section>

          <section className="about-principles">
            <div className="about-section-heading">
              <div className="section-tag">How we think</div>
              <h2>Our work is guided<br /><span>by a few big beliefs.</span></h2>
              <p>
                The best results happen when good ideas meet care, curiosity, and a willingness
                to keep refining.
              </p>
            </div>
            <div className="about-principle-list">
              <article className="about-principle">
                <span>01</span>
                <h3>Stay curious</h3>
                <p>Ask better questions, explore new perspectives, and never settle for the obvious.</p>
              </article>
              <article className="about-principle">
                <span>02</span>
                <h3>Make it matter</h3>
                <p>Connect every creative decision to a real audience, purpose, or business goal.</p>
              </article>
              <article className="about-principle">
                <span>03</span>
                <h3>Care about the craft</h3>
                <p>Bring detail, consistency, and intention to every part of the experience.</p>
              </article>
              <article className="about-principle">
                <span>04</span>
                <h3>Build together</h3>
                <p>Listen closely, share ideas openly, and make better work through collaboration.</p>
              </article>
            </div>
          </section>

          <section className="about-approach">
            <div className="section-tag">From first thought to final detail</div>
            <h2>A thoughtful process.<br /><span>Work that moves you forward.</span></h2>
            <div className="about-approach-grid">
              <article>
                <span>01</span>
                <h3>Understand</h3>
                <p>We get to know your goals, your audience, and the challenge behind the brief.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Imagine</h3>
                <p>We shape a clear direction and turn promising ideas into a shared vision.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Create</h3>
                <p>We bring the strategy to life through considered creative and digital craft.</p>
              </article>
              <article>
                <span>04</span>
                <h3>Keep growing</h3>
                <p>We learn from the work, refine what’s possible, and keep building momentum.</p>
              </article>
            </div>
          </section>

          <section className="about-end">
            <div>
              <div className="section-tag">Your next chapter starts here</div>
              <h2>Have a big idea?<br /><span>We’d love to hear it.</span></h2>
            </div>
            <Link to="/contact" className="button button-primary">
              Tell us about it <span aria-hidden="true">↗</span>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ContactPage() {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('Sending...')

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      setStatus(result.message || 'Message sent successfully!')
    } catch (error) {
      setStatus('Could not reach the backend. Please try again later.')
    }
  }

  return (
    <div className="page-shell">
      <TopBar />
      <main>
        <section className="contact-panel page-section" id="contact">
          <form className="contact-form-wrap" onSubmit={handleSubmit}>
            <div className="contact-form-heading">
              <span className="section-tag">Start a conversation</span>
              <h1>Tell us about your next big idea.</h1>
              <p>A few details will help our team come back with the right questions and next steps.</p>
            </div>

            <div className="row two-col">
              <label>
                <span>First Name</span>
                <input autoComplete="given-name" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </label>
              <label>
                <span>Last Name</span>
                <input autoComplete="family-name" name="lastName" value={formData.lastName} onChange={handleChange} />
              </label>
            </div>

            <div className="row two-col">
              <label>
                <span>Email Address</span>
                <input autoComplete="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
              </label>
              <label>
                <span>Phone Number</span>
                <input autoComplete="tel" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
              </label>
            </div>

            <div className="row two-col">
              <label>
                <span>Company / Brand</span>
                <input autoComplete="organization" name="company" placeholder="Your company name" value={formData.company} onChange={handleChange} />
              </label>
              <label>
                <span>Website or social link</span>
                <input type="url" name="website" placeholder="https://" value={formData.website} onChange={handleChange} />
              </label>
            </div>

            <div className="row two-col">
              <label>
                <span>What do you need help with?</span>
                <select name="projectType" value={formData.projectType} onChange={handleChange}>
                  <option value="">Choose a service</option>
                  <option value="Brand strategy">Brand strategy</option>
                  <option value="Website and digital experience">Website and digital experience</option>
                  <option value="Digital marketing">Digital marketing</option>
                  <option value="Content and production">Content and production</option>
                  <option value="Event management">Event management</option>
                  <option value="Something else">Something else</option>
                </select>
              </label>
              <label>
                <span>Estimated budget</span>
                <select name="budget" value={formData.budget} onChange={handleChange}>
                  <option value="">Select a range</option>
                  <option value="Under ₹50,000">Under ₹50,000</option>
                  <option value="₹50,000 – ₹2,00,000">₹50,000 – ₹2,00,000</option>
                  <option value="₹2,00,000 – ₹5,00,000">₹2,00,000 – ₹5,00,000</option>
                  <option value="₹5,00,000+">₹5,00,000+</option>
                  <option value="To be discussed">To be discussed</option>
                </select>
              </label>
            </div>

            <div className="row two-col">
              <label>
                <span>Ideal timeline</span>
                <select name="timeline" value={formData.timeline} onChange={handleChange}>
                  <option value="">When would you like to start?</option>
                  <option value="As soon as possible">As soon as possible</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="1–3 months">1–3 months</option>
                  <option value="3+ months">3+ months</option>
                  <option value="Just exploring">Just exploring</option>
                </select>
              </label>
              <label>
                <span>Preferred way to reach you</span>
                <select name="preferredContact" value={formData.preferredContact} onChange={handleChange}>
                  <option value="">No preference</option>
                  <option value="Email">Email</option>
                  <option value="Phone call">Phone call</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </label>
            </div>

            <div className="row two-col">
              <label>
                <span>Your city / time zone</span>
                <input autoComplete="address-level2" name="location" placeholder="e.g. Hyderabad, IST" value={formData.location} onChange={handleChange} />
              </label>
              <label>
                <span>How did you find us?</span>
                <select name="referralSource" value={formData.referralSource} onChange={handleChange}>
                  <option value="">Select an option</option>
                  <option value="Search engine">Search engine</option>
                  <option value="Social media">Social media</option>
                  <option value="Referral">Referral</option>
                  <option value="Previous work">Previous work</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            <label>
              <span>Project title (optional)</span>
              <input name="subject" placeholder="A short name for your project" value={formData.subject} onChange={handleChange} />
            </label>

            <label>
              <span>Tell us a little about your project</span>
              <textarea name="message" placeholder="What are you hoping to create, and what would success look like?" value={formData.message} onChange={handleChange} required />
            </label>

            <button type="submit" className="button button-primary full">Send Message</button>
            {status && <p className="submit-status" role="status" aria-live="polite">{status}</p>}
          </form>

          <aside className="contact-info">
            <div className="info-icon">✦</div>
            <h2>Direct Contact</h2>
            <p>Reach out to our celestial navigators directly.</p>

            <ul className="contact-list">
              <li>
                <span className="icon">⌖</span>
                <div>
                  <strong>Office Address</strong>
                  <p>Nagole, Hyderabad<br />Telangana</p>
                </div>
              </li>
              <li>
                <span className="icon">✉</span>
                <div>
                  <strong>Email Address</strong>
                  <p>wanderinfinitymedia@gmail.com</p>
                </div>
              </li>
              <li>
                <span className="icon">☎</span>
                <div>
                  <strong>Phone Number</strong>
                  <p>+91 80195 55082</p>
                </div>
              </li>
              <li>
                <span className="icon">◔</span>
                <div>
                  <strong>Business Hours</strong>
                  <p>Mon-Fri, 9am - 6pm IST</p>
                </div>
              </li>
            </ul>

            <div className="social-row" aria-label="Social media links">
              <a href="https://www.instagram.com/wanderinfinitymedia_?stkn=NmYyajB3NnpnbmRn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                </svg>
              </a>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:serviceName" element={<ServiceDetailPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

export default App
