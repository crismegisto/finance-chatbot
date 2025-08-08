import { render, screen } from '@testing-library/react';
import ChatPage from '@/app/chat/page';
import '@testing-library/jest-dom';

describe('ChatPage', () => {
  it('renders FinanceBot header', () => {
    render(<ChatPage />);
    expect(screen.getByText('FinanceBot')).toBeInTheDocument();
  });

  it('shows login redirect if no user', () => {
    // Simulate no user in localStorage
    localStorage.removeItem('user');
    render(<ChatPage />);
    // Should not render anything (returns null)
    expect(screen.queryByText('FinanceBot')).not.toBeInTheDocument();
  });

  it('renders chat input', () => {
    // Simulate user in localStorage
    localStorage.setItem('user', JSON.stringify({ name: 'Test User', id: '1' }));
    render(<ChatPage />);
    expect(screen.getByPlaceholderText('Pregúntame sobre finanzas personales...')).toBeInTheDocument();
  });

  // Add more tests for sidebar, chat history, and message rendering as needed
});

// Example for another page
// import SomeOtherPage from '@/app/someother/page';
// describe('SomeOtherPage', () => {
//   it('renders correctly', () => {
//     render(<SomeOtherPage />);
//     expect(screen.getByText('Some Title')).toBeInTheDocument();
//   });
// });
