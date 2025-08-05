import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>)
    let button = screen.getByRole('button', { name: 'Delete' })
    expect(button).toBeInTheDocument()

    rerender(<Button variant="outline">Outline</Button>)
    button = screen.getByRole('button', { name: 'Outline' })
    expect(button).toBeInTheDocument()

    rerender(<Button variant="secondary">Secondary</Button>)
    button = screen.getByRole('button', { name: 'Secondary' })
    expect(button).toBeInTheDocument()

    rerender(<Button variant="ghost">Ghost</Button>)
    button = screen.getByRole('button', { name: 'Ghost' })
    expect(button).toBeInTheDocument()

    rerender(<Button variant="link">Link</Button>)
    button = screen.getByRole('button', { name: 'Link' })
    expect(button).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="default">Default</Button>)
    let button = screen.getByRole('button', { name: 'Default' })
    expect(button).toBeInTheDocument()

    rerender(<Button size="sm">Small</Button>)
    button = screen.getByRole('button', { name: 'Small' })
    expect(button).toBeInTheDocument()

    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole('button', { name: 'Large' })
    expect(button).toBeInTheDocument()

    rerender(<Button size="icon">Icon</Button>)
    button = screen.getByRole('button', { name: 'Icon' })
    expect(button).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button', { name: 'Click me' })
    button.click()
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: 'Disabled' })
    expect(button).toBeDisabled()
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Button ref={ref}>Ref Button</Button>)
    expect(ref).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button', { name: 'Custom' })
    expect(button).toHaveClass('custom-class')
  })

  it('renders as different HTML elements', () => {
    render(<Button asChild><a href="/test">Link Button</a></Button>)
    const link = screen.getByRole('link', { name: 'Link Button' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })
}) 