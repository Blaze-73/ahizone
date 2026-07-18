import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLenis } from './hooks/useLenis'
import ScrollToTop from './components/layout/ScrollToTop'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ArtistsPage from './pages/ArtistsPage'
import ArtistProfilePage from './pages/ArtistProfilePage'
import GalleryPage from './pages/GalleryPage'
import ArtworkPage from './pages/ArtworkPage'
import CollectionsPage from './pages/CollectionsPage'
import ExhibitionsPage from './pages/ExhibitionsPage'
import EventsPage from './pages/EventsPage'
import MagazinePage from './pages/MagazinePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  useLenis()
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/artists/:slug" element={<ArtistProfilePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/artwork/:id" element={<ArtworkPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/exhibitions" element={<ExhibitionsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/magazine" element={<MagazinePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
