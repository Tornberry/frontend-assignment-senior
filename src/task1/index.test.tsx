import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GitHubUsers } from "./components/github-users";

vi.mock("./hooks/use-fetch", () => ({
  useFetch: vi.fn(() => ({
    data: [
      { id: 1, login: "alice", avatar_url: "", html_url: "" },
      { id: 2, login: "bob", avatar_url: "", html_url: "" },
    ],
    loading: false,
    error: null,
  })),
}));

describe("GitHubUsers component", () => {
  it("renders a list of users", async () => {
    render(<GitHubUsers />);
    expect(await screen.findByText("alice")).toBeInTheDocument();
    expect(await screen.findByText("bob")).toBeInTheDocument();
  });

  it("filters users by search input", async () => {
    render(<GitHubUsers />);
    const input = await screen.findByPlaceholderText(/search by username/i);

    fireEvent.change(input, { target: { value: "alice" } });

    expect(screen.getByText("alice")).toBeInTheDocument();
    expect(screen.queryByText("bob")).not.toBeInTheDocument();
  });

  it("shows 'no users found' when no matches", async () => {
    render(<GitHubUsers />);
    const input = await screen.findByPlaceholderText(/search by username/i);

    fireEvent.change(input, { target: { value: "charlie" } });

    expect(
      screen.getByText(/no users found matching "charlie"/i)
    ).toBeInTheDocument();
  });
});
