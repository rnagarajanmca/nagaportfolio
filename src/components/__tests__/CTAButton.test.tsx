import { render, screen } from "@testing-library/react";
import { CTAButton } from "@/components/CTAButton";

describe("CTAButton", () => {
  it("renders children correctly", () => {
    render(<CTAButton href="/test">Click me</CTAButton>);
    expect(screen.getByRole("link", { name: "Click me" })).toBeInTheDocument();
  });

  it("has correct href attribute", () => {
    render(<CTAButton href="/test">Test Link</CTAButton>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("applies primary variant by default", () => {
    render(<CTAButton href="/test">Primary Button</CTAButton>);
    const link = screen.getByRole("link");
    expect(link.className).toContain("bg-accent");
  });

  it("applies secondary variant when specified", () => {
    render(
      <CTAButton href="/test" variant="secondary">
        Secondary Button
      </CTAButton>
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("bg-transparent");
    expect(link.className).toContain("border-border");
  });

  it("passes through additional props", () => {
    render(
      <CTAButton href="/test" target="_blank" rel="noreferrer" download>
        Download
      </CTAButton>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
    expect(link).toHaveAttribute("download");
  });

  it("applies custom className", () => {
    render(
      <CTAButton href="/test" className="custom-class">
        Custom
      </CTAButton>
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("custom-class");
  });
});

