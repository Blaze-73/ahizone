import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi'
import siteData from '../../data/site.json'
import ThemeToggle from '../ui/ThemeToggle'
import LanguageSelector from '../ui/LanguageSelector'
import Button from '../ui/Button'

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          scrolled
            ? 'glass-light dark:glass-dark py-3'
            : isHome
              ? 'bg-eclipse/60 backdrop-blur-sm py-5'
              : 'bg-ivory dark:bg-charcoal py-5'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className={`font-display text-2xl md:text-3xl font-bold tracking-tight transition-colors ${
              scrolled || !isHome ? 'text-secondary dark:text-white' : 'text-white'
            }`}>
              {siteData.name}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {siteData.navLinks.slice(0, 7).map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className={`px-3 py-2 text-sm font-body tracking-wide transition-colors duration-300 hover:text-primary relative group ${
                  location.pathname === link.path ? 'text-primary' : scrolled || !isHome ? 'text-secondary dark:text-white/80' : 'text-white'
                }`}
              >
                {t(`nav.${link.key}`)}
                <span className={`absolute bottom-0 left-3 right-3 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  location.pathname === link.path ? 'scale-x-100' : ''
                }`} />
              </Link>
            ))}
          </div>

          <div className={`hidden lg:flex items-center gap-2 transition-colors ${scrolled || !isHome ? 'text-secondary dark:text-white' : 'text-white'}`}>
            <LanguageSelector />
            <ThemeToggle />
            <Button to="/contact" variant={scrolled || !isHome ? 'primary' : 'dark'} size="sm">
              {t('nav.visit')}
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 ml-auto mr-2 transition-colors ${scrolled || !isHome ? 'text-secondary dark:text-white' : 'text-white'}`}
          >
            {mobileOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[998] bg-eclipse/60 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-eclipse border-l border-white/5 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <span className="font-display text-xl text-white font-bold">{siteData.name}</span>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white transition-colors p-1">
                  <HiOutlineX className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-start px-6 pt-8 gap-1">
                {siteData.navLinks.map((link, i) => (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl text-lg font-body tracking-wide transition-all duration-300 ${
                        location.pathname === link.path
                          ? 'text-primary bg-primary/10'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        location.pathname === link.path ? 'bg-primary scale-100' : 'bg-white/20 scale-0 group-hover:scale-100'
                      }`} />
                      {t(`nav.${link.key}`)}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="px-6 py-6 border-t border-white/5 flex items-center justify-around text-white/80"
              >
                <LanguageSelector />
                <ThemeToggle />
                <Button to="/contact" onClick={() => setMobileOpen(false)} variant="primary" size="sm">
                  {t('nav.visit')}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
