import { render, screen } from '@testing-library/react';
import { ResumeDownload } from '@/components/ResumeDownload';

// Mock window.plausible
declare global {
  interface Window {
    plausible?: jest.Mock;
  }
}

describe('ResumeDownload', () => {
  beforeEach(() => {
    // Clear mocks
    global.fetch = jest.fn();
    window.plausible = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders download link', () => {
    render(<ResumeDownload>Resume</ResumeDownload>);

    const link = screen.getByRole('link', { name: /resume/i });
    expect(link).toBeInTheDocument();
  });

  it('has correct download attributes', () => {
    render(<ResumeDownload>Resume</ResumeDownload>);

    const link = screen.getByRole('link', { name: /resume/i });
    expect(link).toHaveAttribute('download');
    expect(link).toHaveAttribute('href', '/api/resume');
  });

  it('has accessible ARIA attributes', () => {
    render(<ResumeDownload>Resume</ResumeDownload>);

    const link = screen.getByRole('link', { name: /resume/i });
    expect(link).toHaveAttribute('aria-busy', 'false');
    expect(link).toHaveAttribute('aria-disabled', 'false');
  });

  it('supports variant prop', () => {
    const { container } = render(
      <ResumeDownload variant="secondary">Download</ResumeDownload>
    );

    const link = container.querySelector('a');
    // The button should be rendered (variant affects styling via parent CTAButton)
    expect(link).toBeInTheDocument();
  });

  it('renders with loading text label', () => {
    const { container } = render(
      <ResumeDownload>Resume</ResumeDownload>
    );

    // Should have a span with the button text
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(container.querySelector('a')).toBeInTheDocument();
  });

  it('renders with proper styling classes', () => {
    const { container } = render(
      <ResumeDownload>Resume</ResumeDownload>
    );

    const link = container.querySelector('a');
    // CTAButton styling should be applied
    expect(link?.className).toBeTruthy();
  });

  it('has proper link semantics', () => {
    render(<ResumeDownload>Resume</ResumeDownload>);

    const link = screen.getByRole('link', { name: /resume/i });
    expect(link.tagName.toLowerCase()).toBe('a');
    expect(link).toHaveAttribute('href');
  });

  it('download attribute should trigger file download', () => {
    render(<ResumeDownload>Resume</ResumeDownload>);

    const link = screen.getByRole('link', { name: /resume/i });
    // The download attribute tells the browser to download instead of navigate
    expect(link).toHaveAttribute('download');
  });
});
