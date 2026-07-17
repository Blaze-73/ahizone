import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <HiOutlineMoon className="w-5 h-5" />
        ) : (
          <HiOutlineSun className="w-5 h-5" />
        )}
      </motion.div>
    </button>
  )
}
