import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, message, sender, userData } = await request.json()

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: 'bad request' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get user from session (if available)
    let user_id = null;

    if (!userData) {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();
      if (user && user.id) {
        user_id = user.id;
      }
    } else {
      user_id = userData.id;
    }

    // Check if session already exists
    let sessionExists = false;
    if (user_id) {
        const { data, error } = await supabase
            .from('chat_sessions')
            .select('id')
            .eq('id', sessionId)
            .maybeSingle();
        sessionExists = data !== null && data.id === sessionId;
    }
    // If not, insert new session with first question
    if (!sessionExists && user_id && message.includes('?') && sender === 'user' ) {
      const { error: insertError } = await supabase
        .from('chat_sessions')
        .insert([
          {
            id: sessionId,
            user_id,
            topic: message,
            started_at: new Date().toISOString(),
          },
        ]);
      if (insertError) {
        console.error('Error inserting chat session:', insertError);
        return NextResponse.json(
          { error: insertError.message },
          { status: 500 }
        );
      }
      console.log('Chat session created with first question:', message);
      return NextResponse.json({ message: 'Chat session creada' });
    } else if (sessionExists && user_id && message) {
        const { error: insertError } = await supabase
        .from('messages')
        .insert([
          {
            id: crypto.randomUUID(),
            session_id: sessionId,
            user_id,
            sender: sender,
            message,
            timestamp: new Date().toISOString(),
          },
        ]);
      if (insertError) {
        return NextResponse.json(
          { error: insertError.message },
          { status: 500 }
        );
      }
      return NextResponse.json({ message: 'Chat session creada' });
    }

  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get('userId');

      if (!userId) {
       return NextResponse.json(
          { error: 'Bad request' },
          { status: 401 }
        );
      }

    const supabase = await createClient()

    // Get user from session (if available)
    let user_id = null;
    if (!userId) {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();
      if (user && user.id) {
        user_id = user.id;
      }
    } else {
      user_id = userId;
    }

    // Check if user id is available
      if (user_id) {
          const { data: sessions, error } = await supabase
            .from('chat_sessions')
            .select('*')
            .eq('user_id', user_id)
            .order('started_at', { ascending: false });

            if (error) {
                console.error('Error fetching chat sessions:', error);
                return NextResponse.json(
                    { error: error.message },
                    { status: 500 }
                );
            } else {
                console.log('User chat sessions:', sessions);
                return NextResponse.json({
                    sessions: sessions || [],
                    message: 'Chat sessions fetched successfully'
                });
            }
      } else {
        return NextResponse.json(
          { error: 'User not authenticated' },
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