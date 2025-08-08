"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Send, Bot, User, DollarSign } from "lucide-react";

const gethistoryChatQuestions = async (userId: string) => {
  try {
    const response = await fetch(
      `/api/users/chat?userId=${encodeURIComponent(userId)}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Error al obtener historial de chats");
    }
    return data.sessions || [];
  } catch (error) {
    console.error("Error al obtener historial de chats:", error);
    return [];
  }
};

// Mock implementation of useChat with persistent messages
const useChat = (user: any, chatHistory?: any[]) => {
  const [messages, setMessages] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("chatMessages");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Session ID persistent during session
  const [sessionId, setSessionId] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      let sid = sessionStorage.getItem("sessionId");
      if (!sid) {
        sid = crypto.randomUUID();
        sessionStorage.setItem("sessionId", sid);
      }
      setSessionId(sid);
    }
  }, []);

  const handleMessages = async (messageToSend: string, sender: string) => {
    try {
      const response = await fetch("/api/users/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message: messageToSend,
          sender,
          userData: user,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al registrar mensaje");
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai" as const,
          content: "Ocurrió un error al enviar el mensaje. Intenta de nuevo más tarde.",
        },
      ]);
      setIsLoading(false);
      return;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSubmit = async (
    e: React.FormEvent,
    user: any,
    options?: { data?: { message: string } }
  ) => {
    e.preventDefault();

    const messageToSend = options?.data?.message || input;
    if (!messageToSend.trim()) return;

    // Add user message
    const userMessage = {
      id: crypto.randomUUID(),
      role: "human" as const,
      content: messageToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    handleMessages(messageToSend, userMessage.role);

    try {
      const res = await fetch(
        "https://wealthadvisor-ejgpcmhtfscthnde.canadacentral-01.azurewebsites.net/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer CLAVE_API_TEAM8_070401082025?",
            accept: "application/json",
          },
          body: JSON.stringify({ query: messageToSend, chat_history: chatHistory?.map((msg) => ({ type: msg.role, content: msg.content})) || [] }),
        }
      );
      if (!res.ok) throw new Error("Error en la respuesta del servidor");
      const data = await res.json();
      // Assume the response is { answer: string }
      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "ai" as const,
        content: data.response || "No se recibió respuesta del servidor.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      handleMessages(assistantMessage.content, assistantMessage.role);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai" as const,
          content: "Ocurrió un error al obtener la respuesta. Intenta de nuevo más tarde.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages, // expose for clearing on logout
  };
};

export default function ChatPage() {
  const [user, setUser] = useState<any>(null);
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } =
    useChat(user, chatHistory);

  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (user && user.id) {
      const fetchChatSessions = async () => {
        const sessions = await gethistoryChatQuestions(user.id);
        setChatSessions(sessions);
      };
      fetchChatSessions();
    }
  }, [user]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Error al cerrar sesión:", data.error);
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      // Always clear localStorage, sessionStorage and redirect, even if API call fails
      localStorage.removeItem("user");
      localStorage.removeItem("chatMessages");
      if (typeof window !== "undefined") {
        sessionStorage.clear();
      }
      router.push("/");
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleStoriesRequest = () => {
    router.push("/historias");
  };

  const getMessagesBySessionId = async (sessionId: string) => {
    try {
      const response = await fetch(
        `/api/users/messages?sessionId=${encodeURIComponent(sessionId)}`
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error al obtener mensajes de la sesión");
      }
      return data.sessions || [];
    } catch (error) {
      console.error("Error al obtener mensajes de la sesión:", error);
      return [];
    }
  };

  const handleHistoryQuestion = async (session: any) => {
    // Fetch all messages for the selected session
    const messages = await getMessagesBySessionId(session.id);

    // Store in localStorage
    let storageMessages = [];
    if (typeof window !== "undefined" && messages.length > 0) {
      storageMessages = messages.map((msg: any) =>{
        const assistantMessage = {
          id: msg.id,
          role: msg.sender === "human" ? "human" : "ai",
          content: msg.message
        };
        return assistantMessage
      });
      localStorage.setItem("chatMessages", JSON.stringify(storageMessages));
    }
    setMessages(storageMessages);
    setChatHistory(storageMessages);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen lg:h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FinanceBot</h1>
              <p className="text-sm text-gray-600">Hola, {user.name}</p>
            </div>
          </div>
          <div
            className="flex items-center space-x-2"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Button variant="outline" onClick={handleStoriesRequest} size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Historias de Usuario
            </Button>
            <Button variant="outline" onClick={handleLogout} size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full flex flex-col lg:px-4 lg:py-4 overflow-hidden">
        <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-6 h-full">
          {/* Chat principal - primero en mobile */}
          <div className="flex-1 lg:col-span-3 lg:order-2 flex flex-col lg:min-h-0 p-4 lg:p-0">
            <Card className="relative flex flex-col h-full max-h-[90vh]">
              <CardHeader className="flex-shrink-0 sticky top-0 z-10 bg-white">
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-green-600" />
                  <span>Asesor Financiero Personal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 p-0 overflow-hidden">
                {/* Área de mensajes */}
                <div className="flex-1 overflow-y-auto p-4">
                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <Bot className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        ¡Hola! Soy tu asesor financiero personal
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Te ayudo a organizar tu dinero y tomar mejores decisiones con <strong>presupuestos, ahorros, inversiones, deudas y gastos personales</strong>.
                      </p>
                      <p className="text-sm text-gray-500">
                        Escribe tu pregunta y ¡comenzamos!
                      </p>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 mb-4 ${
                        message.role === "human"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.role === "ai" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-green-100">
                            <Bot className="h-4 w-4 text-green-600" />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "human"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>

                      {message.role === "human" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100">
                            <User className="h-4 w-4 text-blue-600" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {/* Dummy div for auto-scroll */}
                  <div ref={messagesEndRef} />

                  {isLoading && (
                    <div className="flex items-start space-x-3 mb-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-100">
                          <Bot className="h-4 w-4 text-green-600" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input de mensaje */}
                <div className="border-t p-4 flex-shrink-0 sticky bottom-0 z-10 bg-white">
                  <form
                    onSubmit={(e: any) => handleSubmit(e, user)}
                    className="flex space-x-2"
                  >
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Pregúntame sobre finanzas personales..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar con sugerencias - segundo en mobile */}
          <div className="flex-shrink-0 lg:col-span-1 lg:order-1 p-4 lg:p-0">
            {chatSessions.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Historia de Chats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {chatSessions.map((session) => (
                    <Button
                      key={session.id}
                      variant="ghost"
                      className="w-full text-left justify-start h-auto p-3 text-sm truncate"
                      onClick={() => handleHistoryQuestion(session)}
                    >
                      <span className="block w-full truncate">{session.topic || "Pregunta sin título"}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <p className="text-gray-500">No tienes chats previos.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
