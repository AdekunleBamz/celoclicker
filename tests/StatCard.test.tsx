import { render, screen } from '@testing-library/react'
import { StatCard } from '../components/StatCard'

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Score" value={100} />)
    expect(screen.getByText('Score')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    render(<StatCard label="Level" value={5} icon="⭐" />)
    expect(screen.getByText('⭐')).toBeInTheDocument()
  })

  it('applies custom value color', () => {
    render(<StatCard label="Points" value={500} valueColor="text-red-500" />)
    expect(screen.getByText('500')).toHaveClass('text-red-500')
  })

  it('applies custom className', () => {
    const { container } = render(<StatCard label="Test" value="Val" className="custom-card" />)
    expect(container.firstChild).toHaveClass('custom-card')
  })
})
