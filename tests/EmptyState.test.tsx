import { render, screen, fireEvent } from '@testing-library/react'
import { EmptyState } from '../components/EmptyState'

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState title="No Data" description="Check back later" />)
    expect(screen.getByText('No Data')).toBeInTheDocument()
    expect(screen.getByText('Check back later')).toBeInTheDocument()
  })

  it('renders default icon when not provided', () => {
    render(<EmptyState title="T" description="D" />)
    expect(screen.getByText('📭')).toBeInTheDocument()
  })

  it('renders custom icon when provided', () => {
    render(<EmptyState title="T" description="D" icon="🔍" />)
    expect(screen.getByText('🔍')).toBeInTheDocument()
  })

  it('renders action button and handles clicks', () => {
    const onAction = jest.fn()
    render(<EmptyState title="T" description="D" onAction={onAction} actionLabel="Reload" />)
    
    const button = screen.getByText('Reload')
    fireEvent.click(button)
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<EmptyState title="T" description="D" className="mt-10" />)
    expect(screen.getByRole('region')).toHaveClass('mt-10')
  })
})
