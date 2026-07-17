import HeroSection from '../components/home/HeroSection'
import AboutSection from '../components/home/AboutSection'
import FeaturedArtists from '../components/home/FeaturedArtists'
import FeaturedCollections from '../components/home/FeaturedCollections'
import ArtworkShowcase from '../components/home/ArtworkShowcase'
import ArtworkOfMonth from '../components/home/ArtworkOfMonth'
import UpcomingExhibitions from '../components/home/UpcomingExhibitions'
import AsilahMurals from '../components/home/AsilahMurals'
import VirtualGallery from '../components/home/VirtualGallery'
import StudioProcess from '../components/home/StudioProcess'
import ArtistOfMonth from '../components/home/ArtistOfMonth'
import DigitalMagazine from '../components/home/DigitalMagazine'
import Testimonials from '../components/home/Testimonials'
import InstagramGallery from '../components/home/InstagramGallery'
import Newsletter from '../components/home/Newsletter'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedArtists />
      <FeaturedCollections />
      <ArtworkShowcase />
      <ArtworkOfMonth />
      <UpcomingExhibitions />
      <AsilahMurals />
      <VirtualGallery />
      <StudioProcess />
      <ArtistOfMonth />
      <DigitalMagazine />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  )
}
