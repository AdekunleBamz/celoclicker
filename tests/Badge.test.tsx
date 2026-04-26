import { render, screen } from '@testing-library/react'
import { Badge } from '../components/UI'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies info variant by default', () => {
    const { container } = render(<Badge>Info</Badge>)
    expect(container.firstChild).toHaveClass('bg-indigo-500/20', 'text-indigo-400')
  })

  it('applies success variant', () => {
    const { container } = render(<Badge variant="success">Success</Badge>)
    expect(container.firstChild).toHaveClass('bg-celo-green/20', 'text-celo-green')
  })

  it('applies custom className', () => {
    const { container } = render(<Badge className="test-badge">Custom</Badge>)
    expect(container.firstChild).toHaveClass('test-badge')
  })

  it('supports an explicit aria label', () => {
    render(<Badge ariaLabel="Network status badge">Online</Badge>)
    expect(screen.getByLabelText('Network status badge')).toBeInTheDocument()
  })
})
