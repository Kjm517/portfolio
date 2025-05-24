import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM profiles LIMIT 1');
    client.release();
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}