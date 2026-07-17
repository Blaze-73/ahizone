import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <section className="min-h-screen flex items-center justify-center bg-ivory dark:bg-charcoal">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-9xl font-bold text-primary">404</h1>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-secondary dark:text-white">
            {t('common.pageNotFound')}
          </h2>
          <p className="mt-4 text-stone dark:text-mist max-w-md mx-auto">
            {t('common.notFoundDescription')}
          </p>
          <div className="mt-10">
            <Button to="/" variant="primary">{t('common.backToHome')}</Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
