import { render, screen } from "@testing-library/react";
import { NavBar } from "@/components/NavBar";
import type { NavLink } from "@/content/schema";

// Mock ThemeToggle before imports
jest.mock("@/components/ThemeToggle", () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

const observeMock = jest.fn();

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(public readonly callback: IntersectionObserverCallback) {}

  observe = observeMock;
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

describe("NavBar", () => {
  const mockLinks: NavLink[] = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  beforeEach(() => {
    // Create mock elements for sections
    document.body.innerHTML = `
      <div id="home">Home Section</div>
      <div id="about">About Section</div>
      <div id="contact">Contact Section</div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
    observeMock.mockClear();
  });

  it("renders brand name", () => {
    render(<NavBar links={mockLinks} brand="Test Portfolio" />);
    expect(screen.getByText("Test Portfolio")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<NavBar links={mockLinks} brand="Test" />);
    expect(screen.getAllByRole("link", { name: "Home" })).not.toHaveLength(0);
    expect(screen.getAllByRole("link", { name: "About" })).not.toHaveLength(0);
    expect(screen.getAllByRole("link", { name: "Contact" })).not.toHaveLength(0);
  });

  it("renders theme toggle", () => {
    render(<NavBar links={mockLinks} brand="Test" />);
    expect(screen.getAllByTestId("theme-toggle")).not.toHaveLength(0);
  });

  it("has correct href attributes for links", () => {
    render(<NavBar links={mockLinks} brand="Test" />);
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    homeLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "#home");
    });
  });

  it("creates IntersectionObserver for section tracking", () => {
    render(<NavBar links={mockLinks} brand="Test" />);

    expect(observeMock).toHaveBeenCalled();
  });
});

