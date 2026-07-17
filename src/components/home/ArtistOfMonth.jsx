import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import artistsData from '../../data/artists.json'

export default function ArtistOfMonth() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const artist = artistsData[0]

  return (
    <section ref={ref} className="relative py-32 bg-ivory dark:bg-charcoal overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
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
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-primary/20 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-4 block">
              {t('artistOfMonth.title')}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-secondary dark:text-white">
              {artist.name}
            </h2>
            <p className="mt-2 text-primary/80 font-display italic text-lg">{artist.nationality} — {artist.specialty}</p>
            <div className="w-16 h-px bg-primary my-8" />
            <div className="relative pl-6 border-l-2 border-primary/30">
              <p className="text-base md:text-lg text-stone dark:text-mist leading-relaxed font-literary italic">
                &ldquo;{artist.quote}&rdquo;
              </p>
            </div>
            <p className="mt-6 text-base text-stone dark:text-mist leading-relaxed font-light">
              {artist.biographyFull ? artist.biographyFull.split('. ').slice(0, 2).join('. ') + '.' : artist.biography}
            </p>
            <div className="mt-8">
              <Button to={`/artists/${artist.slug}`} variant="primary">{t('artistOfMonth.cta')}</Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
