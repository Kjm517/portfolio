// app/api/education/route.js (note: changed from .ts to .js)
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('education')
      .select(`
        id, 
        institution_name, 
        degree, 
        field_of_study,
        description, 
        location, 
        sort_order, 
        date
      `)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const mappedData = (data || []).map(row => ({
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
      { error: 'Failed to fetch education data' },
      { status: 500 }
    );
  }
}