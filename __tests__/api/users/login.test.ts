import { POST } from '@/app/api/users/login/route'

// Mock Supabase client
const mockSupabase = {
  auth: {
    signInWithPassword: jest.fn(),
  },
}

// Mock next/server
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url: string, init?: { method?: string; body?: string }) => ({
    url,
    method: init?.method || 'GET',
    body: init?.body || '',
    json: jest.fn().mockImplementation(() => Promise.resolve(JSON.parse(init?.body || '{}'))),
  })),
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status || 200,
      json: () => Promise.resolve(data),
    })),
  },
}))

// Mock Supabase server utils with async createClient
jest.mock('@/utils/supabase/server', () => ({
  createClient: jest.fn(() => Promise.resolve(mockSupabase)),
}))

describe('/api/users/login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 400 when email is missing', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ password: 'password123' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Email y contraseña son requeridos')
  })

  it('should return 400 when password is missing', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Email y contraseña son requeridos')
  })

  it('should return 400 when both email and password are missing', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Email y contraseña son requeridos')
  })

  it('should return 401 when authentication fails', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: { message: 'Invalid credentials' },
    })

    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'wrongpassword',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Invalid credentials')
  })

  it('should return 200 when authentication succeeds', async () => {
    const mockUser = { id: '1', email: 'test@example.com' }
    const mockSession = { access_token: 'token123' }

    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null,
    })

    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBe('Login exitoso')
    expect(data.user).toEqual(mockUser)
    expect(data.session).toEqual(mockSession)
  })

  it('should return 500 when an error occurs', async () => {
    mockSupabase.auth.signInWithPassword.mockRejectedValue(new Error('Database error'))

    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Error interno del servidor')
  })
}) 