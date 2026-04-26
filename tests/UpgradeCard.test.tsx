import { beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { UpgradeCard } from '../components/UpgradeCard'

describe('UpgradeCard', () => {
  const defaultProps = {
    title: 'Test Upgrade',
    currentLevel: 1,
    cost: 100n,
    points: 500n,
    color: 'text-purple-400',
    onUpgrade: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders title, level, and cost', () => {
    render(<UpgradeCard {...defaultProps} />)
    expect(screen.getByText('Test Upgrade')).toBeInTheDocument()
    expect(screen.getByText('Level 1')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('handles upgrade click when affordable', () => {
    render(<UpgradeCard {...defaultProps} />)
    const button = screen.getByRole('button', { name: /Upgrade Test Upgrade/i })
    
    expect(button).not.toBeDisabled()
    fireEvent.click(button)
    expect(defaultProps.onUpgrade).toHaveBeenCalledTimes(1)
  })

  it('disables button when disabled prop is true', () => {
    render(<UpgradeCard {...defaultProps} disabled />)
    const button = screen.getByRole('button', { name: /Upgrade Test Upgrade/i })
    expect(button).toBeDisabled()
  })

  it('shows loading state', () => {
    render(<UpgradeCard {...defaultProps} isLoading />)
    const button = screen.getByRole('button', { name: /Upgrade Test Upgrade/i })
    expect(button).toBeDisabled()
    expect(screen.getByText('PROCESSING')).toBeInTheDocument()
  })

  it('calls onInsufficientFunds when clicked without enough points', () => {
    const onInsufficientFunds = vi.fn()
    render(<UpgradeCard {...defaultProps} points={50n} onInsufficientFunds={onInsufficientFunds} />)
    
    const button = screen.getByRole('button', { name: /Upgrade Test Upgrade/i })
    fireEvent.click(button)
    
    expect(defaultProps.onUpgrade).not.toHaveBeenCalled()
    expect(onInsufficientFunds).toHaveBeenCalledTimes(1)
  })
})
