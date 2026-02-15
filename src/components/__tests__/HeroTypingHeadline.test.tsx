import { render, screen } from '@testing-library/react';
import { HeroTypingHeadline } from '@/components/HeroTypingHeadline';

describe('HeroTypingHeadline', () => {
  it('renders with phrases provided', () => {
    const phrases = ['React Developer', 'Full Stack Engineer'];
    const { container } = render(<HeroTypingHeadline phrases={phrases} />);

    // Should render the component with aria-live for announcements
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });

  it('renders focus areas label', () => {
    const phrases = ['Developer'];
    render(<HeroTypingHeadline phrases={phrases} />);

    expect(screen.getByText('Focus areas')).toBeInTheDocument();
  });

  it('displays typing cursor', () => {
    const phrases = ['Test'];
    const { container } = render(<HeroTypingHeadline phrases={phrases} />);

    const cursor = container.querySelector('.typing-cursor');
    expect(cursor).toBeInTheDocument();
    expect(cursor).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with styled icon', () => {
    const phrases = ['Engineer'];
    const { container } = render(<HeroTypingHeadline phrases={phrases} />);

    const iconSpan = container.querySelector('.inline-flex.h-9.w-9');
    expect(iconSpan).toBeInTheDocument();
    expect(iconSpan).toHaveAttribute('aria-hidden', 'true');
  });

  it('returns null when phrases array is empty', () => {
    const { container } = render(<HeroTypingHeadline phrases={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it('filters out empty/whitespace phrases', () => {
    const phrases = ['', '   ', 'Valid Phrase', '  '];
    const { container } = render(<HeroTypingHeadline phrases={phrases} />);

    // Should still render since there's a valid phrase
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const phrases = ['Test'];
    const { container } = render(
      <HeroTypingHeadline phrases={phrases} className="custom-class" />
    );

    const mainDiv = container.querySelector('[aria-live="polite"]');
    expect(mainDiv).toHaveClass('custom-class');
  });

  it('has proper ARIA attributes for accessibility', () => {
    const phrases = ['Accessible'];
    const { container } = render(<HeroTypingHeadline phrases={phrases} />);

    const mainDiv = container.querySelector('[aria-live="polite"]');
    expect(mainDiv).toHaveAttribute('aria-live', 'polite');
    expect(mainDiv).toHaveAttribute('aria-atomic', 'true');

    const icon = container.querySelector('[aria-hidden="true"]');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with responsive layout structure', () => {
    const phrases = ['Developer'];
    const { container } = render(<HeroTypingHeadline phrases={phrases} />);

    const textContainer = container.querySelector('.flex.flex-col');
    expect(textContainer).toBeInTheDocument();

    // Should have label and display area
    const spans = textContainer?.querySelectorAll('span');
    expect(spans?.length).toBeGreaterThan(1);
  });

  it('accepts custom timing delay props', () => {
    const phrases = ['Performance'];
    const { container } = render(
      <HeroTypingHeadline
        phrases={phrases}
        typingDelay={100}
        deletingDelay={50}
        holdDelay={2000}
      />
    );

    // Component should render successfully with custom delays
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });

  it('handles single phrase correctly', () => {
    const phrases = ['Solo Phrase'];
    const { container } = render(<HeroTypingHeadline phrases={phrases} />);

    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();

    // Focus areas text should be visible
    expect(screen.getByText('Focus areas')).toBeInTheDocument();
  });
});
