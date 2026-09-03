import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "@/components/ui/Label/Label";
import { Textarea } from "@/components/ui/Textarea/Textarea";

describe("Form UI Primitives", () => {
  it("renders Label correctly with association", () => {
    render(
      <div>
        <Label htmlFor="test-input">Test Label</Label>
        <input id="test-input" />
      </div>
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders Textarea with placeholder and handles error styling", () => {
    const { rerender } = render(<Textarea placeholder="Enter text..." />);
    const textarea = screen.getByPlaceholderText("Enter text...");
    expect(textarea).toBeInTheDocument();
    expect(textarea.className).not.toContain("border-[var(--destructive)]");

    rerender(<Textarea placeholder="Enter text..." error />);
    expect(textarea.className).toContain("border-[var(--destructive)]");
  });
});
