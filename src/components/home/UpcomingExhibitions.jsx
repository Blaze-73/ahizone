import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import exhibitionsData from '../../data/exhibitions.json'

export default function UpcomingExhibitions() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  const featured = exhibitionsData.filter((e) => e.featured).slice(0, 3)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

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
            {t('exhibitions.title')}
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-secondary dark:text-white">
            {t('exhibitions.subtitle')}
          </h2>
        </motion.div>

        <div className="space-y-6">
          {featured.map((exhibition, i) => (
            <motion.div
              key={exhibition.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${exhibition.image})`, backgroundColor: '#2C1810' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              </div>
              <div className="relative p-5 md:p-12 lg:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-body uppercase tracking-wider ${
                      exhibition.status === 'current' ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'
                    }`}>
                      {exhibition.status}
                    </span>
                    <span className="text-xs text-white/50 uppercase tracking-wider">{t(`exhibitions.${exhibition.type}`)}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-3xl font-semibold text-white">
                    {exhibition.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">
                    {formatDate(exhibition.startDate)} — {formatDate(exhibition.endDate)}
                  </p>
                  <p className="mt-3 text-white/70 max-w-xl line-clamp-2">{exhibition.description}</p>
                  {exhibition.artists.length > 0 && (
                    <p className="mt-2 text-sm text-primary/80">{exhibition.artists.join(', ')}</p>
                  )}
                </div>
                <Button to="/exhibitions" variant="dark" size="sm">{t('exhibitions.learnMore')}</Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button to="/exhibitions" variant="primary">{t('exhibitions.title')}</Button>
        </motion.div>
      </Container>
    </section>
  )
}
