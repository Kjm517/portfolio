import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false
});

export async function GET() {
  try {
    const client = await pool.connect();
    
    const query = `
      SELECT 
        id, name AS title, issuing_organization AS issuer, 
        issue_date, expiration_date, credential_url AS certificate_url
      FROM certifications
      ORDER BY issue_date DESC
    `;
    
    const result = await client.query(query);
    client.release();
    
    const mappedData = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      issuer: row.issuer,
      issue_date: row.issue_date,
      certificate_url: row.certificate_url,
      is_featured: true,
      description: row.expiration_date ? `Expires: ${row.expiration_date}` : undefined
    }));
    
    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}