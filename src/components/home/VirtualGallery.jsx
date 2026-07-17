import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '../ui/Container'
import galleryData from '../../data/gallery.json'

export default function VirtualGallery() {
  const { t } = useTranslation()
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-35%'])

  const displayImages = galleryData.slice(0, 6)

  return (
    <section ref={targetRef} className="relative py-32 bg-eclipse text-white overflow-hidden will-change-transform">
      <Container className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">
            {t('virtual.title')}
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            {t('virtual.title')}
          </h2>
          <p className="mt-4 text-white/50 text-sm font-body tracking-widest uppercase">
            {t('virtual.instruction')}
          </p>
        </motion.div>
      </Container>

      <div className="relative h-[60vh] md:h-[70vh]">
        <div className="absolute inset-0 flex items-center">
          <motion.div style={{ x }} className="flex gap-6 px-20 will-change-transform">
            {displayImages.concat(displayImages).map((img, i) => (
              <div
                key={`${img.id}-${i}`}
                className="relative shrink-0 w-[300px] md:w-[400px] lg:w-[500px] aspect-[3/4] rounded-2xl overflow-hidden will-change-transform"
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${img.src})`, backgroundColor: '#2C1810' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
