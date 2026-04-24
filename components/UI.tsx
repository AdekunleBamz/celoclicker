import { ReactNode, memo } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

/** Props for the Card component. */
interface CardProps {
  /** The content of the card. */
  children: ReactNode
  /** Additional CSS classes. */
  className?: string
  /** Whether to apply glassmorphism effect. */
  glass?: boolean
}

/**
 * Reusable Card component with optional glassmorphism effect.
 */
export const Card = memo(function Card({ children, className = '', glass = false }: CardProps) {
  const baseClasses = glass ? 'glass-game' : 'bg-black/30'
  return (
    <div className={`${baseClasses} rounded-lg p-4 ${className}`}>
      {children}
    </div>
  )
})

/** Props for the Button component. */
interface ButtonProps extends HTMLMotionProps<'button'> {
  /** Visual variant of the button. */
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost'
  /** Whether the button should take up the full width of its container. */
  fullWidth?: boolean
}

/**
 * Reusable animated Button component with multiple variants.
 */
export const Button = memo(function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-indigo-500 glow-purple',
    secondary: 'bg-gradient-to-r from-celo-green to-celo-gold glow-green text-black',
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
})

/** Props for the Badge component. */
interface BadgeProps {
  /** The text to display in the badge. */
  children: ReactNode
  /** Visual variant of the badge. */
  variant?: 'success' | 'warning' | 'info' | 'purple'
  /** Additional CSS classes. */
  className?: string
}

/**
 * Small status badge component.
 */
export const Badge = memo(function Badge({ 
  children, 
  variant = 'info',
  className = '' 
}: BadgeProps) {
  const variants = {
    success: 'bg-celo-green/20 text-celo-green border-celo-green/30',
    warning: 'bg-celo-gold/20 text-celo-gold border-celo-gold/30',
    info: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  }

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
})
