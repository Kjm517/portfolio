// app/api/experience/route.js
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select(`
        id, 
        company_name, 
        position, 
        location,
        start_date, 
        end_date, 
        is_current, 
        description, 
        sort_order
      `)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map to match your Experience interface
    const mappedData = (data || []).map(row => ({
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
      { error: 'Failed to fetch experience data' },
      { status: 500 }
    );
  }
}