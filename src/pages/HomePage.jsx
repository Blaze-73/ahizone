import { Helmet } from 'react-helmet-async'
import SEO from '../components/seo/SEO'
import HeroSection from '../components/home/HeroSection'
import AboutSection from '../components/home/AboutSection'
import FeaturedArtists from '../components/home/FeaturedArtists'
import FeaturedCollections from '../components/home/FeaturedCollections'
import ArtworkShowcase from '../components/home/ArtworkShowcase'
import ArtworkOfMonth from '../components/home/ArtworkOfMonth'
import UpcomingExhibitions from '../components/home/UpcomingExhibitions'
import StudioProcess from '../components/home/StudioProcess'
import DigitalMagazine from '../components/home/DigitalMagazine'
import Testimonials from '../components/home/Testimonials'
import InstagramGallery from '../components/home/InstagramGallery'
import Newsletter from '../components/home/Newsletter'

export default function HomePage() {
  return (
    <>
      <SEO
        title="الرئيسية"
        description="أحيزون فنان خط عربي من أصيلة، المغرب. متخصص في فن الخط العربي والرسم البورتريه وإقامة التظاهرات الوطنية لتعليم الأطفال فنون الخط والكتابة العربية."
        path="/"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'عبد الرحيم أحيزون',
            givenName: 'عبد الرحيم',
            familyName: 'أحيزون',
            description: 'فنان خط عربي من أصيلة، المغرب. متخصص في فن الخط العربي والرسم البورتريه.',
            url: 'https://ahizoune.art',
            image: 'https://ahizoune.art/images/artists/ahizoune-portrait.jpg',
            jobTitle: 'فنان خط عربي',
            knowsAbout: ['الخط العربي', 'فن البورتريه', 'التعليم الفني', 'الثقافة العربية'],
            sameAs: [
              'https://instagram.com/ahizoune_art',
              'https://facebook.com/ahizoune.art',
            ],
            homeLocation: {
              '@type': 'Place',
              name: 'أصيلة، المغرب',
              address: { '@type': 'PostalAddress', addressLocality: 'أصيلة', addressCountry: 'المغرب' },
            },
          })}
        </script>
      </Helmet>
      <HeroSection />
      <AboutSection />
      <FeaturedArtists />
      <FeaturedCollections />
      <ArtworkShowcase />
      <ArtworkOfMonth />
      <UpcomingExhibitions />
      <StudioProcess />
      <DigitalMagazine />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  )
}
