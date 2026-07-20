import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../ui/Container'
import Lightbox from '../ui/Lightbox'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import galleryData from '../../data/gallery.json'

const categories = ['all', 'calligraphy', 'portrait', 'teaching', 'mural', 'mixedMedia']

export default function ArtworkShowcase() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 })

  const filtered = activeCategory === 'all'
    ? galleryData
    : galleryData.filter((img) => img.category === activeCategory)

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-white dark:bg-eclipse">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">
            {t('gallery.title')}
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-secondary dark:text-white">
            {t('gallery.subtitle')}
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

        <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <div
                  className="w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${img.src})`,
                    backgroundColor: '#2C1810',
                    aspectRatio: `${img.width}/${img.height}`,
                    backgroundSize: 'cover',
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                  <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-body">
                    {t('gallery.viewFullscreen')}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-mist mt-12">{t('gallery.noResults')}</p>
        )}
      </Container>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
