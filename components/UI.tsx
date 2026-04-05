import { ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  glass?: boolean
}

export function Card({ children, className = '', glass = false }: CardProps) {
  const baseClasses = glass ? 'glass-game' : 'bg-black/30'
  return (
    <div className={`${baseClasses} rounded-lg p-4 ${className}`}>
      {children}
    </div>
  )
}

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost'
  fullWidth?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-indigo-500 glow-purple',
    secondary: 'bg-gradient-to-r from-celo-green to-celo-gold glow-green',
    accent: 'bg-gradient-to-r from-purple-500 to-pink-500 glow-purple',
    ghost: 'bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${fullWidth ? 'w-full' : ''}
        ${variantClasses[variant]}
        py-3 px-6 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
}
