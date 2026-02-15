import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/ProjectCard';
import type { ProjectItem } from '@/content/schema';

const mockProject: ProjectItem = {
  name: 'Test Project',
  description: 'This is a test project description',
  technologies: ['React', 'TypeScript'],
  links: [
    { label: 'GitHub', href: 'https://github.com/test/project' },
    { label: 'Live', href: 'https://example.com' },
  ],
  year: '2024',
  company: 'Tech Corp',
};

describe('ProjectCard', () => {
  it('renders project title', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
  });

  it('renders project technologies', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders project links', () => {
    render(<ProjectCard project={mockProject} />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    const liveLink = screen.getByRole('link', { name: /live/i });

    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/project');
    expect(liveLink).toHaveAttribute('href', 'https://example.com');
  });

  it('renders project year', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders company metadata', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('renders without optional company metadata', () => {
    const projectWithoutCompany: ProjectItem = {
      name: 'Minimal Project',
      description: 'Minimal description',
      technologies: [],
      links: [],
      year: '2024',
    };

    const { container } = render(<ProjectCard project={projectWithoutCompany} />);

    expect(screen.getByText('Minimal Project')).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });

  it('has rounded styling', () => {
    const { container } = render(<ProjectCard project={mockProject} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('rounded-3xl');
  });

  it('has border styling', () => {
    const { container } = render(<ProjectCard project={mockProject} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('border', 'border-border');
  });
});
