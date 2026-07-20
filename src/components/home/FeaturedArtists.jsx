import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import artistsData from '../../data/artists.json'

import { memo } from 'react'
import { prefetchDynamic } from '../../utils/prefetch'

const FeaturedArtists = memo(function FeaturedArtists() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const artist = artistsData[0]

  if (!artist) return null

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-white dark:bg-eclipse overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">
            {t('artists.title')}
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-secondary dark:text-white">
            {t('artists.subtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${artist.portrait})`, backgroundColor: '#2C1810' }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-secondary dark:text-white">
              {artist.name}
            </h2>
            <p className="mt-2 text-primary/80 font-display italic text-lg">{artist.nationality} — {artist.specialty}</p>
            <div className="w-12 md:w-16 h-px bg-primary my-6 md:my-8" />
            <div className="relative pl-6 border-l-2 border-primary/30">
              <p className="text-base md:text-lg text-stone dark:text-mist leading-relaxed font-literary italic">
                &ldquo;{artist.quoteEn}&rdquo;
              </p>
            </div>
            <p className="mt-6 text-base text-stone dark:text-mist leading-relaxed font-light">
              {artist.biographyFull}
            </p>
            <div className="mt-8">
              <Button to={`/artists/${artist.slug}`} onMouseEnter={() => prefetchDynamic('artist')} variant="primary">{t('artists.viewProfile')}</Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
})

export default FeaturedArtists
