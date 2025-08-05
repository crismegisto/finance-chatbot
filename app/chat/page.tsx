"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Send, Bot, User, DollarSign } from "lucide-react";

// Mock implementation of useChat
const useChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent,
    options?: { data?: { message: string } }
  ) => {
    e.preventDefault();

    const messageToSend = options?.data?.message || input;
    if (!messageToSend.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: messageToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock response based on user input
    const mockResponses: Record<string, string> = {
      "¿Cómo puedo crear un presupuesto mensual?":
        "Para crear un presupuesto mensual efectivo:\n\n1. **Calcula tus ingresos totales** - Salario, ingresos extra, etc.\n2. **Lista todos tus gastos fijos** - Vivienda, servicios, transporte\n3. **Estima gastos variables** - Comida, entretenimiento, ropa\n4. **Asigna porcentajes** - 50% necesidades, 30% deseos, 20% ahorro\n5. **Usa herramientas** - Apps como Mint, YNAB o Excel\n6. **Revisa mensualmente** - Ajusta según tus necesidades\n\n¿Te gustaría que profundice en algún aspecto específico?",
      "¿Cuál es la mejor estrategia para ahorrar?":
        "Las mejores estrategias de ahorro incluyen:\n\n**Regla 50/30/20:**\n- 50% para necesidades básicas\n- 30% para deseos personales\n- 20% para ahorro e inversión\n\n**Técnicas adicionales:**\n- Ahorro automático cada mes\n- Fondo de emergencia (3-6 meses de gastos)\n- Metas específicas y medibles\n- Reducir gastos innecesarios\n- Invertir el dinero ahorrado\n\n¿Quieres que te ayude a crear un plan personalizado?",
      "¿Cómo puedo salir de deudas?":
        "Estrategia para salir de deudas:\n\n**Método Avalancha (recomendado):**\n1. Paga mínimos en todas las deudas\n2. Extra dinero a la deuda con mayor interés\n3. Repite hasta liquidar todas\n\n**Método Bola de Nieve:**\n- Paga la deuda más pequeña primero\n- Gana motivación con victorias rápidas\n\n**Pasos adicionales:**\n- Negocia tasas de interés\n- Considera consolidación de deudas\n- Evita nuevas deudas\n- Aumenta ingresos si es posible\n\n¿Tienes deudas específicas que quieras analizar?",
      "¿En qué debería invertir como principiante?":
        "Para principiantes en inversión:\n\n**Opciones seguras para empezar:**\n- Fondos indexados (S&P 500)\n- ETFs de bajo costo\n- Fondos mutuos diversificados\n\n**Principios básicos:**\n- Diversifica tu portafolio\n- Invierte a largo plazo\n- Comienza con pequeñas cantidades\n- Educate antes de invertir\n- Considera tu tolerancia al riesgo\n\n**Antes de invertir:**\n- Fondo de emergencia establecido\n- Deudas de alto interés pagadas\n- Objetivos financieros claros\n\n¿Te gustaría que exploremos opciones específicas según tu perfil?",
      "¿Cómo controlar mis gastos personales?":
        "Estrategias para controlar gastos:\n\n**Seguimiento de gastos:**\n- Usa apps como Mint, YNAB\n- Guarda todos los recibos\n- Revisa estados de cuenta\n\n**Técnicas de control:**\n- Presupuesto de sobres\n- Regla de 24 horas para compras grandes\n- Lista de compras\n- Evita compras impulsivas\n\n**Reducción de gastos:**\n- Cancela suscripciones innecesarias\n- Cocina en casa más seguido\n- Busca descuentos y cupones\n- Usa transporte público\n\n¿Quieres que analicemos tus gastos específicos?",
    };

    const response =
      mockResponses[messageToSend] ||
      "Gracias por tu pregunta. Como asesor financiero personal, puedo ayudarte con:\n\n• Creación de presupuestos\n• Estrategias de ahorro\n• Planificación de inversiones\n• Manejo de deudas\n• Control de gastos\n\n¿En qué área específica te gustaría que te ayude más?";

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant" as const,
      content: response,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
};

export default function ChatPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

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
      // Always clear localStorage and redirect, even if API call fails
      localStorage.removeItem("user");
      router.push("/");
    }
  };

  const suggestedQuestions = [
    "¿Cómo puedo crear un presupuesto mensual?",
    "¿Cuál es la mejor estrategia para ahorrar?",
    "¿Cómo puedo salir de deudas?",
    "¿En qué debería invertir como principiante?",
    "¿Cómo controlar mis gastos personales?",
  ];

  const handleSuggestedQuestion = (question: string) => {
    handleSubmit(new Event("submit") as any, { data: { message: question } });
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
          <Button variant="outline" onClick={handleLogout} size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
      </header>

      <div className="flex-1 w-full flex flex-col lg:px-4 lg:py-4 overflow-hidden">
        <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-6 h-full">
          {/* Chat principal - primero en mobile */}
          <div className="flex-1 lg:col-span-3 lg:order-2 flex flex-col lg:min-h-0 p-4 lg:p-0">
            <Card className="flex-1 flex flex-col lg:h-full">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-green-600" />
                  <span>Asesor Financiero Personal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 p-0">
                {/* Área de mensajes */}
                <ScrollArea className="flex-1 p-4">
                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <Bot className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        ¡Hola! Soy tu asesor financiero personal
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Puedo ayudarte con presupuestos, ahorros, inversiones,
                        deudas y gastos personales.
                      </p>
                      <p className="text-sm text-gray-500">
                        Haz una pregunta o selecciona una sugerencia del panel
                        inferior.
                      </p>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 mb-4 ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-green-100">
                            <Bot className="h-4 w-4 text-green-600" />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>

                      {message.role === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100">
                            <User className="h-4 w-4 text-blue-600" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

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
                </ScrollArea>

                {/* Input de mensaje */}
                <div className="border-t p-4 flex-shrink-0">
                  <form onSubmit={handleSubmit} className="flex space-x-2">
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
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preguntas Frecuentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQuestions.map((question) => (
                  <Button
                    key={question}
                    variant="ghost"
                    className="w-full text-left justify-start h-auto p-3 text-sm"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
