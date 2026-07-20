import SEO from '../components/seo/SEO'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import exhibitionsData from '../data/exhibitions.json'

export default function ExhibitionsPage() {
  const { t, i18n } = useTranslation()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? exhibitionsData
    : exhibitionsData.filter((e) => e.status === filter)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(i18n.language, { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <>
      <SEO
        title="المعارض"
        description="تعرف على معارض وفعاليات عبد الرحيم أحيزون. التظاهرات الوطنية لتعليم الخط العربي، المشاركات في المهرجانات الثقافية، وورش العمل."
        path="/exhibitions"
      />
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-ivory dark:bg-charcoal">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">{t('exhibitions.title')}</span>
            <h1 className="mt-4 font-display text-4xl md:text-7xl font-bold text-secondary dark:text-white">
              {t('exhibitions.title')}
            </h1>
            <p className="mt-4 text-lg text-stone dark:text-mist">{t('exhibitions.subtitle')}</p>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-eclipse">
        <Container>
          <div className="flex flex-wrap gap-3 mb-12">
            {['all', 'current', 'upcoming', 'past'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                  filter === f
                    ? 'bg-primary text-secondary font-medium'
                    : 'bg-transparent text-stone dark:text-mist border border-stone/20 dark:border-white/10 hover:border-primary/50'
                }`}
              >
                {t(`exhibitions.${f}`)}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filtered.map((exhibition, i) => (
              <motion.div
                key={exhibition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${exhibition.image})`, backgroundColor: '#2C1810' }} />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                </div>
                <div className="relative p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-body uppercase tracking-wider ${
                        exhibition.status === 'current' ? 'bg-green-500/20 text-green-400' :
                        exhibition.status === 'upcoming' ? 'bg-primary/20 text-primary' :
                        'bg-white/10 text-white/50'
                      }`}>
                        {t(`exhibitions.${exhibition.status}`)}
                      </span>
                      <span className="text-xs text-white/50 uppercase tracking-wider">{t(`exhibitions.${exhibition.type}`)}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-white">{exhibition.title}</h3>
                    <p className="mt-2 text-sm text-white/60">
                      {formatDate(exhibition.startDate)} — {formatDate(exhibition.endDate)}
                    </p>
                    <p className="mt-3 text-white/70 max-w-xl line-clamp-2">{exhibition.description}</p>
                    {exhibition.artists.length > 0 && (
                      <p className="mt-2 text-sm text-primary/80">{exhibition.artists.join(', ')}</p>
                    )}
                  </div>
                  {(exhibition.status === 'current' || exhibition.status === 'upcoming') && (
                    <Button variant="dark" size="sm">{t('exhibitions.register')}</Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
