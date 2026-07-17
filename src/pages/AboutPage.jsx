import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function AboutPage() {
  const { t } = useTranslation()
  const timeline = [
    { year: '2020', event: t('aboutPage.timelineEvents.0') },
    { year: '2021', event: t('aboutPage.timelineEvents.1') },
    { year: '2022', event: t('aboutPage.timelineEvents.2') },
    { year: '2023', event: t('aboutPage.timelineEvents.3') },
    { year: '2024', event: t('aboutPage.timelineEvents.4') },
    { year: '2026', event: t('aboutPage.timelineEvents.5') },
  ]
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <>
      <section className="relative pt-32 pb-20 bg-ivory dark:bg-charcoal">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">{t('aboutPage.title')}</span>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold text-secondary dark:text-white">
              {t('aboutPage.title')}
            </h1>
            <p className="mt-4 text-lg text-stone dark:text-mist">{t('aboutPage.subtitle')}</p>
          </motion.div>
        </Container>
      </section>

      <section className="py-20 bg-white dark:bg-eclipse">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {t('aboutPage.history')}
              </h2>
              <p className="text-stone dark:text-mist leading-relaxed">
                {t('aboutPage.history')}
              </p>
              <p className="mt-6 text-stone dark:text-mist leading-relaxed">
                {t('aboutPage.mission')}
              </p>
            </div>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(/images/exhibitions/fluid-boundaries.jpg)', backgroundColor: '#2C1810' }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="font-display text-3xl font-bold text-secondary dark:text-white mb-6">{t('aboutPage.vision')}</h2>
              <p className="text-stone dark:text-mist leading-relaxed">{t('aboutPage.vision')}</p>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-secondary dark:text-white mb-6">{t('aboutPage.mission')}</h2>
              <p className="text-stone dark:text-mist leading-relaxed">{t('aboutPage.mission')}</p>
            </div>
          </div>

          <div ref={ref} className="mb-24">
            <h2 className="font-display text-3xl font-bold text-secondary dark:text-white mb-12 text-center">
              {t('aboutPage.valuesTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-ivory dark:bg-charcoal border border-black/5 dark:border-white/5"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <span className="text-primary font-display font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-secondary dark:text-white mb-2">{t(`aboutPage.values.${i}.title`)}</h3>
                  <p className="text-sm text-stone dark:text-mist">{t(`aboutPage.values.${i}.description`)}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-24">
            <h2 className="font-display text-3xl font-bold text-secondary dark:text-white mb-12 text-center">
              {t('aboutPage.timelineTitle')}
            </h2>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 md:-translate-x-px" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`relative flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className="flex-1 md:px-8">
                      <div className={`${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <span className="text-2xl font-display font-bold text-primary">{item.year}</span>
                        <p className="text-stone dark:text-mist">{item.event}</p>
                      </div>
                    </div>
                    <div className="relative z-10 w-8 h-8 rounded-full bg-primary shrink-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button to="/contact" variant="primary">{t('aboutPage.cta')}</Button>
          </div>
        </Container>
      </section>
    </>
  )
}
