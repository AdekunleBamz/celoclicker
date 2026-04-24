import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from '../components/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default label', () => {
    render(<LoadingSpinner />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading')
  })

  it('renders with custom label', () => {
    render(<LoadingSpinner label="Fetching data" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Fetching data')
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    expect(screen.getByRole('status')).toHaveClass('w-4 h-4')

    rerender(<LoadingSpinner size="lg" />)
    expect(screen.getByRole('status')).toHaveClass('w-12 h-12')
  })
})
