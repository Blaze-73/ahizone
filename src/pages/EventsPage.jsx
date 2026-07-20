import SEO from '../components/seo/SEO'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Container from '../components/ui/Container'
import GlassCard from '../components/ui/GlassCard'
import exhibitionsData from '../data/exhibitions.json'

export default function EventsPage() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? exhibitionsData
    : exhibitionsData.filter((e) => e.type === filter)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <>
      <SEO
        title="الفعاليات"
        description="فعاليات عبد الرحيم أحيزون: ورش الخط العربي، التظاهرات الوطنية لتعليم الأطفال، والمشاركات في المهرجانات الثقافية."
        path="/events"
      />
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-ivory dark:bg-charcoal">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">{t('events.title')}</span>
            <h1 className="mt-4 font-display text-4xl md:text-7xl font-bold text-secondary dark:text-white">
              {t('events.title')}
            </h1>
            <p className="mt-4 text-lg text-stone dark:text-mist">{t('events.subtitle')}</p>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-eclipse">
        <Container>
          <div className="flex flex-wrap gap-3 mb-12">
            {['all', 'exhibition', 'festival', 'workshop'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                  filter === f
                    ? 'bg-primary text-secondary font-medium'
                    : 'bg-transparent text-stone dark:text-mist border border-stone/20 dark:border-white/10 hover:border-primary/50'
                }`}
              >
                {f === 'all' ? t('events.all') : t(`exhibitions.${f}`)}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-mist py-20">{t('events.noEvents')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <GlassCard className="h-full flex flex-col">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-5">
                      <div className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${event.image})`, backgroundColor: '#2C1810' }} />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-body uppercase tracking-wider ${
                        event.status === 'current' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                        event.status === 'upcoming' ? 'bg-primary/10 text-primary' :
                        'bg-stone/10 text-stone'
                      }`}>
                        {event.status}
                      </span>
                      <span className="text-xs text-mist uppercase">{t(`exhibitions.${event.type}`)}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-secondary dark:text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-mist mb-3">
                      {formatDate(event.startDate)} — {formatDate(event.endDate)}
                    </p>
                    <p className="text-sm text-stone dark:text-mist leading-relaxed flex-1">
                      {event.description}
                    </p>
                    {event.artists.length > 0 && (
                      <p className="mt-3 text-xs text-primary">{event.artists.join(', ')}</p>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
