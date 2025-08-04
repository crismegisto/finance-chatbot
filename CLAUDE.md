# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` or `npm run dev` - Starts Next.js development server
- **Build**: `pnpm build` or `npm run build` - Creates production build
- **Lint**: `pnpm lint` or `npm run lint` - Runs Next.js ESLint configuration
- **Start production**: `pnpm start` or `npm start` - Starts production server

## Architecture Overview

This is a **Next.js 15 finance chatbot application** built with the App Router, featuring:

### Core Structure
- **App Router**: Uses Next.js 13+ app directory structure
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Integration**: Uses Vercel AI SDK with OpenAI GPT-4 Turbo

### Key Application Flow
1. **Landing/Login Page** (`app/page.tsx`): Simple demo login that stores user data in localStorage
2. **Chat Interface** (`app/chat/page.tsx`): Main chatbot interface with sidebar suggestions
3. **API Route** (`app/api/chat/route.ts`): Handles AI chat requests using OpenAI

### Component Architecture
- **shadcn/ui**: Comprehensive UI component library in `components/ui/`
- **Theme Provider**: Dark/light mode support via `components/theme-provider.tsx`
- **Custom Hooks**: Located in `hooks/` directory
- **Utilities**: Shared utilities in `lib/utils.ts`

### AI Chat Implementation
- Uses Vercel AI SDK (`ai` package) with OpenAI provider
- Streaming responses for real-time chat experience
- Spanish-language financial advisor persona
- Specialized in budgeting, savings, investments, debt management, and expense control

### State Management
- Client-side state with React hooks
- LocalStorage for simple user session persistence
- No external state management library

### Styling System
- **Tailwind CSS 4.x** with PostCSS configuration
- **CSS Variables**: Theme-based color system
- **Geist Font**: Sans and mono variants
- **Responsive Design**: Mobile-first approach

### Configuration Notes
- **Next.js Config**: Disables ESLint and TypeScript errors during builds, enables unoptimized images
- **TypeScript**: Strict configuration with path aliases (`@/*` maps to root)
- **Package Manager**: Uses pnpm (lockfile present)

### Development Patterns
- Client components marked with `"use client"`
- Server actions in API routes with proper streaming
- Form handling with controlled components
- Proper TypeScript typing throughout

### UI Component Library
Uses shadcn/ui with "new-york" style, featuring:
- Radix UI primitives for accessibility
- Lucide React icons
- Custom styled components with class-variance-authority
- Full component suite including forms, dialogs, cards, etc.

### Mock vs Production
- Chat page includes mock implementation for development
- API route configured for production OpenAI integration
- Demo authentication system (not production-ready)