import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export default function AnimatedText({ children, className = '', as = 'p', delay = 0 }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const Component = as

  return (
    <Component ref={ref} className={className}>
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.span>
    </Component>
  )
}
