import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import magazineData from '../../data/magazine.json'

import { memo } from 'react'

const DigitalMagazine = memo(function DigitalMagazine() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  const featured = magazineData.filter((a) => a.featured).slice(0, 2)
  const rest = magazineData.filter((a) => !a.featured).slice(0, 4)

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
            {t('magazine.title')}
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-secondary dark:text-white">
            {t('magazine.subtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {featured.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link to="/magazine" className="group block">
                <div className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${article.image})`, backgroundColor: '#2C1810' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-xs font-body tracking-wider uppercase text-primary">{article.category}</span>
                    <h3 className="mt-2 font-display text-xl md:text-2xl font-semibold text-white">{article.title}</h3>
                    <p className="mt-2 text-sm text-white/60 line-clamp-1">{article.excerpt}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rest.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <Link to="/magazine" className="group block">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${article.image})`, backgroundColor: '#2C1810' }}
                  />
                </div>
                <span className="text-xs font-body tracking-wider uppercase text-primary">{article.category}</span>
                <h3 className="mt-1 font-display text-base font-semibold text-secondary dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="mt-1 text-xs text-mist">{article.date}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button to="/magazine" variant="primary">{t('magazine.readMore')}</Button>
        </motion.div>
      </Container>
    </section>
  )
})

export default DigitalMagazine
