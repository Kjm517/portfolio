import { NextRequest, NextResponse } from 'next/server';

const YOUR_EMAIL = 'kmanaay17@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string || 'Contact Form Message';
    const message = formData.get('message') as string;
    const fileUrl = formData.get('fileUrl') as string || null;
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields' 
        },
        { status: 400 }
      );
    }

    console.log('Contact form data received:', { 
      name, 
      email, 
      subject,
      message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
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

export async function GET(request: NextRequest) {
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