import { Pool, QueryResult } from 'pg';

let pool: Pool;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' 
        ? { rejectUnauthorized: false } 
        : false
    });

    pool.query('SELECT NOW()', (err) => {
      if (err) {
        console.error('Error connecting to PostgreSQL database:', err);
      } else {
        console.log('Successfully connected to PostgreSQL database');
      }
    });
  }
  
  return pool;
}

export async function query<T>(text: string, params: any[] = []): Promise<T[]> {
  const pool = getPool();
  const start = Date.now();
  
  try {
    const result: QueryResult = await pool.query(text, params);
    const duration = Date.now() - start;
    
    console.log({
      query: text,
      duration,
      rows: result.rowCount,
    });
    
    return result.rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Transaction helper
export async function transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
  const pool = getPool();
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transaction error:', error);
    throw error;
  } finally {
    client.release();
  }
}

export const db = {
  query,
  transaction,
  getPool
};