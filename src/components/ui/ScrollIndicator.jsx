import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function ScrollIndicator() {
  const { t } = useTranslation()

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="text-xs font-body tracking-widest text-white/60 uppercase">
        {t('common.scrollDown')}
      </span>
      <motion.div
        className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
        animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
