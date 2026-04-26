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
  /** Whether the error message was copied to clipboard. */
  copied?: boolean
  /** Whether copying the message failed. */
  copyFailed?: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, copied: false, copyFailed: false }
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
        <div className="min-h-screen flex items-center justify-center p-4">
          <div role="alert" aria-labelledby="app-error-title" aria-describedby="app-error-description" className="glass-game rounded-2xl p-8 max-w-md w-full text-center">
            <h2 id="app-error-title" className="text-2xl font-bold text-red-400 mb-4 pixel-font">
              System Failure
            </h2>
            <p id="app-error-description" className="text-gray-400 mb-6">
              {this.state.error?.message || 'An unexpected error occurred during execution.'}
            </p>
            <p className="text-xs text-gray-500 mb-6">
              Try rebooting first. If this keeps happening, copy the error message and share it with the maintainer.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined, copied: false })
                  window.location.reload()
                }}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-bold transition-colors w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-celo-green/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                type="button"
                aria-label="Reboot the application"
              >
                Reboot Application
              </button>
              {this.state.error && (
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard?.writeText(this.state.error!.message)
                      this.setState({ copied: true, copyFailed: false })
                    } catch {
                      this.setState({ copied: false, copyFailed: true })
                    }
                  }}
                  type="button"
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-colors w-full text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-celo-green/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                >
                  {this.state.copyFailed ? 'Copy Failed' : this.state.copied ? 'Copied Error Message' : 'Copy Error Message'}
                </button>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
