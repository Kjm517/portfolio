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
        id, company_name, position, location, 
        start_date, end_date, is_current, description, sort_order
      FROM experiences
      ORDER BY sort_order ASC
    `;
    
    const result = await client.query(query);
    client.release();
    
    // Map to match your Experience interface
    const mappedData = result.rows.map(row => ({
      id: row.id,
      company_name: row.company_name,
      position: row.position,
      location: row.location,
      start_date: row.start_date,
      end_date: row.end_date,
      is_current: row.is_current ? 'true' : 'false',
      company_url: '', 
      company_logo_url: '',
      sort_order: row.sort_order,
      description: row.description
    }));
    
    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experience data', details: error.message },
      { status: 500 }
    );
  }
}