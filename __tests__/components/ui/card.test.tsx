import { render, screen } from '@testing-library/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default props', () => {
      render(<Card>Card content</Card>)
      const card = screen.getByText('Card content')
      expect(card).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<Card className="custom-class">Card content</Card>)
      const card = screen.getByText('Card content').closest('div')
      expect(card).toHaveClass('custom-class')
    })

    it('forwards ref correctly', () => {
      const ref = jest.fn()
      render(<Card ref={ref}>Card content</Card>)
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('CardHeader', () => {
    it('renders with children', () => {
      render(
        <Card>
          <CardHeader>Header content</CardHeader>
        </Card>
      )
      expect(screen.getByText('Header content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <Card>
          <CardHeader className="custom-header">Header content</CardHeader>
        </Card>
      )
      const header = screen.getByText('Header content').closest('div')
      expect(header).toHaveClass('custom-header')
    })
  })

  describe('CardTitle', () => {
    it('renders with children', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>
      )
      expect(screen.getByText('Card Title')).toBeInTheDocument()
    })

    it('renders as div by default', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>
      )
      const title = screen.getByText('Card Title')
      expect(title.tagName).toBe('DIV')
    })

    it('applies custom className', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle className="custom-title">Card Title</CardTitle>
          </CardHeader>
        </Card>
      )
      const title = screen.getByText('Card Title')
      expect(title).toHaveClass('custom-title')
    })
  })

  describe('CardDescription', () => {
    it('renders with children', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>
      )
      expect(screen.getByText('Card Description')).toBeInTheDocument()
    })

    it('renders as div by default', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>
      )
      const description = screen.getByText('Card Description')
      expect(description.tagName).toBe('DIV')
    })

    it('applies custom className', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription className="custom-description">Card Description</CardDescription>
          </CardHeader>
        </Card>
      )
      const description = screen.getByText('Card Description')
      expect(description).toHaveClass('custom-description')
    })
  })

  describe('CardContent', () => {
    it('renders with children', () => {
      render(
        <Card>
          <CardContent>Content here</CardContent>
        </Card>
      )
      expect(screen.getByText('Content here')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <Card>
          <CardContent className="custom-content">Content here</CardContent>
        </Card>
      )
      const content = screen.getByText('Content here').closest('div')
      expect(content).toHaveClass('custom-content')
    })
  })

  describe('CardFooter', () => {
    it('renders with children', () => {
      render(
        <Card>
          <CardFooter>Footer content</CardFooter>
        </Card>
      )
      expect(screen.getByText('Footer content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <Card>
          <CardFooter className="custom-footer">Footer content</CardFooter>
        </Card>
      )
      const footer = screen.getByText('Footer content').closest('div')
      expect(footer).toHaveClass('custom-footer')
    })
  })

  describe('Complete Card Structure', () => {
    it('renders a complete card with all components', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      )

      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
      expect(screen.getByText('Test Footer')).toBeInTheDocument()
    })

    it('maintains proper semantic structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      )

      const title = screen.getByText('Test Title')
      const description = screen.getByText('Test Description')
      const content = screen.getByText('Test Content')
      const footer = screen.getByText('Test Footer')

      expect(title.tagName).toBe('DIV')
      expect(description.tagName).toBe('DIV')
      expect(content.tagName).toBe('DIV')
      expect(footer.tagName).toBe('DIV')
    })
  })
}) 