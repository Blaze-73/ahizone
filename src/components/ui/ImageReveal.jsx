import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { useState } from 'react'

export default function ImageReveal({ src, alt, className = '', aspectRatio = '4/3' }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const [loaded, setLoaded] = useState(false)

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
      {!loaded && (
        <div className="absolute inset-0 bg-parchment dark:bg-charcoal animate-pulse" />
      )}
      <motion.div
        className="absolute inset-0 bg-primary-dark origin-left"
        initial={{ scaleX: 1 }}
        animate={isVisible ? { scaleX: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.18, 1] }}
      />
      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        initial={{ scale: 1.15 }}
        animate={isVisible ? { scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  )
}
