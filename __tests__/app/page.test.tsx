import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "@/app/page";

// Mock Next.js router
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock fetch
global.fetch = jest.fn();

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  it("renders the login page with title", () => {
    render(<HomePage />);

    expect(screen.getByText(/FinanceBot/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Tu asesor personal de finanzas/i)
    ).toBeInTheDocument();
  });

  it("displays login form elements", () => {
    render(<HomePage />);

    expect(screen.getAllByText(/Iniciar Sesión/i)).toHaveLength(2); // Title and button
    expect(
      screen.getByText("Accede a tu asesor financiero personal")
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Iniciar Sesión/i })
    ).toBeInTheDocument();
  });

  it("displays register link", () => {
    render(<HomePage />);

    expect(screen.getByText(/¿No tienes cuenta?/i)).toBeInTheDocument();
    expect(screen.getByText(/Crear Cuenta/i)).toBeInTheDocument();
  });

  it("handles form submission with valid credentials", async () => {
    const user = userEvent.setup();
    const mockResponse = {
      ok: true,
      json: async () => ({
        user: {
          email: "test@example.com",
          id: "123",
        },
      }),
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(<HomePage />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole("button", {
      name: /Iniciar Sesión/i,
    });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    expect(mockPush).toHaveBeenCalledWith("/chat");
  });

  it("displays error message on failed login", async () => {
    const user = userEvent.setup();
    const mockResponse = {
      ok: false,
      json: async () => ({
        error: "Invalid credentials",
      }),
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(<HomePage />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole("button", {
      name: /Iniciar Sesión/i,
    });

    await user.type(emailInput, "wrong@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(submitButton);

    expect(
      await screen.findByText(
        "El usuario no existe o las credenciales son invalidas"
      )
    ).toBeInTheDocument();
  });
});
