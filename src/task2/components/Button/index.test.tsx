import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from ".";
import { ThemeProvider } from "../../context/theme-context";

// Helper to render Button with theme context
const renderButton = (props: any) => {
  return render(
    <ThemeProvider>
      <Button {...props} />
    </ThemeProvider>
  );
};

describe("Button component", () => {
  // Positive tests
  it("renders button with text", () => {
    renderButton({ children: "Click Me" });
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    renderButton({ children: "Click Me", onClick: handleClick });

    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Negative tests
  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    renderButton({ children: "Disabled", onClick: handleClick, disabled: true });

    fireEvent.click(screen.getByText("Disabled"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when loading", () => {
    const handleClick = vi.fn();
    renderButton({ children: "Loading", onClick: handleClick, loading: true });

    fireEvent.click(screen.getByText("Loading"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
