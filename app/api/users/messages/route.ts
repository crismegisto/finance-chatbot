import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  try {
      const { searchParams } = new URL(request.url);
      const sessionId = searchParams.get('sessionId');

      if (!sessionId) {
       return NextResponse.json(
          { error: 'Bad request' },
          { status: 401 }
        );
      }

      const supabase = await createClient()

      if (sessionId) {
          const { data: sessions, error } = await supabase
            .from('messages')
            .select('*')
            .eq('session_id', sessionId)
            .order('timestamp', { ascending: false });

            if (error) {
                console.error('Error fetching chat messages:', error);
                return NextResponse.json(
                    { error: error.message },
                    { status: 500 }
                );
            } else {
                console.log('User chat sessions:', sessions);
                return NextResponse.json({
                    sessions: sessions || [],
                    message: 'Chat messages fetched successfully'
                });
            }
      } else {
        return NextResponse.json(
          { error: 'Session does not exist' },
          { status: 401 }
        );
      }
  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor8888' },
      { status: 500 }
    )
  }
}