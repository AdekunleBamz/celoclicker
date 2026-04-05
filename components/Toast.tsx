import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-indigo-600/90 text-white rounded-full font-bold shadow-lg backdrop-blur-md border border-white/20 flex items-center gap-2"
        >
          <span>✅</span>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
