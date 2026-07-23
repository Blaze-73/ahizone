import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { FiInstagram, FiFacebook } from 'react-icons/fi'
import siteData from '../../data/site.json'
import Container from '../ui/Container'
import { prefetchPage } from '../../utils/prefetch'

export default function Footer() {
  const { t } = useTranslation()

  const socialIcons = {
    instagram: FiInstagram,
    facebook: FiFacebook,
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  return (
    <footer className="bg-eclipse text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <Container className="py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <Link to="/" className="font-display text-3xl font-bold tracking-tight text-primary">
              {siteData.name}
            </Link>
            <p className="mt-4 text-sm text-mist leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex gap-3 mt-6">
              {Object.entries(siteData.social).map(([key, url]) => {
                const Icon = socialIcons[key]
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key === 'instagram' ? 'Instagram' : 'Facebook'}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-mist hover:text-primary hover:border-primary/30 transition-colors duration-300"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">{t('footer.navigation')}</h4>
            <ul className="space-y-3">
              {siteData.navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.path}
                    onMouseEnter={() => prefetchPage(link.path)}
                    className="text-sm text-mist hover:text-primary transition-colors duration-300"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">{t('footer.openingHours')}</h4>
            <ul className="space-y-2">
              {days.map((day) => (
                <li key={day} className="flex justify-between text-sm">
                  <span className="text-mist">{t(`footer.${day}`)}</span>
                  <span className="text-white/80">{siteData.openingHours[day]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-mist">{t('footer.address')}</span>
              </li>
              <li>
                <a href="tel:+212539917200" className="flex items-center gap-3 text-sm text-mist hover:text-primary transition-colors">
                  <HiOutlinePhone className="w-5 h-5 text-primary shrink-0" />
                  {t('footer.phone')}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${siteData.location.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-mist hover:text-primary transition-colors">
                  <FaWhatsapp className="w-5 h-5 text-primary shrink-0" />
                  {t('footer.whatsapp')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/5">
        <Container className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-mist">
            &copy; {new Date().getFullYear()} {siteData.name}. {t('footer.rights')}
          </p>
          <div className="flex gap-6 text-xs text-mist">
            <Link to="/about" onMouseEnter={() => prefetchPage('/about')} className="hover:text-primary transition-colors">{t('nav.about')}</Link>
            <Link to="/contact" onMouseEnter={() => prefetchPage('/contact')} className="hover:text-primary transition-colors">{t('nav.contact')}</Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
