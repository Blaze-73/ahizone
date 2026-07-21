import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import GlassCard from '../ui/GlassCard'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

import { memo } from 'react'

const testimonialIds = [0, 1, 2, 3]

const Testimonials = memo(function Testimonials() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-ivory dark:bg-charcoal">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">
            {t('testimonials.title')}
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-secondary dark:text-white">
            {t('testimonials.subtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonialIds.map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <GlassCard className="h-full flex flex-col">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-primary text-sm">★</span>
                  ))}
                </div>
                <p className="text-base text-stone dark:text-mist leading-relaxed font-literary italic flex-1">
                  &ldquo;{t(`testimonials.items.${id}.quote`)}&rdquo;
                </p>
                <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/5">
                  <p className="font-display font-semibold text-secondary dark:text-white">{t(`testimonials.items.${id}.name`)}</p>
                  <p className="text-sm text-mist">{t(`testimonials.items.${id}.role`)}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
})

export default Testimonials
