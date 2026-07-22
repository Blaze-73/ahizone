import SEO from '../components/seo/SEO'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import LazyBackground from '../components/ui/LazyBackground'
import artworksData from '../data/artworks.json'
import artistsData from '../data/artists.json'
import { prefetchDynamic, prefetchPage } from '../utils/prefetch'

export default function ArtworkPage() {
  const { id } = useParams()
  const { t } = useTranslation()

  const artwork = artworksData.find((a) => a.id === Number(id))
  const artist = artwork ? artistsData.find((a) => a.id === artwork.artistId) : null

  if (!artwork) {
    return (
      <Container className="pt-40 pb-20 text-center">
        <h1 className="font-display text-4xl font-bold">{t('common.pageNotFound')}</h1>
        <Button to="/gallery" variant="primary" className="mt-6">{t('common.backToHome')}</Button>
      </Container>
    )
  }

  return (
    <>
      <SEO
        title={artwork?.title || 'عمل فني'}
        description={artwork?.story?.slice(0, 160) || 'عمل فني في الخط العربي'}
        image={artwork?.image || '/images/og-default.jpg'}
        path={`/artwork/${id}`}
      />
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-ivory dark:bg-charcoal">
        <Container>
          <Link to="/gallery" className="inline-flex items-center gap-2 text-stone hover:text-primary transition-colors mb-8 text-sm">
            <HiOutlineArrowLeft className="w-4 h-4" /> {t('gallery.title')}
          </Link>
        </Container>
      </section>

      <section className="pb-20 bg-ivory dark:bg-charcoal">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <LazyBackground src={artwork.image} className="w-full h-full bg-cover bg-center" style={{ backgroundColor: '#2C1810' }} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary dark:text-white">
                {artwork.title}
              </h1>
              {artist && (
                <Link to={`/artists/${artist.slug}`} onMouseEnter={() => prefetchPage(`/artists/${artist.slug}`)} className="mt-2 inline-block text-lg text-primary hover:text-primary-dark font-display italic transition-colors">
                  {artist.name}
                </Link>
              )}

              <div className="w-16 h-px bg-primary/30 my-8" />

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <span className="text-xs font-body tracking-wider uppercase text-mist">{t('artwork.medium')}</span>
                  <p className="mt-1 text-secondary dark:text-white">{artwork.medium}</p>
                </div>
                <div>
                  <span className="text-xs font-body tracking-wider uppercase text-mist">{t('artwork.dimensions')}</span>
                  <p className="mt-1 text-secondary dark:text-white">{artwork.dimensions}</p>
                </div>
                <div>
                  <span className="text-xs font-body tracking-wider uppercase text-mist">{t('artwork.year')}</span>
                  <p className="mt-1 text-secondary dark:text-white">{artwork.year}</p>
                </div>
                <div>
                  <span className="text-xs font-body tracking-wider uppercase text-mist">{t('artwork.collection')}</span>
                  <p className="mt-1 text-secondary dark:text-white">{artwork.collection}</p>
                </div>
              </div>

              <div className="mb-8">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body ${
                  artwork.available ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${artwork.available ? 'bg-green-500' : 'bg-red-500'}`} />
                  {artwork.available ? t('artwork.available') : t('artwork.notAvailable')}
                </div>
              </div>

              {artwork.story && (
                <div className="mb-8">
                  <h2 className="font-display text-xl font-semibold text-secondary dark:text-white mb-3">{t('artwork.story')}</h2>
                  <p className="text-stone dark:text-mist leading-relaxed">{artwork.story}</p>
                </div>
              )}

              <Button to="/contact" variant="primary">{t('artwork.inquiry')}</Button>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-white dark:bg-eclipse">
        <Container>
          <h2 className="font-display text-3xl font-semibold text-secondary dark:text-white mb-8">
            {t('artwork.relatedArtworks')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {artworksData.filter((a) => a.id !== artwork.id && a.collection === artwork.collection).slice(0, 4).map((related, i) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={`/artwork/${related.id}`} onMouseEnter={() => prefetchDynamic('artwork')} className="group block">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden mb-3">
                    <LazyBackground
                      src={related.image}
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundColor: '#2C1810' }}
                    />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-secondary dark:text-white group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-xs text-mist">{related.artistName} · {related.year}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
