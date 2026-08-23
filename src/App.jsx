import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import Counter from './components/Counter'
import MotionPreview from './components/MotionPreview'
import Navigation from './components/Navigation'
import ProjectCaseStudy from './components/ProjectCaseStudy'
import { capabilities, coreAdvantages, motionEntry, motionItems, projects, workExperiences } from './data'

const HOME_PATH = '/'

const designTools = [
  { name: 'Figma', icon: '/hero/figma.png' },
  { name: 'Photoshop', icon: '/hero/photoshop.png' },
  { name: 'Illustrator', icon: '/hero/illustrator.png' },
  { name: 'After Effects', icon: '/hero/after-effects.png' },
  { name: 'Cinema 4D', icon: '/hero/cinema-4d.png' },
  { name: 'XMind', icon: '/hero/xmind.png' },
  { name: 'CorelDRAW', icon: '/hero/coreldraw.png' },
  { name: '剪映', icon: '/hero/jianying.png' },
]

function readLocation() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || HOME_PATH
  return {
    pathname,
    hash: window.location.hash,
    state: window.history.state,
    key: `${pathname}${window.location.search}${window.location.hash}`,
  }
}

function usePortfolioRouter() {
  const [location, setLocation] = useState(readLocation)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    const handlePopState = () => {
      const update = () => flushSync(() => setLocation(readLocation()))
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (document.startViewTransition && !reduce) {
        document.startViewTransition(update)
      } else {
        update()
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((destination, options = {}) => {
    const target = document.createElement('a')
    target.href = destination
    const commit = () => {
      const method = options.replace ? 'replaceState' : 'pushState'
      window.history[method](options.state ?? {}, '', `${target.pathname}${target.search}${target.hash}`)
      flushSync(() => setLocation(readLocation()))
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduce) {
      document.startViewTransition(commit)
    } else {
      commit()
    }
  }, [])

  return { location, navigate }
}

function usePageEffects(routeKey) {
  const [active, setActive] = useState('home')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const revealNodes = [...document.querySelectorAll('.reveal')]
    let revealObserver

    setProgress(0)

    if (!reduce) {
      document.documentElement.classList.add('motion-ready')
      revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
      )
      revealNodes.forEach((node) => revealObserver.observe(node))
    } else {
      revealNodes.forEach((node) => node.classList.add('is-visible'))
    }

    const sections = [...document.querySelectorAll('[data-section]')]
    const parallaxNodes = [...document.querySelectorAll('[data-parallax]')]
    const interactiveNodes = [...document.querySelectorAll('a, button, [role="button"], [tabindex="0"]')]
    const pointerGlow = document.createElement('div')
    pointerGlow.className = 'global-pointer-glow'
    pointerGlow.setAttribute('aria-hidden', 'true')
    document.body.appendChild(pointerGlow)
    let raf = 0
    let pointerRaf = 0

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)

        const probe = window.innerHeight * 0.44
        const current = sections.find((section) => {
          const rect = section.getBoundingClientRect()
          return rect.top <= probe && rect.bottom > probe
        })
        if (current?.dataset.nav) setActive(current.dataset.nav)

        if (!reduce) {
          parallaxNodes.forEach((node) => {
            const rect = node.getBoundingClientRect()
            const distance = rect.top + rect.height / 2 - window.innerHeight / 2
            node.style.setProperty('--parallax-y', `${Math.max(-18, Math.min(18, distance * -0.025))}px`)
          })
        }
        raf = 0
      })
    }

    const enterControl = () => pointerGlow.classList.add('is-over-control')
    const leaveControl = () => pointerGlow.classList.remove('is-over-control')

    const onGlobalPointerMove = (event) => {
      if (!fine || reduce) return
      if (pointerRaf) cancelAnimationFrame(pointerRaf)
      pointerRaf = requestAnimationFrame(() => {
        pointerGlow.style.setProperty('--pointer-screen-x', `${event.clientX}px`)
        pointerGlow.style.setProperty('--pointer-screen-y', `${event.clientY}px`)
        pointerGlow.classList.add('is-visible')
        pointerRaf = 0
      })
    }

    const onGlobalPointerLeave = () => pointerGlow.classList.remove('is-visible')

    const onGlobalClick = (event) => {
      if (reduce || event.button !== 0 || (event.clientX === 0 && event.clientY === 0)) return

      const interactive = Boolean(event.target.closest('a, button, [role="button"]'))
      const effect = document.createElement('span')
      effect.className = `global-click-effect${interactive ? ' is-interactive' : ''}`
      effect.style.setProperty('--click-x', `${event.clientX}px`)
      effect.style.setProperty('--click-y', `${event.clientY}px`)
      effect.setAttribute('aria-hidden', 'true')

      const ring = document.createElement('i')
      ring.className = 'global-click-ring'
      const core = document.createElement('b')
      core.className = 'global-click-core'
      const particles = document.createElement('em')
      particles.className = 'global-click-particles'

      for (let index = 0; index < 6; index += 1) {
        const particle = document.createElement('span')
        const angle = (Math.PI * 2 * index) / 6
        const distance = interactive ? 38 : 30
        particle.style.setProperty('--particle-x', `${Math.cos(angle) * distance}px`)
        particle.style.setProperty('--particle-y', `${Math.sin(angle) * distance}px`)
        particle.style.setProperty('--particle-delay', `${index * 18}ms`)
        particles.appendChild(particle)
      }

      effect.append(ring, core, particles)
      document.body.appendChild(effect)
      pointerGlow.classList.remove('is-clicking')
      void pointerGlow.offsetWidth
      pointerGlow.classList.add('is-clicking')
      window.setTimeout(() => pointerGlow.classList.remove('is-clicking'), 360)
      effect.addEventListener('animationend', (animationEvent) => {
        if (animationEvent.target === effect) effect.remove()
      })
      window.setTimeout(() => effect.remove(), 1200)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onGlobalPointerMove, { passive: true })
    window.addEventListener('click', onGlobalClick, { passive: true, capture: true })
    document.documentElement.addEventListener('pointerleave', onGlobalPointerLeave)
    interactiveNodes.forEach((node) => {
      node.addEventListener('pointerenter', enterControl)
      node.addEventListener('pointerleave', leaveControl)
    })
    onScroll()

    return () => {
      document.documentElement.classList.remove('motion-ready')
      revealObserver?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onGlobalPointerMove)
      window.removeEventListener('click', onGlobalClick, { capture: true })
      document.documentElement.removeEventListener('pointerleave', onGlobalPointerLeave)
      interactiveNodes.forEach((node) => {
        node.removeEventListener('pointerenter', enterControl)
        node.removeEventListener('pointerleave', leaveControl)
      })
      if (raf) cancelAnimationFrame(raf)
      if (pointerRaf) cancelAnimationFrame(pointerRaf)
      pointerGlow.remove()
    }
  }, [routeKey])

  return { active, progress }
}

