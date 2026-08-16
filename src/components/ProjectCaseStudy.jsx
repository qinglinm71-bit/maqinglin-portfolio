import { useMemo } from 'react'

export default function ProjectCaseStudy({ project }) {
  const displayPages = useMemo(
    () => (project.titleImageReplacesFirst
      ? [project.titleImage, ...project.pages.slice(1)]
      : [project.titleImage, ...project.pages]),
    [project],
  )
  return (
    <section
      className="case-study"
      id={`case-${project.id}`}
      data-section
      data-nav="works"
      aria-labelledby={`${project.id}-title`}
    >
      <div className="case-intro content-shell">
        <div className="case-kicker reveal">
          <span>{project.category}</span>
          <span>{project.range}</span>
        </div>
        <div className="case-title-grid">
          <div className="reveal">
            <p className="case-english">{project.english}</p>
            <h1 id={`${project.id}-title`}>{project.title}</h1>
          </div>
          <p className="case-summary reveal">{project.summary}</p>
        </div>
        <div className="case-scope reveal">
          {project.scope.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="case-read-cue reveal" aria-hidden="true">
          <span>向下浏览完整案例</span>
          <i />
        </div>
        <span className="case-index" aria-hidden="true">{project.index}</span>
      </div>

      <div className="case-gallery-layout content-shell">
        <div className="portfolio-pages">
          {displayPages.map((src, index) => {
            const pageNumber = index + 1
            return (
              <figure
                className="portfolio-frame portfolio-frame--static"
                data-plate={pageNumber}
                key={src}
              >
                <img
                  className="portfolio-frame-image"
                  src={src}
                  alt={`${project.title}，项目展示第 ${pageNumber} 页`}
                  loading={index > 0 ? 'lazy' : 'eager'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
                <figcaption>
                  <span>PLATE {String(pageNumber).padStart(2, '0')}</span>
                  <span>{project.category}</span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>

    </section>
  )
}
