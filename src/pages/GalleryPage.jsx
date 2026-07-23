import SEO from '../components/seo/SEO'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/ui/Container'
import Lightbox from '../components/ui/Lightbox'
import { useLazyImage } from '../hooks/useLazyImage'
import galleryData from '../data/gallery.json'

const categories = ['all', 'calligraphy', 'portrait', 'teaching', 'mural', 'mixedMedia']

export default function GalleryPage() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = activeCategory === 'all'
    ? galleryData
    : galleryData.filter((img) => img.category === activeCategory)

  return (
    <>
      <SEO
        title="الأعمال"
        description="استعرض مجموعة أعمال عبد الرحيم أحيزون في الخط العربي: لوحات الخط الكوفي والمغربي، البورتريهات الشخصية، الجداريات، وأعمال المهرجانات."
        path="/gallery"
      />
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-ivory dark:bg-charcoal">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">{t('gallery.title')}</span>
            <h1 className="mt-4 font-display text-4xl md:text-7xl font-bold text-secondary dark:text-white">
              {t('gallery.title')}
            </h1>
            <p className="mt-4 text-lg text-stone dark:text-mist">{t('gallery.subtitle')}</p>
          </motion.div>
        </Container>
      </section>

      <section className="py-12 bg-white dark:bg-eclipse" aria-labelledby="gallery-grid-heading">
        <Container>
          <h2 id="gallery-grid-heading" className="sr-only">{t('gallery.title')}</h2>
          <div className="flex flex-wrap gap-3 mb-12">
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setLightboxIndex(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(i); } }}
                >
                  <LazyBackground
                    src={img.src}
                    className="w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundColor: '#2C1810', aspectRatio: `${img.width}/${img.height}`, backgroundSize: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                    <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-body">
                      {t('gallery.viewFullscreen')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-mist py-20">{t('gallery.noResults')}</p>
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
    </>
  )
}
