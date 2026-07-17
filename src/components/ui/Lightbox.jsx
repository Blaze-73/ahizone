import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineX, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineZoomIn, HiOutlineZoomOut } from 'react-icons/hi'
import { useState } from 'react'

export default function Lightbox({ images, index, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(index)
  const [zoomed, setZoomed] = useState(false)

  const current = images[currentIndex]

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setZoomed(false)
  }, [images.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setZoomed(false)
  }, [images.length])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] bg-black/95 flex items-center justify-center"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-white/70 hover:text-white transition-colors"
        >
          <HiOutlineX className="w-8 h-8" />
        </button>

        <button onClick={goPrev} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10">
          <HiOutlineChevronLeft className="w-8 h-8" />
        </button>

        <button onClick={goNext} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10">
          <HiOutlineChevronRight className="w-8 h-8" />
        </button>

        <button
          onClick={() => setZoomed(!zoomed)}
          className="absolute bottom-6 right-6 text-white/70 hover:text-white transition-colors z-10"
        >
          {zoomed ? <HiOutlineZoomOut className="w-6 h-6" /> : <HiOutlineZoomIn className="w-6 h-6" />}
        </button>

        <motion.img
          key={currentIndex}
          src={current?.src}
          alt={current?.alt}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: zoomed ? 1.8 : 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-[90vw] max-h-[90vh] object-contain cursor-pointer"
          onClick={() => setZoomed(!zoomed)}
        />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-body">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
