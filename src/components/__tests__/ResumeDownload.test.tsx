import { render, screen } from '@testing-library/react';
import { ResumeDownload } from '@/components/ResumeDownload';

describe('ResumeDownload', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders download link', () => {
    render(<ResumeDownload>View Resume</ResumeDownload>);

    const link = screen.getByRole('link', { name: /view resume/i });
    expect(link).toBeInTheDocument();
  });

  it('has correct link attributes', () => {
    render(<ResumeDownload>View Resume</ResumeDownload>);

    const link = screen.getByRole('link', { name: /view resume/i });
    expect(link).not.toHaveAttribute('download');
    expect(link).toHaveAttribute('href', '/resume.html');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    // Ensure the plausible tracking class is present
    expect(link.className).toContain('plausible-event-name=Resume+Download');
  });

  it('supports variant prop', () => {
    const { container } = render(
      <ResumeDownload variant="secondary">View</ResumeDownload>
    );

    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
  });

  it('renders with correct text label', () => {
    const { container } = render(
      <ResumeDownload>View Resume</ResumeDownload>
    );

    expect(screen.getByText('View Resume')).toBeInTheDocument();
    expect(container.querySelector('a')).toBeInTheDocument();
  });

  it('renders with proper styling classes', () => {
    const { container } = render(
      <ResumeDownload>View Resume</ResumeDownload>
    );

    const link = container.querySelector('a');
    expect(link?.className).toBeTruthy();
  });

  it('has proper link semantics', () => {
    render(<ResumeDownload>View Resume</ResumeDownload>);

    const link = screen.getByRole('link', { name: /view resume/i });
    expect(link.tagName.toLowerCase()).toBe('a');
    expect(link).toHaveAttribute('href');
  });
});
