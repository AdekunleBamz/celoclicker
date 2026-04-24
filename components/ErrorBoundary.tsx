'use client'

import { Component, ReactNode } from 'react'

/** Props for the ErrorBoundary component. */
export interface ErrorBoundaryProps {
  /** The children components to be wrapped by the boundary. */
  children: ReactNode
}

/** State for the ErrorBoundary component. */
export interface ErrorBoundaryState {
  /** Whether an error has been caught. */
  hasError: boolean
  /** The error object caught by the boundary. */
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  /**
   * Catch errors and update state to trigger fallback UI.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  /**
   * Log caught errors for debugging.
   */
  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#081118]">
          <div 
            role="alert" 
            aria-live="assertive"
            className="glass-game rounded-2xl p-8 max-w-md w-full text-center"
          >
            <h2 className="text-2xl font-bold text-red-400 mb-4 pixel-font">
              System Failure
            </h2>
            <p className="text-gray-400 mb-6">
              {this.state.error?.message || 'An unexpected error occurred during execution.'}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined })
                  window.location.reload()
                }}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-bold transition-colors w-full"
                type="button"
                aria-label="Reboot the application"
              >
                Reboot Application
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
