import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi'
import siteData from '../../data/site.json'
import Container from '../ui/Container'
import { prefetchPage } from '../../utils/prefetch'

export default function Footer() {
  const { t } = useTranslation()

  const socialIcons = {
    instagram: FiInstagram,
    facebook: FiFacebook,
    twitter: FiTwitter,
    pinterest: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.95-.2-2.404.042-3.42.218-.913 1.409-5.964 1.409-5.964s-.36-.722-.36-1.786c0-1.675.971-2.927 2.179-2.927 1.027 0 1.523.77 1.523 1.694 0 1.032-.657 2.576-.997 4.007-.284 1.198.6 2.176 1.783 2.176 2.14 0 3.785-2.254 3.785-5.507 0-2.88-2.07-4.893-5.026-4.893-3.422 0-5.43 2.566-5.43 5.221 0 1.034.398 2.142.895 2.745a.36.36 0 01.083.345c-.091.38-.294 1.182-.333 1.343-.053.22-.174.266-.402.16-1.499-.698-2.436-2.889-2.436-4.648 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.358-.632-2.748-1.38l-.748 2.853c-.27 1.042-1.002 2.346-1.492 3.142C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>,
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
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-mist hover:text-primary hover:border-primary/30 transition-all duration-300"
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
                <a href="mailto:contact@ahizoune.art" className="flex items-center gap-3 text-sm text-mist hover:text-primary transition-colors">
                  <HiOutlineMail className="w-5 h-5 text-primary shrink-0" />
                  {t('footer.email')}
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
