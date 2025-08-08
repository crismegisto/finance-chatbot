# 💰 FinanceBot

> Tu asesor personal de finanzas impulsado por IA

Una aplicación web moderna de chatbot financiero construida con Next.js 15 que proporciona asesoramiento financiero personalizado en español. FinanceBot te ayuda con presupuestos, ahorros, inversiones, manejo de deudas y control de gastos personales.

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.9-06B6D4)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4%20Turbo-00A67E)

## ✨ Características

- 🤖 **Chatbot AI Inteligente** - Asesoramiento financiero personalizado con OpenAI GPT-4 Turbo
- 📱 **Diseño Responsivo** - Optimizado para móviles y escritorio
- 🌟 **Interfaz Moderna** - Construida con shadcn/ui y Tailwind CSS
- 💬 **Chat en Tiempo Real** - Respuestas streaming para una experiencia fluida
- 🏦 **Asesoramiento Integral** - Presupuestos, ahorros, inversiones, deudas y gastos
- 🔐 **Sistema de Autenticación** - Login/registro con Supabase (demo)
- 🌙 **Soporte de Temas** - Modo claro y oscuro
- 🇪🇸 **Interfaz en Español** - Completamente localizada

## 🚀 Tech Stack

- **Frontend**: Next.js 15 con App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4.x, shadcn/ui components
- **Observabilidad**: Vercel Observability para monitoreo y analytics
- **Autenticación**: Supabase (configuración demo)
- **Iconos**: Lucide React
- **Tipografía**: Geist Sans y Mono
- **Package Manager**: pnpm

## 📋 Prerequisitos

- Node.js 18+
- pnpm (recomendado) o npm
- Cuenta de OpenAI con API key
- Cuenta de Supabase (opcional, para autenticación completa)

## 🛠️ Instalación

1. **Clona el repositorio**

   ```bash
   git clone <repository-url>
   cd finance-chatbot
   ```

2. **Instala las dependencias**

   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Configura las variables de entorno**

   ```bash
   cp .env.local.example .env.local
   ```

   Edita `.env.local` con tus credenciales:

   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=tu_openai_api_key_aqui

   # Supabase Configuration (opcional)
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

4. **Ejecuta el servidor de desarrollo**

   ```bash
   pnpm dev
   # o
   npm run dev
   ```

5. **Abre tu navegador**
   Visita [http://localhost:3000](http://localhost:3000)

## 🌐 Variables de Entorno

| Variable                        | Descripción                          | Requerida |
| ------------------------------- | ------------------------------------ | --------- |
| `OPENAI_API_KEY`                | Tu API key de OpenAI para el chatbot | ✅        |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL de tu proyecto Supabase          | ⚠️ (Demo) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima de Supabase            | ⚠️ (Demo) |

## 📚 Comandos de Desarrollo

```bash
# Desarrollo
pnpm dev          # Inicia el servidor de desarrollo
npm run dev

# Construcción
pnpm build        # Construye la aplicación para producción
npm run build

# Producción
pnpm start        # Inicia el servidor de producción
npm start

# Linting
pnpm lint         # Ejecuta ESLint
npm run lint
```

## 📁 Estructura del Proyecto

```
finance-chatbot/
├── app/                    # App Router de Next.js 15
│   ├── api/               # API Routes
│   │   ├── chat/          # Endpoint del chatbot
│   │   └── users/         # Autenticación (login/logout/register)
│   ├── chat/              # Página principal del chat
│   ├── register/          # Página de registro
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de login
├── components/            # Componentes React
│   ├── ui/                # Componentes de shadcn/ui
│   └── theme-provider.tsx # Proveedor de temas
├── hooks/                 # Custom hooks
├── lib/                   # Utilidades y configuración
├── public/                # Archivos estáticos
├── utils/                 # Utilidades adicionales
└── CLAUDE.md             # Instrucciones para Claude Code
```

## 🤖 Funcionalidades del Chatbot

FinanceBot puede ayudarte con:

- **💰 Presupuestos**: Creación y gestión de presupuestos mensuales
- **🏦 Ahorros**: Estrategias efectivas para ahorrar dinero
- **📈 Inversiones**: Consejos para principiantes y avanzados
- **💳 Deudas**: Planes personalizados para salir de deudas
- **📊 Gastos**: Control y optimización de gastos personales
- **📋 Planificación**: Objetivos financieros a corto y largo plazo

### Preguntas Frecuentes Incluidas:

- "¿Cómo puedo crear un presupuesto mensual?"
- "¿Cuál es la mejor estrategia para ahorrar?"
- "¿Cómo puedo salir de deudas?"
- "¿En qué debería invertir como principiante?"
- "¿Cómo controlar mis gastos personales?"

## 🔧 Configuración de la API

### Chat Endpoint (`/api/chat`)

- Utiliza el Vercel AI SDK con OpenAI GPT-4 Turbo
- Streaming de respuestas en tiempo real
- Sistema prompt personalizado para asesoramiento financiero
- Máximo 30 segundos de duración por request

### Autenticación

La aplicación incluye un sistema de autenticación demo con:

- Login/registro básico
- Almacenamiento en localStorage (desarrollo)
- Integración preparada para Supabase

## 🎨 Componentes UI

Utiliza [shadcn/ui](https://ui.shadcn.com/) con el estilo "new-york":

- **Primitivos**: Radix UI para accesibilidad
- **Iconos**: Lucide React
- **Estilizado**: class-variance-authority
- **Temas**: Soporte completo claro/oscuro

Componentes principales incluidos:

- Cards, Buttons, Inputs, Dialogs
- Scroll Areas, Avatars, Badges
- Forms, Tables, Charts
- Toast notifications, Tooltips

## 🌟 Características Técnicas

- **App Router**: Next.js 13+ con estructura de directorios app/
- **Server Components**: Renderizado del lado del servidor por defecto
- **Client Components**: Marcados explícitamente con "use client"
- **TypeScript Strict**: Tipado estricto en toda la aplicación
- **Responsive Design**: Mobile-first con Tailwind CSS
- **Performance**: Optimizado para Core Web Vitals

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
