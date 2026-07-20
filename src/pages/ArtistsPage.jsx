import SEO from '../components/seo/SEO'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineSearch } from 'react-icons/hi'
import Container from '../components/ui/Container'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import artistsData from '../data/artists.json'
import { prefetchDynamic } from '../utils/prefetch'

export default function ArtistsPage() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('all')
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 })

  const specialties = [...new Set(artistsData.map((a) => a.specialty))]

  const filtered = artistsData.filter((artist) => {
    const matchesSearch = artist.name.toLowerCase().includes(search.toLowerCase()) ||
      artist.biography.toLowerCase().includes(search.toLowerCase())
    const matchesSpecialty = specialty === 'all' || artist.specialty === specialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <>
      <SEO
        title="الخطاط"
        description="عبد الرحيم أحيزون، فنان خط عربي من أصيلة. متخصص في الخط الكوفي والمغربي والديواني، والبورتريهات الشخصية، وتعليم الأطفال فنون الخط العربي."
        path="/artists"
      />
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 bg-ivory dark:bg-charcoal">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">{t('artists.title')}</span>
            <h1 className="mt-4 font-display text-4xl md:text-7xl font-bold text-secondary dark:text-white">
              {t('artists.title')}
            </h1>
            <p className="mt-4 text-lg text-stone dark:text-mist">{t('artists.subtitle')}</p>
          </motion.div>
        </Container>
      </section>

      <section ref={ref} className="py-20 bg-white dark:bg-eclipse">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mist" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('artists.searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3 bg-ivory dark:bg-charcoal border border-stone/20 dark:border-white/10 rounded-xl text-sm font-body focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSpecialty('all')}
                className={`px-4 py-2 rounded-full text-sm font-body transition-all ${
                  specialty === 'all' ? 'bg-primary text-secondary' : 'bg-ivory dark:bg-charcoal text-stone dark:text-mist border border-stone/20 dark:border-white/10'
                }`}
              >
                {t('artists.all')}
              </button>
              {specialties.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpecialty(s)}
                  className={`px-4 py-2 rounded-full text-sm font-body transition-all ${
                    specialty === s ? 'bg-primary text-secondary' : 'bg-ivory dark:bg-charcoal text-stone dark:text-mist border border-stone/20 dark:border-white/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-mist py-20">{t('artists.noArtists')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((artist, i) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link to={`/artists/${artist.slug}`} onMouseEnter={() => prefetchDynamic('artist')} className="group block">
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
                    {artist.awards && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {artist.awards.slice(0, 2).map((award) => (
                          <span key={award} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {award}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
