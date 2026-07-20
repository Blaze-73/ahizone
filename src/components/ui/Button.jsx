import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Button({ children, to, href, onClick, variant = 'primary', className = '', size = 'md', ...rest }) {
  const base = 'relative inline-flex items-center justify-center font-body font-medium tracking-wide transition-all duration-500 cursor-pointer overflow-hidden group'

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-10 py-4 text-base',
  }

  const variants = {
    primary: 'bg-primary text-secondary hover:bg-primary-dark',
    secondary: 'border border-primary text-primary hover:bg-primary hover:text-secondary',
    ghost: 'text-white hover:text-primary',
    dark: 'border border-white/20 text-white hover:bg-white hover:text-secondary',
    underline: 'text-primary border-b border-primary/30 hover:border-primary pb-0.5',
  }

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-primary-dark"
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </>
  )

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>
  if (href) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>{content}</a>
  return <button onClick={onClick} className={cls} {...rest}>{content}</button>
}
