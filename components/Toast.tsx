import { motion, AnimatePresence } from 'framer-motion'
import { memo, useEffect } from 'react'
import { SUCCESS_TOAST_DURATION_MS, ERROR_TOAST_DURATION_MS } from '@/lib/constants'

/** Props for the Toast component. */
export interface ToastProps {
  /** The message to display in the toast. */
  message: string
  /** Whether the toast is currently visible. */
  isVisible: boolean
  /** Callback function to close the toast. */
  onClose: () => void
  /** Optional type of toast (defaults to success). */
  type?: 'success' | 'error' | 'info'
}

/**
 * Reusable animated Toast notification component.
 * Automatically dismisses after a set duration.
 */
export const Toast = memo(function Toast({ 
  message, 
  isVisible, 
  onClose,
  type = 'success' 
}: ToastProps) {
  useEffect(() => {
    if (!isVisible) return
    const duration = type === 'error' ? ERROR_TOAST_DURATION_MS : SUCCESS_TOAST_DURATION_MS
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [isVisible, onClose, type])

  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'
  const bgColor = type === 'success' ? 'bg-celo-green/90' : type === 'error' ? 'bg-red-500/90' : 'bg-indigo-600/90'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          role="status"
          aria-live="polite"
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 ${bgColor} text-white rounded-full font-bold shadow-lg backdrop-blur-md border border-white/20 flex items-center gap-2`}
        >
          <span>{icon}</span>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

Toast.displayName = 'Toast'
