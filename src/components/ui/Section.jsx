import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

export default function Section({ children, className = '', id, dark, light }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 })

  const bgClass = dark ? 'bg-eclipse text-white' : light ? 'bg-ivory' : ''

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-24 md:py-32 ${bgClass} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}
