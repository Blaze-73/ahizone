import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export default function StudioProcess() {
  const { t } = useTranslation()
  const studioImages = [
    { src: '/images/gallery/calligraphy-tools.jpg', label: t('studio.labels.0') },
    { src: '/images/gallery/workshop-action.jpg', label: t('studio.labels.1') },
    { src: '/images/gallery/thuluth-piece.jpg', label: t('studio.labels.2') },
    { src: '/images/gallery/acrylic-canvas.jpg', label: t('studio.labels.3') },
  ]
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-white dark:bg-eclipse">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-4 block">
              {t('studio.title')}
            </span>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-secondary dark:text-white">
              {t('studio.title')}
            </h2>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-stone dark:text-mist leading-relaxed font-light break-words">
              {t('studio.subtitle')}
            </p>
            <div className="mt-10">
              <Button variant="primary">{t('studio.cta')}</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {studioImages.map((img, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl overflow-hidden relative group ${i === 0 || i === 3 ? 'mt-8' : ''}`}
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${img.src})`, backgroundColor: '#2C1810' }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end p-4">
                  <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-body">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
