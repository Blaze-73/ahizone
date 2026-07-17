import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

import { memo } from 'react'

const AboutSection = memo(function AboutSection() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 })

  return (
    <section ref={ref} className="relative py-32 md:py-40 bg-ivory dark:bg-charcoal overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-4 block">
              {t('site.name')}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-secondary dark:text-white">
              {t('about.title')}
            </h2>
            <div className="w-16 h-px bg-primary my-8" />
            <p className="text-base md:text-lg text-stone dark:text-mist leading-relaxed font-light">
              {t('about.subtitle')}
            </p>
            <p className="mt-6 text-base md:text-lg text-stone dark:text-mist leading-relaxed font-light">
              {t('about.mission')}
            </p>
            <div className="mt-10">
              <Button to="/about" variant="primary">{t('about.cta')}</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/gallery/mosaic-dreams.jpg)', backgroundColor: '#2C1810' }}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-primary/20 rounded-2xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 border border-primary/20 rounded-full" />
          </motion.div>
        </div>
      </Container>
    </section>
  )
})

export default AboutSection