function RoutedLink({ to, navigate, className, children, onBeforeNavigate, replace = false, state, ...props }) {
  const handleClick = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onBeforeNavigate?.()
    navigate(to, { replace, state })
  }

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

function Hero() {
  return (
    <section className="home-hero" id="home" data-section data-nav="home" aria-labelledby="hero-title">
      <div className="cover-grid" aria-hidden="true" />
      <div className="cover-light" aria-hidden="true" />

      <div className="hero-shell content-shell">
        <div className="cover-meta-line">
          <span>UIUX DESIGNER · MA QINGLIN</span>
          <span>MAKE IN 2026</span>
        </div>

        <div className="cover-copy">
          <div className="cover-title-wrap">
            <p>MA QINGLIN / PORTFOLIO 2026</p>
            <h1 id="hero-title"><span>UI/UX</span><em>DESIGNER</em></h1>
            <strong>产品体验 × 视觉表达 × 动效设计</strong>
          </div>

          <div className="cover-info-stack">
            <a className="cover-phone" href="tel:+8613893057154" aria-label="拨打马庆林的电话 138 9305 7154">
              <small>PHONE</small>
              <strong>138 9305 7154</strong>
              <i aria-hidden="true">↗</i>
            </a>
            <div className="cover-identity">
              <span>马庆林 · UI/UX 设计师 · 3 年经验</span>
              <span>PRODUCT / VISUAL / MOTION / AIGC</span>
            </div>
          </div>

          <div className="cover-tools" aria-label="常用设计工具">
            {designTools.map((tool, index) => (
              <span key={tool.name} style={{ '--tool-index': index }} title={tool.name}>
                <img src={tool.icon} alt="" />
                <i>{tool.name}</i>
              </span>
            ))}
          </div>
        </div>

        <figure className="cover-character" data-parallax>
          <div className="character-orbit" aria-hidden="true"><span /><i /></div>
          <img src="/hero/designer.png" alt="马庆林作品集 3D 设计师人物" />
          <figcaption><span>DESIGN BY MA QINGLIN</span><i>UI / UX · 2026</i></figcaption>
        </figure>

        <div className="cover-section-index" aria-hidden="true">
          <span>01—06</span>
          <i>SELECTED WORKS</i>
        </div>

        <a className="cover-scroll" href="#works" data-magnetic>
          <span>查看作品目录</span>
          <i aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 3.5v16M6.5 14l5.5 5.5 5.5-5.5" />
            </svg>
          </i>
        </a>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about section-pad" id="about" data-section data-nav="about" aria-labelledby="about-title">
      <div className="content-shell">
        <div className="section-rule reveal">
          <span>个人档案</span>
          <span>三年产品体验与视觉设计实践</span>
        </div>

        <div className="about-lead">
          <h2 id="about-title" className="reveal">从需求分析到视觉落地，<br />让产品更清晰，也更有记忆点。</h2>
          <p className="reveal">三年 UI/UX 设计经验，具备需求分析、用户研究与竞品分析能力，能独立完成从概念到落地的交互与视觉设计，并与产品、运营紧密配合。</p>
        </div>

        <div className="about-grid">
          <div className="portrait-wrap reveal" data-parallax>
            <img src="/profile/portrait.webp" alt="马庆林个人头像" />
            <span>UI/UX Designer · 2026</span>
          </div>

          <div className="experience-list">
            <div className="profile-statement reveal">
              <span>UI / UX · PRODUCT · VISUAL · MOTION</span>
              <p>以产品逻辑搭建体验，以视觉与动效建立记忆，再通过规范和协作让方案真实落地。</p>
            </div>
            <div className="profile-contact reveal">
              <span>可联系</span>
              <a href="mailto:qinglinm71@gmail.com">qinglinm71@gmail.com ↗</a>
              <a href="tel:+8613893057154">138 9305 7154 ↗</a>
            </div>
          </div>
        </div>

        <section className="advantage-section" aria-labelledby="advantage-title">
          <div className="advantage-heading reveal">
            <span>01—05 / CORE ADVANTAGES</span>
            <h3 id="advantage-title">五项核心优势</h3>
            <p>能力不是软件清单，而是把问题拆解、把设计做完整并推动落地的方式。</p>
          </div>
          <div className="advantage-list">
            {coreAdvantages.map((item, index) => (
              <article className="advantage-row reveal" key={item.title} tabIndex={0}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                <strong>{item.signal}</strong>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="career-section" aria-labelledby="career-title">
          <div className="career-heading reveal">
            <span>2023—2026</span>
            <h3 id="career-title">工作经历</h3>
            <p>从出行产品、B 端 SaaS 到主题商城与 UI 动效，工作内容贯穿需求、设计、交付与迭代。</p>
          </div>
          <div className="career-track">
            {workExperiences.map((experience, index) => (
              <article className="career-card reveal" key={experience.company}>
                <div className="career-card-meta">
                  <span>{experience.period}</span>
                  <i>{String(index + 1).padStart(2, '0')}</i>
                </div>
                <div className="career-card-title">
                  <h4>{experience.company}</h4>
                  <strong>{experience.role}</strong>
                </div>
                <div className="career-card-context">
                  <p><span>行业类别</span>{experience.industry}</p>
                  <p><span>业务内容</span>{experience.business}</p>
                </div>
                <ol>
                  {experience.duties.map((duty) => <li key={duty}>{duty}</li>)}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section className="about-credentials" aria-label="教育背景与作品集数据">
          <div className="education-strip reveal">
            <span>教育背景</span>
            <strong>陇东学院 · 视觉传达设计专业</strong>
            <i>2024.09—2026.06</i>
          </div>

          <div className="stat-line reveal" aria-label="作品集数据">
            <div><i>01</i><Counter value={3} /><span>年 UI/UX 设计经验</span></div>
            <div><i>02</i><Counter value={6} /><span>核心项目</span></div>
            <div><i>03</i><Counter value={72} /><span>项目展示页</span></div>
            <div><i>04</i><Counter value={22} /><span>动效作品</span></div>
          </div>
        </section>
      </div>
    </section>
  )
}

function ProjectWindow({ entry, navigate, openDetail }) {
  const path = entry.id === 'motion' ? '/motion' : `/project/${entry.id}`
  return (
    <RoutedLink
      to={path}
      navigate={navigate}
      onBeforeNavigate={openDetail}
      state={{ entry: 'detail', fromHome: true }}
      className={`project-window project-window--${entry.id} reveal`}
      aria-label={`查看${entry.title}`}
    >
      <span className="project-window-index">{entry.index}</span>
      <div className="project-window-title">
        <p>{entry.category}</p>
        <h3>{entry.title}</h3>
        <span>{entry.pdfTitle}</span>
      </div>
      <figure className="project-window-media">
        {entry.id === 'motion' ? (
          <DirectoryMotionVideo src={entry.preview} />
        ) : (
          <img src={entry.preview} alt="" loading="lazy" />
        )}
      </figure>
      <p className="project-window-summary">{entry.summary}</p>
      <span className="project-window-open" data-magnetic><b>打开项目</b><i>↗</i></span>
    </RoutedLink>
  )
}

function DirectoryMotionVideo({ src }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      video.pause()
      video.currentTime = 0
      return undefined
    }

    video.play().catch(() => undefined)
    return () => video.pause()
  }, [src])

  return <video ref={videoRef} src={src} muted loop playsInline preload="metadata" aria-hidden="true" />
}

function WorkIndex({ navigate, openDetail }) {
  const entries = useMemo(() => [...projects, motionEntry], [])

  return (
    <section className="work-index section-pad" id="works" data-section data-nav="works" aria-labelledby="works-title">
      <div className="content-shell">
        <div className="index-heading reveal">
          <div className="index-heading-title">
            <h2 id="works-title">作品目录</h2>
            <div className="index-explore-cue" aria-hidden="true">
              <span>点击项目 · 查看完整案例</span>
              <svg viewBox="0 0 24 24"><path d="M5 12h13M13 7l5 5-5 5" /></svg>
            </div>
          </div>
          <p>六个真实项目与一个动效作品集。每个入口均为独立页面，可随时返回目录。</p>
        </div>

        <div className="project-window-list">
          {entries.map((entry) => (
            <ProjectWindow entry={entry} navigate={navigate} openDetail={openDetail} key={entry.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Capabilities() {
  return (
    <section className="capabilities section-pad" id="capabilities" data-section data-nav="capabilities" aria-labelledby="capabilities-title">
      <div className="content-shell">
        <div className="section-rule reveal">
          <span>设计能力</span>
          <span>从问题拆解到设计落地</span>
        </div>
        <div className="capabilities-heading">
          <h2 id="capabilities-title" className="capabilities-title reveal">我能做什么</h2>
          <p className="reveal">五项能力覆盖产品体验、视觉表达、运营设计、动效与 AIGC 工作流。每一项都对应真实项目与交付场景。</p>
        </div>
        <div className="capability-list">
          {capabilities.map((capability, index) => (
            <article className="capability-row reveal" key={capability.title} tabIndex={0}>
              <div className="capability-card-head">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i aria-hidden="true">↗</i>
              </div>
              <h3>{capability.title}</h3>
              <p>{capability.note}</p>
              <div className="capability-tags" aria-label="相关能力与工具">
                {capability.tools.split(' / ').map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState('')
  const copyTimer = useRef(null)

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const copyContact = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const field = document.createElement('textarea')
      field.value = value
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      field.remove()
    }
    setCopied(key)
    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(''), 1800)
  }

  return (
    <section className="contact closing-cover" id="contact" data-section data-nav="contact" aria-labelledby="contact-title">
      <div className="contact-grid" aria-hidden="true" />
      <div className="content-shell contact-inner">
        <div className="closing-meta reveal">
          <span>DESIGN<br />2026</span>
          <p>DESIGN BY MA QINGLIN</p>
          <i>UIUX DESIGNER</i>
        </div>
        <div className="closing-center">
          <h2 id="contact-title" className="reveal">THANKS</h2>
          <p className="closing-categories reveal">C 端产品&nbsp;&nbsp;//&nbsp;&nbsp; B 端系统&nbsp;&nbsp;//&nbsp;&nbsp; 运营活动&nbsp;&nbsp;//&nbsp;&nbsp; 视觉设计&nbsp;&nbsp;//&nbsp;&nbsp; UI 动效</p>

          <div className="closing-contact reveal">
            <div>
              <span>EMAIL</span>
              <a href="mailto:qinglinm71@gmail.com">qinglinm71@gmail.com ↗</a>
              <button type="button" onClick={() => copyContact('email', 'qinglinm71@gmail.com')}>
                {copied === 'email' ? '已复制 ✓' : '复制邮箱'}
              </button>
            </div>
            <div>
              <span>PHONE</span>
              <a href="tel:+8613893057154">138 9305 7154 ↗</a>
              <button type="button" onClick={() => copyContact('phone', '13893057154')}>
                {copied === 'phone' ? '已复制 ✓' : '复制电话'}
              </button>
            </div>
          </div>
        </div>

        <div className="closing-tools reveal" aria-label="常用设计工具">
          {designTools.map((tool) => <img key={tool.name} src={tool.icon} alt={tool.name} title={tool.name} />)}
        </div>
        <figure className="closing-character reveal" data-parallax>
          <img src="/hero/designer.png" alt="3D 设计师人物" />
        </figure>
        <footer>
          <span>马庆林 · UI/UX Designer</span>
          <span>Portfolio 2026</span>
          <a href="#home">Back to top ↑</a>
        </footer>
      </div>
    </section>
  )
}

function HomePage({ navigate, openDetail }) {
  return (
    <>
      <Hero />
      <WorkIndex navigate={navigate} openDetail={openDetail} />
      <About />
      <Capabilities />
      <Contact />
    </>
  )
}

function DetailTopbar({ title, progress, onBack }) {
  return (
    <>
      <div className="page-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
      <header className="detail-topbar">
        <button type="button" className="detail-back" onClick={onBack}>
          <i>←</i><span>返回作品目录</span>
        </button>
        <strong>{title}</strong>
        <span>MA QINGLIN · PORTFOLIO 2026</span>
      </header>
    </>
  )
}

function DetailFooter({ currentId, navigate, onBack, fromHome }) {
  const entries = [...projects, motionEntry]
  const currentIndex = entries.findIndex((entry) => entry.id === currentId)
  const previous = entries[(currentIndex - 1 + entries.length) % entries.length]
  const next = entries[(currentIndex + 1) % entries.length]
  const entryPath = (entry) => (entry.id === 'motion' ? '/motion' : `/project/${entry.id}`)

  const ArrowIcon = ({ direction = 'right' }) => (
    <svg className={`detail-nav-icon detail-nav-icon--${direction}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )

  const DirectoryIcon = () => (
    <svg className="detail-nav-icon detail-nav-icon--grid" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  )

  return (
    <section className="detail-footer" aria-label="项目浏览导航">
      <RoutedLink
        to={entryPath(previous)}
        navigate={navigate}
        replace
        state={{ entry: 'detail', fromHome }}
        className="detail-prev"
      >
        <span>上一个项目</span>
        <strong>{previous.title}</strong>
        <i><ArrowIcon direction="left" /></i>
      </RoutedLink>
      <button type="button" className="detail-directory" onClick={onBack}><span>返回作品目录</span><i><DirectoryIcon /></i></button>
      <RoutedLink
        to={entryPath(next)}
        navigate={navigate}
        replace
        state={{ entry: 'detail', fromHome }}
        className="detail-next"
      >
        <span>下一个项目</span>
        <strong>{next.title}</strong>
        <i><ArrowIcon /></i>
      </RoutedLink>
    </section>
  )
}

function MotionDetail() {
  const phone = useMemo(() => motionItems.filter((item) => item.type === 'phone'), [])
  const square = useMemo(() => motionItems.filter((item) => item.type === 'square'), [])

  return (
    <section className="motion-section motion-section--standalone" data-section data-nav="works" aria-labelledby="motion-title">
      <div className="case-intro content-shell">
        <div className="case-kicker reveal"><span>{motionEntry.category}</span><span>{motionItems.length} MOTION STUDIES</span></div>
        <div className="case-title-grid">
          <div className="reveal"><p className="case-english">Motion Design Showcase</p><h1 id="motion-title">{motionEntry.title}</h1></div>
          <p className="case-summary reveal">{motionEntry.summary}</p>
        </div>
        <div className="case-scope reveal">{motionEntry.scope.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="case-read-cue reveal" aria-hidden="true"><span>向下浏览完整案例</span><i /></div>
        <span className="case-index" aria-hidden="true">07</span>
      </div>

      <div className="content-shell motion-gallery">
        <div className="motion-gallery-heading reveal">
          <h2>主题皮肤与界面动效</h2>
          <p>视频进入视口后静音循环播放，离开视口自动暂停。点击播放键可手动控制。</p>
        </div>
        <div className="phone-motion-grid">{phone.map((item, index) => <MotionPreview key={item.src} item={item} index={index} />)}</div>
        <div className="square-motion-grid">{square.map((item, index) => <MotionPreview key={item.src} item={item} index={index + phone.length} />)}</div>
      </div>
    </section>
  )
}

function NotFound({ navigate }) {
  return (
    <main className="not-found" id="main-content">
      <p>404 / PAGE NOT FOUND</p>
      <h1>没有找到这个作品页面。</h1>
      <RoutedLink to="/#works" navigate={navigate} replace>返回作品目录</RoutedLink>
    </main>
  )
}

export default function App() {
  const { location, navigate } = usePortfolioRouter()
  const projectMatch = location.pathname.match(/^\/project\/([^/]+)$/)
  const project = projectMatch ? projects.find((item) => item.id === projectMatch[1]) : null
  const isHome = location.pathname === HOME_PATH
  const isMotion = location.pathname === '/motion'
  const isKnown = isHome || isMotion || Boolean(project)
  const { active, progress } = usePageEffects(location.key)

  useEffect(() => {
    const pageName = project?.title ?? (isMotion ? motionEntry.title : 'UI/UX Designer Portfolio 2026')
    document.title = `马庆林｜${pageName}`
  }, [isMotion, project])

  const rememberHomePosition = useCallback(() => {
    if (window.location.pathname !== HOME_PATH) return
    window.history.replaceState(
      { ...(window.history.state ?? {}), entry: 'home', restoreY: window.scrollY },
      '',
      `${window.location.pathname}${window.location.search}${window.location.hash}`,
    )
  }, [])

  const returnToWorks = useCallback(() => {
    if (window.history.state?.fromHome) {
      window.history.back()
    } else {
      navigate('/#works', { replace: true, state: { entry: 'home' } })
    }
  }, [navigate])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!isHome) {
        window.scrollTo({ top: 0, behavior: 'instant' })
        return
      }

      const restoreY = Number(location.state?.restoreY)
      if (Number.isFinite(restoreY) && restoreY > 0) {
        window.scrollTo({ top: restoreY, behavior: 'instant' })
        return
      }

      if (location.hash) {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'instant', block: 'start' })
        return
      }

      window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [isHome, location.hash, location.key, location.state?.restoreY])

  if (!isKnown) return <NotFound navigate={navigate} />

  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>

      {isHome ? (
        <Navigation active={active} progress={progress} />
      ) : (
        <DetailTopbar title={project?.title ?? motionEntry.title} progress={progress} onBack={returnToWorks} />
      )}

      <main id="main-content" className={isHome ? 'home-page' : 'detail-page'}>
        {isHome && <HomePage navigate={navigate} openDetail={rememberHomePosition} />}
        {project && (
          <>
            <ProjectCaseStudy project={project} />
            <DetailFooter currentId={project.id} navigate={navigate} onBack={returnToWorks} fromHome={Boolean(location.state?.fromHome)} />
          </>
        )}
        {isMotion && (
          <>
            <MotionDetail />
            <DetailFooter currentId="motion" navigate={navigate} onBack={returnToWorks} fromHome={Boolean(location.state?.fromHome)} />
          </>
        )}
      </main>
    </>
  )
}
