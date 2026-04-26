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

  it('floors non-integer count values', () => {
    const { container } = render(<StatSkeleton count={2.8} />)
    expect(container.querySelectorAll('.animate-pulse').length).toBe(6)
  })

  it('renders nothing for negative count values', () => {
    const { container } = render(<StatSkeleton count={-2} />)
    expect(container.querySelectorAll('.animate-pulse').length).toBe(0)
  })

  it('applies custom className', () => {
    const { container } = render(<StatSkeleton className="mb-5" />)
    expect(container.firstChild).toHaveClass('mb-5')
  })

  it('exposes loading semantics for assistive technology', () => {
    render(<StatSkeleton count={1} />)
    expect(screen.getByRole('status', { name: 'Loading statistics' })).toHaveAttribute('aria-busy', 'true')
  })

  it('can render without pulse animation when disabled', () => {
    const { container } = render(<StatSkeleton count={1} animated={false} />)
    expect(container.querySelectorAll('.animate-pulse').length).toBe(0)
  })

  it('renders one card element per requested count', () => {
    render(<StatSkeleton count={4} />)
    expect(screen.getAllByTestId('stat-skeleton-card')).toHaveLength(4)
  })

  it('applies skeleton card border styling', () => {
    render(<StatSkeleton count={1} />)
    expect(screen.getByTestId('stat-skeleton-card')).toHaveClass('border', 'border-white/10')
  })
})
