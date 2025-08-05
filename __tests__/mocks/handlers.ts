import { http, HttpResponse } from "msw";

export const handlers = [
  // Chat API
  http.post("/api/chat", async ({ request }) => {
    const { messages } = (await request.json()) as { messages: any[] };

    if (!messages || !Array.isArray(messages)) {
      return HttpResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      id: "mock-chat-response",
      content: "Mock response from FinanceBot",
      role: "assistant",
    });
  }),

  // Login API
  http.post("/api/users/login", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return HttpResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    if (email === "test@example.com" && password === "password123") {
      return HttpResponse.json({
        message: "Login exitoso",
        user: { id: "1", email: "test@example.com", name: "Test User" },
        session: { access_token: "mock-token" },
      });
    }

    return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }),

  // Register API
  http.post("/api/users/register", async ({ request }) => {
    const { email, password, name } = (await request.json()) as {
      email: string;
      password: string;
      name?: string;
    };

    if (!email || !password) {
      return HttpResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    if (email === "existing@example.com") {
      return HttpResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      message: "Registro exitoso. Revisa tu email para confirmar tu cuenta.",
      user: { id: "2", email, name: name || null },
      session: { access_token: "mock-token" },
    });
  }),

  // Logout API
  http.post("/api/users/logout", () => {
    return HttpResponse.json({
      message: "Logged out successfully",
    });
  }),
];
