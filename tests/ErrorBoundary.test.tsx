import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '../components/ErrorBoundary'

const ThrowError = () => {
  throw new Error('Test Error')
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders fallback UI when an error occurs', () => {
    // Suppress console.error for this test as it's expected
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('System Failure')).toBeInTheDocument()
    expect(screen.getByText('Test Error')).toBeInTheDocument()
    
    spy.mockRestore()
  })
})
