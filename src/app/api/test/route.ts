// app/api/test-supabase/route.js
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      urlStart: supabaseUrl?.substring(0, 20)
    });

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ 
        error: 'Missing environment variables',
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey 
      }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Test basic connection - list all tables
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true })

    console.log('Supabase response:', { data, error });

    if (error) {
      return NextResponse.json({ 
        error: 'Supabase error', 
        details: error.message,
        code: error.code 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connection works',
      profileCount: data
    });

  } catch (error) {
    console.error('Caught error:', error);
    return NextResponse.json({ 
      error: 'Exception caught', 
      details: error.message 
    }, { status: 500 });
  }
}