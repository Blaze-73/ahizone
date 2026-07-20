import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

import { memo } from 'react'

const Newsletter = memo(function Newsletter() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-eclipse text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">
            {t('newsletter.title')}
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold">
            {t('newsletter.title')}
          </h2>
          <p className="mt-4 text-white/60">{t('newsletter.subtitle')}</p>

            <form onSubmit={handleSubmit} className="mt-8 md:mt-10 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')}
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm font-body focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-primary text-secondary text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
              >
                {t('newsletter.button')}
              </button>
            </div>
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm text-green-400"
              >
                {t('newsletter.success')}
              </motion.p>
            )}
          </form>
        </motion.div>
      </Container>
    </section>
  )
})

export default Newsletter
