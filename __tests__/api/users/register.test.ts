import { POST } from '@/app/api/users/register/route'

// Mock Supabase client
const mockSupabase = {
  auth: {
    signUp: jest.fn(),
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

describe('/api/users/register', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 400 when email is missing', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/users/register', {
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
    const request = new NextRequest('http://localhost:3000/api/users/register', {
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
    const request = new NextRequest('http://localhost:3000/api/users/register', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Email y contraseña son requeridos')
  })

  it('should return 400 when registration fails', async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: null,
      error: { message: 'Email already exists' },
    })

    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Email already exists')
  })

  it('should return 200 when registration succeeds with name', async () => {
    const mockUser = { id: '1', email: 'test@example.com' }
    const mockSession = { access_token: 'token123' }

    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null,
    })

    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBe('Registro exitoso. Revisa tu email para confirmar tu cuenta.')
    expect(data.user).toEqual(mockUser)
    expect(data.session).toEqual(mockSession)
  })

  it('should return 200 when registration succeeds without name', async () => {
    const mockUser = { id: '1', email: 'test@example.com' }
    const mockSession = { access_token: 'token123' }

    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null,
    })

    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBe('Registro exitoso. Revisa tu email para confirmar tu cuenta.')
    expect(data.user).toEqual(mockUser)
    expect(data.session).toEqual(mockSession)
  })

  it('should return 500 when an error occurs', async () => {
    mockSupabase.auth.signUp.mockRejectedValue(new Error('Database error'))

    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/users/register', {
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