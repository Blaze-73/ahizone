import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const posRef = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const rafRef = useRef()

  useEffect(() => {
    const move = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setPos(posRef.current)
          rafRef.current = null
        })
      }
    }

    const addHover = () => setHovering(true)
    const removeHover = () => setHovering(false)

    const els = document.querySelectorAll('a, button, [data-cursor-hover]')
    els.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    window.addEventListener('mousemove', move, { passive: true })
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', move)
      els.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hovering ? 2.5 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9999] hidden lg:block"
        animate={{ x: pos.x - 16, y: pos.y - 16, scale: hovering ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      />
    </>
  )
}
