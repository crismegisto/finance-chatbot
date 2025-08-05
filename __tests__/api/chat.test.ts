import { POST } from '@/app/api/chat/route'

// Mock the AI SDK
jest.mock('@ai-sdk/openai', () => ({
  openai: jest.fn(() => 'mocked-model'),
}))

// Mock Response with factory function
const mockResponseFactory = jest.fn().mockImplementation((body: any, init?: any) => ({
  body,
  init,
}))

global.Response = mockResponseFactory

jest.mock('ai', () => ({
  streamText: jest.fn(() => ({
    toDataStreamResponse: jest.fn(() => mockResponseFactory('mocked-stream')),
  })),
}))

// Mock next/server with factory functions
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

describe('/api/chat', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle POST request with valid messages', async () => {
    const mockMessages = [
      { role: 'user', content: '¿Cómo puedo crear un presupuesto?' }
    ]

    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: mockMessages }),
    })

    const response = await POST(request)

    expect(response.body).toBe('mocked-stream')
  })

  it('should handle POST request with empty messages', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [] }),
    })

    const response = await POST(request)

    expect(response.body).toBe('mocked-stream')
  })

  it('should handle malformed JSON', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: 'invalid-json',
    })

    await expect(POST(request)).rejects.toThrow()
  })

  it('should handle missing messages property', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const response = await POST(request)
    expect(response.body).toBe('mocked-stream')
  })
}) 