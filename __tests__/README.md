# Testing Setup

This project uses Jest with React Testing Library for comprehensive unit testing.

## Test Structure

```
__tests__/
├── api/                    # API route tests
│   ├── chat.test.ts       # Chat API tests
│   └── users/             # User API tests
│       ├── login.test.ts
│       └── register.test.ts
├── app/                    # Page component tests
│   ├── chat/
│   │   └── page.test.tsx
│   ├── register/
│   │   └── page.test.tsx
│   └── page.test.tsx
├── components/             # UI component tests
│   └── ui/
│       ├── button.test.tsx
│       ├── card.test.tsx
│       └── input.test.tsx
├── hooks/                  # Custom hook tests
│   └── use-mobile.test.ts
├── lib/                    # Utility function tests
│   └── utils.test.ts
├── mocks/                  # Mock service worker setup
│   ├── browser.ts
│   └── handlers.ts
├── setup.ts               # Test setup file
├── utils/                  # Utility tests
│   └── supabase.test.ts
└── README.md              # This file
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

## Test Categories

### API Tests
- **Chat API**: Tests for the chat endpoint that handles AI responses
- **Login API**: Tests for user authentication
- **Register API**: Tests for user registration
- **Logout API**: Tests for user logout

### Component Tests
- **UI Components**: Tests for reusable UI components (Button, Input, Card, etc.)
- **Page Components**: Tests for page-level components

### Hook Tests
- **Custom Hooks**: Tests for custom React hooks like `useMobile`

### Utility Tests
- **Utility Functions**: Tests for helper functions and utilities
- **Supabase Utils**: Tests for database utility functions

## Testing Patterns

### Component Testing
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByText('Expected text')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    render(<Component />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(screen.getByText('Updated text')).toBeInTheDocument()
  })
})
```

### API Testing
```typescript
import { POST } from '@/app/api/endpoint/route'
import { NextRequest } from 'next/server'

describe('/api/endpoint', () => {
  it('handles valid requests', async () => {
    const request = new NextRequest('http://localhost:3000/api/endpoint', {
      method: 'POST',
      body: JSON.stringify({ data: 'test' }),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
  })
})
```

### Mocking

#### API Mocking with MSW
```typescript
// In handlers.ts
http.post('/api/chat', async ({ request }) => {
  const { messages } = await request.json()
  return HttpResponse.json({
    id: 'mock-response',
    content: 'Mock response',
    role: 'assistant',
  })
})
```

#### Component Mocking
```typescript
// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}))

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true,
})
```

## Coverage

The test suite aims for comprehensive coverage including:
- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test User Interactions**: Use `userEvent` for realistic user interactions
4. **Mock External Dependencies**: Mock APIs, localStorage, and other external services
5. **Keep Tests Simple**: Each test should have a single responsibility
6. **Use Descriptive Names**: Test names should clearly describe what is being tested

## Debugging Tests

### Running Specific Tests
```bash
# Run a specific test file
npm test -- chat.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="login"

# Run tests in a specific directory
npm test -- __tests__/api/
```

### Debug Mode
```bash
# Run tests in debug mode
npm test -- --detectOpenHandles --forceExit
```

## Continuous Integration

The test suite is configured to run in CI environments with:
- Coverage reporting
- Fail-fast on errors
- No watch mode
- Strict linting rules 