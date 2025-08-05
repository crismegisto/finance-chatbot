import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import RegisterPage from "@/app/register/page";

// Mock Next.js router
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock fetch
global.fetch = jest.fn();

describe("RegisterPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders registration form", () => {
    render(<RegisterPage />);

    expect(screen.getAllByText("Crear Cuenta")).toHaveLength(2);
    expect(screen.getByPlaceholderText(/Tu nombre/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/tu@email\.com/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/••••••••/)).toBeDefined();
    expect(screen.getByRole("button", { name: /Crear Cuenta/i })).toBeDefined();
  });

  it("handles form submission with valid data", async () => {
    // Mock successful registration
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: "Registro exitoso",
        user: { id: "1", email: "test@example.com" },
      }),
    });

    render(<RegisterPage />);

    const nameInput = screen.getByPlaceholderText(/Tu nombre/i);
    const emailInput = screen.getByPlaceholderText(/tu@email\.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/);
    const submitButton = screen.getByRole("button", { name: /Crear Cuenta/i });

    await userEvent.type(nameInput, "Test User");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: expect.stringContaining("Test User"),
      });
    });
  });

  it("handles form submission without name", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: "Registro exitoso",
        user: { id: "1", email: "test@example.com" },
      }),
    });

    render(<RegisterPage />);

    const emailInput = screen.getByPlaceholderText(/tu@email\.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/);
    const submitButton = screen.getByRole("button", { name: /Crear Cuenta/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: expect.stringContaining("test@example.com"),
      });
    });
  });

  it("handles registration error", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: "Email already exists",
      }),
    });

    render(<RegisterPage />);

    const emailInput = screen.getByPlaceholderText(/tu@email\.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/);
    const submitButton = screen.getByRole("button", { name: /Crear Cuenta/i });

    await userEvent.type(emailInput, "existing@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it("allows form submission with only required fields", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: "Registro exitoso",
        user: { id: "1", email: "test@example.com" },
      }),
    });

    render(<RegisterPage />);

    const emailInput = screen.getByPlaceholderText(/tu@email\.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/);
    const submitButton = screen.getByRole("button", { name: /Crear Cuenta/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    // Form should submit with only required fields (email and password)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it("renders login link with correct href", () => {
    render(<RegisterPage />);

    const loginLink = screen.getByRole("link", { name: /Iniciar Sesión/i });
    expect(loginLink).toHaveAttribute("href", "/");
  });

  it("shows loading state during submission", async () => {
    // Mock a slow response
    (global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<RegisterPage />);

    const emailInput = screen.getByPlaceholderText(/tu@email\.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/);
    const submitButton = screen.getByRole("button", { name: /Crear Cuenta/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    // Button should show loading text and be disabled during submission
    await waitFor(() => {
      expect(screen.getByText("Creando cuenta...")).toBeDefined();
      expect(submitButton).toBeDisabled();
    });
  });
});
