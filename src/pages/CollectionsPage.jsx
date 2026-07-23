import SEO from '../components/seo/SEO'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/ui/Container'
import Lightbox from '../components/ui/Lightbox'
import LazyBackground from '../components/ui/LazyBackground'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import collectionsData from '../data/collections.json'

const categories = ['all', 'calligraphy', 'portraits', 'teaching', 'mixedMedia']

export default function CollectionsPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const { ref } = useScrollAnimation({ threshold: 0.05 })

  const filtered = activeCategory === 'all'
    ? collectionsData
    : collectionsData.filter((c) => c.category === activeCategory)

  return (
    <>
      <SEO
        title="المجموعات"
        description="مجموعات عبد الرحيم أحيزون الفنية: الخط الكوفي والمغربي، البورتريهات الشخصية، لوحات الأكريليك المخصصة، والملتقيات التعليمية."
        path="/collections"
      />
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-ivory dark:bg-charcoal">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">{t('collections.title')}</span>
            <h1 className="mt-4 font-display text-4xl md:text-7xl font-bold text-secondary dark:text-white">
              {t('collections.title')}
            </h1>
            <p className="mt-4 text-lg text-stone dark:text-mist">{t('collections.subtitle')}</p>
          </motion.div>
        </Container>
      </section>

      <section ref={ref} className="py-16 bg-white dark:bg-eclipse" aria-labelledby="collections-grid-heading">
        <Container>
          <h2 id="collections-grid-heading" className="sr-only">{t('collections.title')}</h2>
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-body transition-colors duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-secondary font-medium'
                    : 'bg-transparent text-stone dark:text-mist border border-stone/20 dark:border-white/10 hover:border-primary/50'
                }`}
              >
                {t(`collections.${cat}`)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence >
              {filtered.map((collection, i) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setLightboxIndex(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(i); } }}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <LazyBackground
                    src={collection.image}
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundColor: '#2C1810' }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {lightboxIndex !== null && (
            <Lightbox
              images={filtered.map((c) => ({ src: c.image, alt: c.title }))}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </Container>
      </section>
    </>
  )
}
