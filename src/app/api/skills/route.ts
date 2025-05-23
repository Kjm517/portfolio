import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT id, name, category, proficiency_level, is_featured, file_path
      FROM skills WHERE is_featured = true
      ORDER BY proficiency_level DESC
    `);
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Skills API error:', error);
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}