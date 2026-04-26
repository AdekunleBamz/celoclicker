import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../components/UI'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('applies primary variant by default', () => {
    const { container } = render(<Button>Test</Button>)
    expect(container.firstChild).toHaveClass('from-purple-500', 'to-indigo-500')
  })

  it('applies secondary variant', () => {
    const { container } = render(<Button variant="secondary">Test</Button>)
    expect(container.firstChild).toHaveClass('from-celo-green', 'to-celo-gold')
  })

  it('applies fullWidth class', () => {
    const { container } = render(<Button fullWidth>Test</Button>)
    expect(container.firstChild).toHaveClass('w-full')
  })

  it('handles click events', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click Me</Button>)
    fireEvent.click(screen.getByText('Click Me'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('passes disabled prop', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByText('Disabled').closest('button')).toBeDisabled()
  })

  it('defaults button type to "button"', () => {
    render(<Button>Type Check</Button>)
    expect(screen.getByRole('button', { name: 'Type Check' })).toHaveAttribute('type', 'button')
  })
})
