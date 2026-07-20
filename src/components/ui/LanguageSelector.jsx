import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import i18n from '../../i18n/i18n'

const languages = [
  { code: 'ar', label: 'AR' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
]

export default function LanguageSelector() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [upward, setUpward] = useState(false)
  const ref = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (!open || !btnRef.current) return
    const btn = btnRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - btn.bottom
    setUpward(spaceBelow < 200)
  }, [open])

  const changeLanguage = useCallback((code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('ahizoune-lang', code)
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = code
    setOpen(false)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-body text-stone dark:text-white/80 hover:text-primary transition-colors"
      >
        <HiOutlineGlobeAlt className="w-4 h-4 shrink-0" />
        <span>{i18n.language?.toUpperCase()}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: upward ? 8 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: upward ? 8 : -8 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 z-[1000] min-w-[130px] bg-white dark:bg-charcoal border border-black/5 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden ${
              upward ? 'bottom-full mb-2' : 'top-full mt-2'
            }`}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full px-4 py-3 text-left text-sm font-body transition-colors hover:bg-primary/10 ${
                  i18n.language === lang.code ? 'text-primary font-medium' : 'text-stone dark:text-mist'
                }`}
              >
                {t(`language.${lang.code}`)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
