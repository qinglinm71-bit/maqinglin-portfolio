const navItems = [
  ['home', '首页'],
  ['works', '作品目录'],
  ['about', '关于我'],
  ['capabilities', '设计能力'],
  ['contact', '联系'],
]

export default function Navigation({ active, progress }) {
  return (
    <>
      <div className="page-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <header className="site-nav">
        <a className="nav-mark" href="#home" aria-label="返回首页">
          <span>UIUX设计师-马庆林</span>
          <i>2026</i>
        </a>
        <nav aria-label="作品集章节导航">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''}>
              {label}
            </a>
          ))}
        </nav>
        <a className="nav-contact" href="mailto:qinglinm71@gmail.com">
          Available for work
        </a>
      </header>
    </>
  )
}
