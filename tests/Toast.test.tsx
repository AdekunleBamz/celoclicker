import { render, screen, act } from '@testing-library/react'
import { Toast } from '../components/Toast'
import { SUCCESS_TOAST_DURATION_MS } from '@/lib/constants'

jest.useFakeTimers()

describe('Toast', () => {
  it('renders when visible', () => {
    render(<Toast message="Success!" isVisible={true} onClose={() => {}} />)
    expect(screen.getByText('Success!')).toBeInTheDocument()
    expect(screen.getByText('✅')).toBeInTheDocument()
  })

  it('does not render when not visible', () => {
    render(<Toast message="Hidden" isVisible={false} onClose={() => {}} />)
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('calls onClose after duration', () => {
    const onClose = jest.fn()
    render(<Toast message="Wait" isVisible={true} onClose={onClose} />)
    
    act(() => {
      jest.advanceTimersByTime(SUCCESS_TOAST_DURATION_MS)
    })
    
    expect(onClose).toHaveBeenCalled()
  })

  it('renders different types correctly', () => {
    const { rerender } = render(<Toast message="Error" isVisible={true} onClose={() => {}} type="error" />)
    expect(screen.getByText('❌')).toBeInTheDocument()
    
    rerender(<Toast message="Info" isVisible={true} onClose={() => {}} type="info" />)
    expect(screen.getByText('ℹ️')).toBeInTheDocument()
  })
})
