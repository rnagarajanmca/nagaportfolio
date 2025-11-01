import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeProvider } from "@/components/ThemeProvider";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorageMock.clear();
    // Reset document dataset and style
    document.documentElement.dataset.theme = "";
    document.documentElement.style.colorScheme = "";
  });

  it("renders toggle button", () => {
    renderToggle();
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("displays current theme", () => {
    renderToggle();
    expect(screen.getByText(/Light|Dark/i)).toBeInTheDocument();
  });

  it("toggles theme on click", async () => {
    const user = userEvent.setup();
    renderToggle();

    const button = screen.getByRole("button", { name: /toggle theme/i });
    const initialTheme = screen.getByText(/Light|Dark/i).textContent;

    await user.click(button);

    await waitFor(() => {
      const newTheme = screen.getByText(/Light|Dark/i).textContent;
      expect(newTheme).not.toBe(initialTheme);
    });
  });

  it("saves theme to localStorage", async () => {
    const user = userEvent.setup();
    renderToggle();

    const button = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(button);

    await waitFor(() => {
      const stored = localStorageMock.getItem("portfolio-theme");
      expect(stored).toBeTruthy();
      expect(["light", "dark"]).toContain(stored);
    });
  });

  it("applies theme to document element", async () => {
    const user = userEvent.setup();
    renderToggle();

    const button = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(button);

    await waitFor(() => {
      const theme = localStorageMock.getItem("portfolio-theme");
      if (theme) {
        expect(document.documentElement.dataset.theme).toBe(theme);
        expect(document.documentElement.style.colorScheme).toBe(theme);
      }
    });
  });

  it("reads initial theme from localStorage", () => {
    localStorageMock.setItem("portfolio-theme", "dark");
    renderToggle();
    expect(screen.getByText(/Dark/i)).toBeInTheDocument();
  });
});

