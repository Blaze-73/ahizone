import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import collectionsData from '../../data/collections.json'

const categories = ['all', 'calligraphy', 'portraits', 'teaching', 'murals', 'mixedMedia']

import { memo } from 'react'

const FeaturedCollections = memo(function FeaturedCollections() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  const filtered = activeCategory === 'all'
    ? collectionsData
    : collectionsData.filter((c) => c.category === activeCategory)

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-ivory dark:bg-charcoal">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">
            {t('collections.title')}
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-secondary dark:text-white">
            {t('collections.subtitle')}
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-secondary font-medium'
                  : 'bg-transparent text-stone dark:text-mist border border-stone/20 dark:border-white/10 hover:border-primary/50'
              }`}
            >
              {t(`collections.${cat}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((collection, i) => (
              <motion.div
                key={collection.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/collections?category=${collection.category}`}
                  className="group block relative aspect-[4/5] rounded-2xl overflow-hidden"
                >
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${collection.image})`, backgroundColor: '#2C1810' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-xs font-body tracking-wider uppercase text-primary/80">
                      {collection.artworkLabel}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white">{collection.title}</h3>
                    <p className="mt-2 text-sm text-white/70 line-clamp-2">{collection.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-mist mt-12">{t('gallery.noResults')}</p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button to="/collections" variant="primary">{t('collections.viewAll')}</Button>
        </motion.div>
      </Container>
    </section>
  )
})

export default FeaturedCollections
