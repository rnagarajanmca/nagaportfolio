import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScrollToTop } from '@/components/ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    // Reset scroll position
    window.scrollY = 0;
  });

  it('does not render when at top of page', () => {
    const { container } = render(<ScrollToTop />);

    // Component returns null when not scrolled
    expect(container.firstChild).toBeNull();
  });

  it('renders button element when scrolled down', () => {
    const { rerender, container } = render(<ScrollToTop />);

    // Initially not visible (scroll at 0)
    expect(container.querySelector('button')).not.toBeInTheDocument();

    // Simulate scroll down
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 500,
    });
    window.dispatchEvent(new Event('scroll'));

    rerender(<ScrollToTop />);

    // Button should now be in document
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('has proper button attributes', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { rerender, container } = render(<ScrollToTop />);
    window.dispatchEvent(new Event('scroll'));
    rerender(<ScrollToTop />);

    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-label', 'Scroll to top');
  });

  it('has accessible ARIA label when visible', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { rerender } = render(<ScrollToTop />);
    window.dispatchEvent(new Event('scroll'));
    rerender(<ScrollToTop />);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toBeInTheDocument();
  });

  it('calls scrollTo when clicked', async () => {
    const user = userEvent.setup();
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { rerender } = render(<ScrollToTop />);
    window.dispatchEvent(new Event('scroll'));
    rerender(<ScrollToTop />);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    await user.click(button);

    // Should call scrollTo with smooth behavior
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('removes scroll listener on unmount', () => {
    const removeEventListenerMock = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ScrollToTop />);
    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerMock.mockRestore();
  });

  it('adds scroll listener on mount', () => {
    const addEventListenerMock = jest.spyOn(window, 'addEventListener');

    render(<ScrollToTop />);

    expect(addEventListenerMock).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
    addEventListenerMock.mockRestore();
  });

  it('returns null when not visible', () => {
    const { container } = render(<ScrollToTop />);

    // At scroll position 0, component should return null
    expect(container.firstChild).toBeNull();
  });
});
