import { useEffect, useRef } from 'react'

export default function ParticleBackground({ count = 30 }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    let animationId
    let isVisible = true

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    }, { threshold: 0 })
    observer.observe(container)

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    let resizeTimer
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }
    resize()
    window.addEventListener('resize', debouncedResize)

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }))

    const animate = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particles.forEach((p) => {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0) p.x = canvas.width
          if (p.x > canvas.width) p.x = 0
          if (p.y < 0) p.y = canvas.height
          if (p.y > canvas.height) p.y = 0

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
          ctx.fill()
        })
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      observer.disconnect()
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(resizeTimer)
    }
  }, [count])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
