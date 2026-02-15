import { render, screen } from '@testing-library/react';
import { TimelineItem } from '@/components/TimelineItem';

const mockExperience = {
  title: 'Software Engineer',
  subtitle: 'Tech Corp',
  meta: 'San Francisco, CA · Jan 2020 - Present',
  badges: ['React', 'TypeScript'],
};

describe('TimelineItem', () => {
  it('renders job title', () => {
    render(
      <TimelineItem
        title={mockExperience.title}
        subtitle={mockExperience.subtitle}
        meta={mockExperience.meta}
        badges={mockExperience.badges}
      />
    );

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders company name (subtitle)', () => {
    render(
      <TimelineItem
        title={mockExperience.title}
        subtitle={mockExperience.subtitle}
        meta={mockExperience.meta}
      />
    );

    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('renders metadata with location and date', () => {
    render(
      <TimelineItem
        title={mockExperience.title}
        subtitle={mockExperience.subtitle}
        meta={mockExperience.meta}
      />
    );

    expect(screen.getByText(/San Francisco/)).toBeInTheDocument();
    expect(screen.getByText(/Jan 2020 - Present/)).toBeInTheDocument();
  });

  it('renders with children content', () => {
    render(
      <TimelineItem
        title={mockExperience.title}
        subtitle={mockExperience.subtitle}
        meta={mockExperience.meta}
      >
        <ul>
          <li>Built scalable applications</li>
          <li>Mentored junior developers</li>
        </ul>
      </TimelineItem>
    );

    expect(screen.getByText('Built scalable applications')).toBeInTheDocument();
    expect(screen.getByText('Mentored junior developers')).toBeInTheDocument();
  });

  it('renders badges', () => {
    render(
      <TimelineItem
        title={mockExperience.title}
        subtitle={mockExperience.subtitle}
        meta={mockExperience.meta}
        badges={mockExperience.badges}
      />
    );

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders without badges when not provided', () => {
    const { container } = render(
      <TimelineItem
        title={mockExperience.title}
        subtitle={mockExperience.subtitle}
        meta={mockExperience.meta}
      />
    );

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });

  it('has timeline styling with left padding', () => {
    const { container } = render(
      <TimelineItem
        title={mockExperience.title}
        subtitle={mockExperience.subtitle}
        meta={mockExperience.meta}
      />
    );

    const article = container.querySelector('article');
    expect(article).toHaveClass('pl-7');
  });

  it('has timeline dot indicator', () => {
    const { container } = render(
      <TimelineItem
        title={mockExperience.title}
        subtitle={mockExperience.subtitle}
        meta={mockExperience.meta}
      />
    );

    // Check for the timeline dot
    const dot = container.querySelector('span[class*="rounded-full"]');
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveAttribute('aria-hidden', 'true');
  });
});
