'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Optional callback invoked when an error is caught by the boundary. */
  onError?: (error: Error, componentStack: string | undefined) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: string
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, errorInfo: undefined }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('Error caught by boundary:', error, errorInfo)
    const componentStack = (errorInfo as { componentStack?: string })?.componentStack
    this.setState({ errorInfo: componentStack })
    this.props.onError?.(error, componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div role="alert" aria-live="assertive" className="glass-game rounded-2xl p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4 pixel-font">
              Something went wrong
            </h2>
            <p className="text-gray-400 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            {this.state.errorInfo && (
              <details className="text-left mb-6">
                <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-300">
                  Technical details
                </summary>
                <pre className="mt-2 p-3 bg-black/30 rounded-lg text-xs text-red-300 overflow-auto max-h-40">
                  {this.state.errorInfo}
                </pre>
              </details>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined, errorInfo: undefined })
                window.location.reload()
              }}
              type="button"
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-bold transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
