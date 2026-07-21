import SEO from '../components/seo/SEO'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import Container from '../components/ui/Container'
import siteData from '../data/site.json'

export default function ContactPage() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.message) return
    setStatus('success')
    setFormData({ name: '', phone: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <>
      <SEO
        title="اتصل بي"
        description="تواصل مع عبد الرحيم أحيزون لطلب لوحة خط عربي مخصصة أو بورتريه شخصي أو لحجز ورشة في تعليم الخط العربي."
        path="/contact"
      />
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-ivory dark:bg-charcoal">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">{t('contactPage.title')}</span>
            <h1 className="mt-4 font-display text-4xl md:text-7xl font-bold text-secondary dark:text-white">
              {t('contactPage.title')}
            </h1>
            <p className="mt-4 text-lg text-stone dark:text-mist">{t('contactPage.subtitle')}</p>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-eclipse">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-body text-secondary dark:text-white mb-2">{t('contactPage.form.name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-ivory dark:bg-charcoal text-secondary dark:text-white border border-stone/20 dark:border-white/10 rounded-xl text-sm font-body focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body text-secondary dark:text-white mb-2">{t('contactPage.form.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-ivory dark:bg-charcoal text-secondary dark:text-white border border-stone/20 dark:border-white/10 rounded-xl text-sm font-body focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-body text-secondary dark:text-white mb-2">{t('contactPage.form.subject')}</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-ivory dark:bg-charcoal text-secondary dark:text-white border border-stone/20 dark:border-white/10 rounded-xl text-sm font-body focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body text-secondary dark:text-white mb-2">{t('contactPage.form.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-ivory dark:bg-charcoal text-secondary dark:text-white border border-stone/20 dark:border-white/10 rounded-xl text-sm font-body focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-primary text-secondary text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
                >
                  {t('contactPage.form.submit')}
                </button>
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-600 dark:text-green-400"
                  >
                    {t('contactPage.form.success')}
                  </motion.p>
                )}
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="font-display text-xl font-semibold text-secondary dark:text-white mb-6">
                  {t('contactPage.info')}
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <HiOutlineLocationMarker className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-secondary dark:text-white">{t('footer.address')}</p>
                      <p className="text-sm text-mist mt-0.5">{t('footer.address')}</p>
                    </div>
                  </div>
                  <a href="tel:+212539917200" className="flex items-start gap-4 group">
                    <HiOutlinePhone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-secondary dark:text-white group-hover:text-primary transition-colors">{t('footer.phone')}</p>
                      <p className="text-sm text-mist mt-0.5">{t('footer.phone')}</p>
                    </div>
                  </a>
                  <a href={`https://wa.me/${siteData.location.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                    <FaWhatsapp className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-secondary dark:text-white group-hover:text-primary transition-colors">{t('footer.whatsapp')}</p>
                      <p className="text-sm text-mist mt-0.5">{t('footer.whatsapp')}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <HiOutlineClock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-secondary dark:text-white">{t('footer.openingHours')}</p>
                      <div className="text-sm text-mist mt-1 space-y-1">
                        <p>{t('contactPage.hours.monTue')}</p>
                        <p>{t('contactPage.hours.wed')}</p>
                        <p>{t('contactPage.hours.thu')}</p>
                        <p>{t('contactPage.hours.fri')}</p>
                        <p>{t('contactPage.hours.sat')}</p>
                        <p>{t('contactPage.hours.sun')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${siteData.location.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span className="text-sm font-medium">{t('contactPage.whatsapp')}</span>
              </a>

              <div className="rounded-2xl overflow-hidden h-[200px]">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=&q=Asilah+Morocco`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('contactPage.mapTitle')}
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
