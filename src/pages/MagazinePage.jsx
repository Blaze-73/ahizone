import SEO from '../components/seo/SEO'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import magazineData from '../data/magazine.json'

const categories = ['all', ...new Set(magazineData.map((a) => a.category))]

export default function MagazinePage() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 })

  const featured = magazineData.filter((a) => a.featured)
  const rest = activeCategory === 'all'
    ? magazineData.filter((a) => !a.featured)
    : magazineData.filter((a) => a.category === activeCategory)

  return (
    <>
      <SEO
        title="المجلة"
        description="مجلة أحيزون: قصص، مقابلات، ورؤى من عالم الخط العربي والثقافة العربية. تعرف على رحلة الخطاط وتقنياته وإبداعاته."
        path="/magazine"
      />
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-ivory dark:bg-charcoal">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">{t('magazine.title')}</span>
            <h1 className="mt-4 font-display text-4xl md:text-7xl font-bold text-secondary dark:text-white">
              {t('magazine.title')}
            </h1>
            <p className="mt-4 text-lg text-stone dark:text-mist">{t('magazine.subtitle')}</p>
          </motion.div>
        </Container>
      </section>

      <section ref={ref} className="py-16 bg-white dark:bg-eclipse">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {featured.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={i === 0 ? 'lg:col-span-2' : ''}
              >
                <div className={`group relative overflow-hidden rounded-2xl ${i === 0 ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${article.image})`, backgroundColor: '#2C1810' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="text-xs font-body tracking-wider uppercase text-primary">{article.category}</span>
                    <h3 className="mt-2 font-display text-xl md:text-3xl font-semibold text-white">{article.title}</h3>
                    <p className="mt-2 text-sm text-white/60 line-clamp-2 max-w-2xl">{article.excerpt}</p>
                    <p className="mt-2 text-xs text-white/40">{article.author} · {article.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

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
                {cat === 'all' ? t('magazine.all') : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="group block">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${article.image})`, backgroundColor: '#2C1810' }} />
                  </div>
                  <span className="text-xs font-body tracking-wider uppercase text-primary">{article.category}</span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-secondary dark:text-white group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone dark:text-mist line-clamp-2">{article.excerpt}</p>
                  <p className="mt-2 text-xs text-mist">{article.author} · {article.date}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {rest.length === 0 && (
            <p className="text-center text-mist py-20">{t('magazine.all')}</p>
          )}
        </Container>
      </section>
    </>
  )
}
