import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', as = 'div', hover = true }) {
  const Component = motion[as] || motion.div

  return (
    <Component
      className={`rounded-2xl glass-light dark:glass-dark p-8 ${hover ? 'hover:shadow-2xl transition-shadow duration-500' : ''} ${className}`}
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : {}}
    >
      {children}
    </Component>
  )
}
