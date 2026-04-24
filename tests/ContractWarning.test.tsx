import { render, screen } from '@testing-library/react'
import { ContractWarning } from '../components/ContractWarning'
import { useContractConfig } from '@/hooks/useContractConfig'
import { CONTRACT_ADDRESS_ENV_KEY } from '@/lib/constants'

jest.mock('@/hooks/useContractConfig', () => ({
  useContractConfig: jest.fn()
}))

describe('ContractWarning', () => {
  it('renders nothing when contract is valid', () => {
    ;(useContractConfig as jest.Mock).mockReturnValue({ isValid: true })
    const { container } = render(<ContractWarning />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders warning when contract is invalid', () => {
    ;(useContractConfig as jest.Mock).mockReturnValue({ isValid: false })
    render(<ContractWarning />)
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Contract Not Configured')).toBeInTheDocument()
    expect(screen.getByText(new RegExp(CONTRACT_ADDRESS_ENV_KEY))).toBeInTheDocument()
  })
})
