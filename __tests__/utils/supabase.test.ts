import { createClient } from '@/utils/supabase/server'

// Mock Next.js cookies
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    getAll: jest.fn(() => []),
    set: jest.fn(),
  })),
}))

// Mock Supabase SSR
jest.mock('@supabase/ssr', () => ({
  createServerClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(),
      signOut: jest.fn(),
    },
  })),
}))

describe('Supabase Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('creates a Supabase client with correct configuration', async () => {
    const client = await createClient()
    
    expect(client).toBeDefined()
    expect(client.auth).toBeDefined()
  })

  it('handles cookie operations correctly', async () => {
    const { createServerClient } = require('@supabase/ssr')
    
    await createClient()
    
    expect(createServerClient).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      expect.objectContaining({
        cookies: expect.objectContaining({
          getAll: expect.any(Function),
          setAll: expect.any(Function),
        }),
      })
    )
  })

  it('handles cookie setAll errors gracefully', async () => {
    const { cookies } = require('next/headers')
    const mockCookieStore = {
      getAll: jest.fn(() => []),
      set: jest.fn(() => {
        throw new Error('Server Component error')
      }),
    }
    cookies.mockReturnValue(mockCookieStore)

    // Should not throw an error
    await expect(createClient()).resolves.toBeDefined()
  })

  it('uses environment variables for configuration', async () => {
    const { createServerClient } = require('@supabase/ssr')
    
    await createClient()
    
    expect(createServerClient).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      expect.any(Object)
    )
  })
}) 