import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import artistsData from '../data/artists.json'
import artworksData from '../data/artworks.json'

export default function ArtistProfilePage() {
  const { slug } = useParams()
  const { t } = useTranslation()

  const artist = artistsData.find((a) => a.slug === slug)

  if (!artist) {
    return (
      <Container className="pt-40 pb-20 text-center">
        <h1 className="font-display text-4xl font-bold">{t('common.pageNotFound')}</h1>
        <Button to="/artists" variant="primary" className="mt-6">{t('common.backToHome')}</Button>
      </Container>
    )
  }

  const artistArtworks = artworksData.filter((aw) => aw.artistId === artist.id)

  return (
    <>
      <section className="relative min-h-[70vh] pt-32 pb-20 bg-eclipse text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${artist.featuredImage})`, backgroundColor: '#2C1810' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-eclipse via-eclipse/60 to-eclipse" />

        <Container className="relative z-10 h-full flex flex-col justify-end">
          <Link to="/artists" className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-8 text-sm">
            <HiOutlineArrowLeft className="w-4 h-4" /> {t('artists.viewAll')}
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold">{artist.name}</h1>
            <p className="mt-3 text-xl text-primary/80 font-display italic">{artist.nationality} — {artist.specialty}</p>
            <div className="w-16 h-px bg-primary/30 my-6" />
            <p className="text-lg text-white/70 max-w-2xl">{artist.biography}</p>
          </motion.div>
        </Container>
      </section>

      <section className="py-20 bg-white dark:bg-eclipse">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 sticky top-24">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${artist.portrait})`, backgroundColor: '#2C1810' }} />
              </div>
            </div>

            <div className="lg:col-span-2">
              {artist.biographyFull && (
                <div className="mb-10">
                  <h2 className="font-display text-2xl font-semibold text-secondary dark:text-white mb-4">{t('artists.biography')}</h2>
                  <p className="text-stone dark:text-mist leading-relaxed">{artist.biographyFull}</p>
                </div>
              )}

              {artist.quote && (
                <div className="mb-10 pl-6 border-l-2 border-primary/30">
                  <p className="text-xl font-literary italic text-stone dark:text-mist">&ldquo;{artist.quote}&rdquo;</p>
                </div>
              )}

              {artist.awards && artist.awards.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-display text-2xl font-semibold text-secondary dark:text-white mb-4">{t('artists.awards')}</h2>
                  <ul className="space-y-2">
                    {artist.awards.map((award) => (
                      <li key={award} className="flex items-center gap-3 text-stone dark:text-mist">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {artistArtworks.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-secondary dark:text-white mb-6">{t('artists.featuredArtworks')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {artistArtworks.map((aw, i) => (
                      <motion.div
                        key={aw.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <Link to={`/artwork/${aw.id}`} className="group block">
                          <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3">
                            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{ backgroundImage: `url(${aw.image})`, backgroundColor: '#2C1810' }} />
                          </div>
                          <h3 className="font-display text-lg font-semibold text-secondary dark:text-white group-hover:text-primary transition-colors">
                            {aw.title}
                          </h3>
                          <p className="text-sm text-mist">{aw.year} — {aw.medium}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10">
                <Button variant="primary">{t('artwork.inquiry')}</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
