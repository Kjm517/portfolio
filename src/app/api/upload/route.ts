// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }
    
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: PDF, DOC, DOCX, TXT, JPG, PNG' },
        { status: 400 }
      );
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const response = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto', 
          folder: 'portfolio-contact-uploads', 
          public_id: `contact-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, '-')}`,
          overwrite: true,
          // Optional: Add tags for better organization
          tags: ['contact-form', 'user-upload'],
          context: {
            uploaded_via: 'contact-form',
            original_filename: file.name
          }
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });
    
    return NextResponse.json({ 
      success: true,
      fileUrl: response.secure_url,
      publicId: response.public_id,
      fileName: file.name,
      fileSize: response.bytes,
      format: response.format
    });
    
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const isConfigured = !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );

  return NextResponse.json(
    { 
      message: 'File upload endpoint - use POST method',
      cloudinaryConfigured: isConfigured,
      maxFileSize: '10MB',
      allowedFormats: ['PDF', 'DOC', 'DOCX', 'TXT', 'JPG', 'PNG']
    },
    { status: 200 }
  );
}