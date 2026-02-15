import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Component that throws an error for testing
function ThrowError() {
  throw new Error('Test error');
}

describe('ErrorBoundary', () => {
  const originalError = console.error;

  beforeEach(() => {
    // Suppress console.error during tests
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders fallback UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('displays error details in development', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    // In development, error details should be shown
    const errorDetailsButton = screen.queryByText(/error details/i);
    expect(errorDetailsButton).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('has a button to reload the page', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const reloadLink = screen.getByRole('link', { name: /refresh page/i });
    expect(reloadLink).toBeInTheDocument();
  });

  it('renders navigation links for error recovery', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const homepageLink = screen.getByRole('link', { name: /go to homepage/i });
    const refreshLink = screen.getByRole('link', { name: /refresh page/i });

    expect(homepageLink).toBeInTheDocument();
    expect(refreshLink).toBeInTheDocument();
    expect(homepageLink).toHaveAttribute('href', '/');
  });
});
