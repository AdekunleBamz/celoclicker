import { render, screen } from '@testing-library/react'
import { StatSkeleton } from '../components/StatSkeleton'

describe('StatSkeleton', () => {
  it('renders a single skeleton by default', () => {
    const { container } = render(<StatSkeleton />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    // Each skeleton card has 3 pulsing elements
    expect(skeletons.length).toBe(3)
  })

  it('renders multiple skeletons when count is provided', () => {
    const { container } = render(<StatSkeleton count={3} />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBe(9)
  })

  it('applies custom className', () => {
    const { container } = render(<StatSkeleton className="mb-5" />)
    expect(container.firstChild).toHaveClass('mb-5')
  })

  it('exposes loading semantics for assistive technology', () => {
    render(<StatSkeleton count={1} />)
    expect(screen.getByRole('status', { name: 'Loading statistics' })).toHaveAttribute('aria-busy', 'true')
  })
})
