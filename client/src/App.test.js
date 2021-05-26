import { render, screen } from '@testing-library/react';
import App from './App';

test('renders codeswitch', () => {
  render(<App />);
  const linkElement = screen.getByText(/codeswitch/i);
  expect(linkElement).toBeInTheDocument();
});
