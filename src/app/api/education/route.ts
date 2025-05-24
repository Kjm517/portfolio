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
        id, institution_name, degree, field_of_study,
        description, location, sort_order, date
      FROM education
      ORDER BY CAST(sort_order AS INTEGER) ASC
    `;
    
    const result = await client.query(query);
    client.release();
    
    const mappedData = result.rows.map(row => ({
      id: row.id,
      institution_name: row.institution_name,
      degree: row.degree,
      email: '',
      field_of_study: row.field_of_study || '',
      description: row.description,
      location: row.location,
      sort_order: row.sort_order || '0',
      date: row.date
    }));
    
    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education data', details: error.message },
      { status: 500 }
    );
  }
}