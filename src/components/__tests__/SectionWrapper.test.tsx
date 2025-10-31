import { render, screen } from "@testing-library/react";
import { SectionWrapper } from "@/components/SectionWrapper";

describe("SectionWrapper", () => {
  it("renders title and children", () => {
    render(
      <SectionWrapper id="test" title="Test Title" subtitle="Subtitle">
        <p>Child content</p>
      </SectionWrapper>
    );

    expect(screen.getByRole("heading", { level: 2, name: "Test Title" })).toBeInTheDocument();
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
