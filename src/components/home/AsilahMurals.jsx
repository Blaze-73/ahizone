import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Container from '../ui/Container'
import Button from '../ui/Button'

export default function AsilahMurals() {
  const { t } = useTranslation()
  const timeline = [
    { year: '1978', event: t('asilah.timeline.0') },
    { year: '1988', event: t('asilah.timeline.1') },
    { year: '1995', event: t('asilah.timeline.2') },
    { year: '2005', event: t('asilah.timeline.3') },
    { year: '2015', event: t('asilah.timeline.4') },
    { year: '2026', event: t('asilah.timeline.5') },
  ]
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 bg-eclipse text-white overflow-hidden">
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <div className="w-full h-[120%] bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/images/exhibitions/moussem.jpg)', backgroundColor: '#2C1810' }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-eclipse via-eclipse/80 to-eclipse" />

      <Container className="relative z-10">
        <motion.div style={{ opacity }} className="text-center mb-20">
          <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">
            {t('asilah.title')}
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {t('asilah.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-lg text-white/70 leading-relaxed font-light">
              {t('asilah.subtitle')}
            </p>
            <p className="mt-6 text-base text-white/60 leading-relaxed">
              {t('asilah.history')}
            </p>
            <div className="mt-8">
              <Button variant="primary">{t('asilah.cta')}</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/exhibitions/murals-40.jpg)', backgroundColor: '#2C1810' }} />
            </div>
          </motion.div>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-16"
        >
          {t('asilah.timelineTitle')}
        </motion.h3>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-primary/20 hidden md:block" />
          <div className="space-y-12 md:space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative md:flex items-center gap-8 md:gap-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
                    <span className="text-3xl font-display font-bold text-primary">{item.year}</span>
                    <p className="mt-2 text-white/70">{item.event}</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-primary shrink-0 relative z-10">
                  <div className="w-3 h-3 rounded-full bg-eclipse" />
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
