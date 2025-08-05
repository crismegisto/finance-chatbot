import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  it('handles value changes', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    await user.type(input, 'Hello World')
    
    expect(input).toHaveValue('Hello World')
  })

  it('can be disabled', () => {
    render(<Input disabled placeholder="Disabled input" />)
    const input = screen.getByPlaceholderText('Disabled input')
    expect(input).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Custom input" />)
    const input = screen.getByPlaceholderText('Custom input')
    expect(input).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Input ref={ref} placeholder="Ref input" />)
    expect(ref).toHaveBeenCalled()
  })

  it('handles controlled value', () => {
    render(<Input value="Controlled value" placeholder="Controlled input" />)
    const input = screen.getByPlaceholderText('Controlled input')
    expect(input).toHaveValue('Controlled value')
  })

  it('handles onChange events', async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(<Input onChange={handleChange} placeholder="Change input" />)
    
    const input = screen.getByPlaceholderText('Change input')
    await user.type(input, 'a')
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('supports different input types', () => {
    const { rerender } = render(<Input type="text" placeholder="Text input" />)
    let input = screen.getByPlaceholderText('Text input')
    expect(input).toHaveAttribute('type', 'text')

    rerender(<Input type="email" placeholder="Email input" />)
    input = screen.getByPlaceholderText('Email input')
    expect(input).toHaveAttribute('type', 'email')

    rerender(<Input type="password" placeholder="Password input" />)
    input = screen.getByPlaceholderText('Password input')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('supports required attribute', () => {
    render(<Input required placeholder="Required input" />)
    const input = screen.getByPlaceholderText('Required input')
    expect(input).toBeRequired()
  })

  it('supports name attribute', () => {
    render(<Input name="test-input" placeholder="Named input" />)
    const input = screen.getByPlaceholderText('Named input')
    expect(input).toHaveAttribute('name', 'test-input')
  })
}) 