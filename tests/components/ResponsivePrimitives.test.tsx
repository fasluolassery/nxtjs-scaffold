import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs/Tabs";
import { ToastContainer } from "@/components/ui/Toast/Toast";
import { useToastStore } from "@/stores/useToastStore";

describe("Responsive UI Primitives & Interaction Fixes", () => {
  it("renders TabsList with mobile-safe horizontal overflow styling", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
      </Tabs>
    );

    const tabsList = screen.getByTestId("tabs-list");
    expect(tabsList.className).toContain("max-w-full");
    expect(tabsList.className).toContain("overflow-x-auto");
  });

  it("renders ToastContainer at the top of the viewport", () => {
    act(() => {
      useToastStore.setState({
        toasts: [
          {
            id: "test-toast-1",
            type: "success",
            title: "Operation Succeeded",
            duration: 3000,
          },
        ],
      });
    });

    const { container } = render(<ToastContainer />);
    const toastWrapper = container.firstChild as HTMLElement;
    expect(toastWrapper.className).toContain("top-4");
    expect(toastWrapper.className).toContain("pointer-events-none");
    expect(screen.getByText("Operation Succeeded")).toBeInTheDocument();

    act(() => {
      useToastStore.setState({ toasts: [] });
    });
  });

  it("renders DialogContent with responsive mobile margin and rounded corners", () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent data-testid="dialog-content">
          <div>Modal Content</div>
        </DialogContent>
      </Dialog>
    );

    const content = screen.getByTestId("dialog-content");
    expect(content.className).toContain("w-[calc(100%-2rem)]");
    expect(content.className).toContain("rounded-xl");
  });

  it("renders Select dropdown and opens on trigger interaction", () => {
    render(
      <Select defaultValue="opt1">
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select Option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="opt1">Option 1</SelectItem>
          <SelectItem value="opt2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId("select-trigger");
    expect(trigger).toHaveAttribute("data-state", "closed");

    // Click opens dropdown
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    expect(trigger).toHaveAttribute("data-state", "open");
  });
});
