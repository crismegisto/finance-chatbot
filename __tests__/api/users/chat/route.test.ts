import { createMocks } from 'node-mocks-http';
import { POST, GET } from '@/app/api/users/chat/route';

describe('api/users/chat/route', () => {
  it('should return 400 if sessionId or message is missing in POST', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { sessionId: '', message: '' },
    });
    const response = await POST(req);
    expect(response.status).toBe(400);
    expect(response._getJSONData().error).toBeDefined();
  });

  it('should return 401 if userId is missing in GET', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/users/chat',
    });
    req.url = '/api/users/chat';
    const response = await GET(req);
    expect(response.status).toBe(401);
    expect(response._getJSONData().error).toBeDefined();
  });

  // Add more tests for valid POST and GET, Supabase mocks, etc.
});
