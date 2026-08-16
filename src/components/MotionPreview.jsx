import { useEffect, useRef, useState } from 'react'

export default function MotionPreview({ item, index }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      video.pause()
      video.currentTime = 0
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
        } else {
          video.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.45 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const togglePlayback = () => {
    const video = videoRef.current
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <article className={`motion-card motion-card--${item.type} reveal`}>
      <div className="motion-meta">
        <span>Motion Preview</span>
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${item.title} 动效预览`}
      />
      <div className="motion-caption">
        <h3>{item.title}</h3>
        <button type="button" onClick={togglePlayback} aria-label={`${playing ? '暂停' : '播放'}${item.title}`}>
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </article>
  )
}
