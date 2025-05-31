// app/api/contact/route.js
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string)

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject') || 'Contact Form Message';
    const message = formData.get('message');
    const fileUrl = formData.get('fileUrl') || null;

    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields' 
        },
        { status: 400 }
      );
    }

    
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          subject,
          message,
          file_url: fileUrl,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Error saving contact submission:', error);

    }

    console.log('Contact form data received:', { 
      name, 
      email, 
      subject,
      message: typeof message === 'string' ? message.substring(0, 100) + (message.length > 100 ? '...' : '') : '',
      fileUrl 
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Message received successfully!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process message' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Contact API is working! Use POST method to submit the contact form.',
      endpoint: '/api/contact',
      methods: ['POST'],
      documentation: 'This API endpoint is for handling contact form submissions.'
    },
    { status: 200 }
  );
}