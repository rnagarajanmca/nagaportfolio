import { render, screen, fireEvent } from '@testing-library/react';
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
    window.plausible = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders download link', () => {
    render(<ResumeDownload>Download Resume</ResumeDownload>);

    const link = screen.getByRole('link', { name: /download resume/i });
    expect(link).toBeInTheDocument();
  });

  it('has correct link attributes', () => {
    render(<ResumeDownload>Download Resume</ResumeDownload>);

    const link = screen.getByRole('link', { name: /download resume/i });
    expect(link).not.toHaveAttribute('download');
    expect(link).toHaveAttribute('href', '/resume.html');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('supports variant prop', () => {
    const { container } = render(
      <ResumeDownload variant="secondary">Download</ResumeDownload>
    );

    const link = container.querySelector('a');
    // The button should be rendered (variant affects styling via parent CTAButton)
    expect(link).toBeInTheDocument();
  });

  it('renders with correct text label', () => {
    const { container } = render(
      <ResumeDownload>Download Resume</ResumeDownload>
    );

    expect(screen.getByText('Download Resume')).toBeInTheDocument();
    expect(container.querySelector('a')).toBeInTheDocument();
  });

  it('renders with proper styling classes', () => {
    const { container } = render(
      <ResumeDownload>Download Resume</ResumeDownload>
    );

    const link = container.querySelector('a');
    // CTAButton styling should be applied
    expect(link?.className).toBeTruthy();
  });

  it('has proper link semantics', () => {
    render(<ResumeDownload>Download Resume</ResumeDownload>);

    const link = screen.getByRole('link', { name: /download resume/i });
    expect(link.tagName.toLowerCase()).toBe('a');
    expect(link).toHaveAttribute('href');
  });

  it('triggers plausible event on click', () => {
    render(<ResumeDownload>Download Resume</ResumeDownload>);
    const link = screen.getByRole('link', { name: /download resume/i });
    
    fireEvent.click(link);
    
    expect(window.plausible).toHaveBeenCalledWith('Resume Download', expect.any(Object));
  });
});
