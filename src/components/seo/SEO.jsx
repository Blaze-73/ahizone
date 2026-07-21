import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const SITE_URL = 'https://ahizoune.art'
const DEFAULT_IMAGE = '/images/og-default.jpg'
const LOCALES = { ar: 'ar_SA', en: 'en_US', fr: 'fr_FR', es: 'es_ES' }

export default function SEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  path = '',
  type = 'website',
  publishedTime,
}) {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const url = `${SITE_URL}${path}`
  const fullTitle = title ? `${title} | أحيزون` : 'أحيزون — فن الخط العربي، أصيلة'

  return (
    <Helmet>
      <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={LOCALES[lang] || LOCALES.ar} />
      <meta property="og:site_name" content="أحيزون" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />
      <meta name="twitter:creator" content="@ahizoune_art" />

      {/* Hreflang — all point to same URL since language switching is client-side */}
      {Object.keys(LOCALES).map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`${SITE_URL}${path}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      {/* WebSite JSON-LD — homepage only */}
      {path === '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'أحيزون',
            url: SITE_URL,
            inLanguage: ['ar', 'en', 'fr', 'es'],
            description: 'أحيزون — فن الخط العربي، أصيلة، المغرب',
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/gallery?q={search_term_string}` },
              'query-input': 'required name=search_term_string',
            },
          })}
        </script>
      )}

      {/* Person JSON-LD — homepage only */}
      {path === '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'عبد الرحيم أحيزون',
            givenName: 'Abderrahim Ahizoune',
            jobTitle: 'فنان خط عربي',
            description: 'فنان خط عربي من مدينة أصيلة، المغرب، متخصص في فن الخط العربي والبورتريهات وتعليم الفنون.',
            url: SITE_URL,
            address: { '@type': 'PostalAddress', addressLocality: 'أصيلة', addressCountry: 'المغرب' },
          })}
        </script>
      )}
    </Helmet>
  )
}
