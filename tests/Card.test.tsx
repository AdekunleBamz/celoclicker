import { render, screen } from '@testing-library/react'
import { Card } from '../components/UI'

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    )
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('applies default classes', () => {
    const { container } = render(<Card>Test</Card>)
    expect(container.firstChild).toHaveClass('bg-black/30', 'rounded-lg', 'p-4')
  })

  it('applies glass class when prop is true', () => {
    const { container } = render(<Card glass>Test</Card>)
    expect(container.firstChild).toHaveClass('glass-game')
    expect(container.firstChild).not.toHaveClass('bg-black/30')
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="my-custom-class">Test</Card>)
    expect(container.firstChild).toHaveClass('my-custom-class')
  })
})
