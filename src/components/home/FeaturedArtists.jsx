import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import artistsData from '../../data/artists.json'

import { memo } from 'react'

const FeaturedArtists = memo(function FeaturedArtists() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section ref={ref} className="relative py-32 bg-white dark:bg-eclipse">
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
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-secondary dark:text-white">
            {t('artists.subtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artistsData.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link to={`/artists/${artist.slug}`} className="group block">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative mb-5">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${artist.portrait})`, backgroundColor: '#2C1810' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <span className="text-white text-sm font-body">{t('artists.viewProfile')}</span>
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-secondary dark:text-white group-hover:text-primary transition-colors">
                  {artist.name}
                </h3>
                <p className="text-sm text-mist mt-1">{artist.nationality} — {artist.specialty}</p>
                <p className="text-sm text-stone dark:text-mist mt-3 line-clamp-2 leading-relaxed">
                  {artist.biography}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button to="/artists" variant="primary">{t('artists.viewAll')}</Button>
        </motion.div>
      </Container>
    </section>
  )
})

export default FeaturedArtists
