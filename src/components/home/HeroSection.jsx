import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import ScrollIndicator from '../ui/ScrollIndicator'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative h-dvh min-h-[500px] md:min-h-[700px] bg-eclipse">
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero/hero-bg.jpg)', backgroundColor: '#2C1810' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-eclipse via-eclipse/30 to-transparent" />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-end px-5 md:px-12 lg:px-20 pb-10 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-block text-[10px] md:text-sm font-body tracking-[0.3em] uppercase text-primary/90 mb-3 md:mb-4">
            {t('site.tagline')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight max-w-full sm:max-w-3xl break-words"
        >
          {t('hero.title')}{' '}
          <span className="text-primary">
            {t('hero.titleHighlight')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-4 md:mt-6 text-sm md:text-lg text-white/70 max-w-full sm:max-w-xl font-body font-light leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4"
        >
          <Button to="/gallery" variant="primary" size="lg">{t('hero.cta')}</Button>
          <Button to="/contact" variant="dark" size="lg">{t('hero.secondaryCta')}</Button>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
