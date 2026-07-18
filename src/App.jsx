import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLenis } from './hooks/useLenis'
import ScrollToTop from './components/layout/ScrollToTop'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingSpinner from './components/ui/LoadingSpinner'

const HomePage = lazy(() => import('./pages/HomePage'))
const ArtistsPage = lazy(() => import('./pages/ArtistsPage'))
const ArtistProfilePage = lazy(() => import('./pages/ArtistProfilePage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const ArtworkPage = lazy(() => import('./pages/ArtworkPage'))
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'))
const ExhibitionsPage = lazy(() => import('./pages/ExhibitionsPage'))
const EventsPage = lazy(() => import('./pages/EventsPage'))
const MagazinePage = lazy(() => import('./pages/MagazinePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

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
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
