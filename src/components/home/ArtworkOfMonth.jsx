import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import artworksData from '../../data/artworks.json'
import { prefetchDynamic } from '../../utils/prefetch'

export default function ArtworkOfMonth() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const artwork = artworksData.find((a) => a.id === 7) || artworksData[0]

  return (
    <section ref={ref} className="content-visibility-auto relative py-20 md:py-32 bg-eclipse text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${artwork.image})`, backgroundColor: '#2C1810' }}
              />
            </div>
            <div className="hidden md:block absolute -bottom-4 -right-4 w-full h-full border border-primary/20 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-4 block">
              {t('artwork.title')} {t('artwork.ofTheMonth')}
            </span>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {artwork.title}
            </h2>
            <p className="mt-2 text-lg text-primary/80 font-display italic">{artwork.artistName}</p>
            <div className="w-16 h-px bg-primary/30 my-8" />
            <p className="text-base text-white/70 leading-relaxed font-light break-words">
              {artwork.story}
            </p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-mist">{t('artwork.medium')}</span>
                <p className="text-white mt-1">{artwork.medium}</p>
              </div>
              <div>
                <span className="text-mist">{t('artwork.dimensions')}</span>
                <p className="text-white mt-1">{artwork.dimensions}</p>
              </div>
              <div>
                <span className="text-mist">{t('artwork.year')}</span>
                <p className="text-white mt-1">{artwork.year}</p>
              </div>
            </div>
            <div className="mt-10">
              <Button to="/contact" variant="primary">{t('artwork.inquiry')}</Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
