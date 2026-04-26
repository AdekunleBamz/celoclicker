import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContractWarning } from '../components/ContractWarning'
import { useContractConfig } from '@/hooks/useContractConfig'
import { CONTRACT_ADDRESS_ENV_KEY } from '@/lib/constants'

vi.mock('@/hooks/useContractConfig', () => ({
  useContractConfig: vi.fn()
}))

beforeEach(() => {
  vi.clearAllMocks()
})

const mockedUseContractConfig = vi.mocked(useContractConfig)

describe('ContractWarning', () => {
  it('renders nothing when contract is valid', () => {
    mockedUseContractConfig.mockReturnValue({ isValid: true } as never)
    const { container } = render(<ContractWarning />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders warning when contract is invalid', () => {
    mockedUseContractConfig.mockReturnValue({ isValid: false } as never)
    render(<ContractWarning />)
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Contract Not Configured')).toBeInTheDocument()
    expect(screen.getByText(new RegExp(CONTRACT_ADDRESS_ENV_KEY))).toBeInTheDocument()
  })
})
