// app/api/certifications/route.js
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .select(`
        id, 
        name, 
        issuing_organization, 
        issue_date, 
        expiration_date, 
        credential_url
      `)
      .order('issue_date', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const mappedData = (data || []).map(row => ({
      id: row.id,
      title: row.name,
      issuer: row.issuing_organization,
      issue_date: row.issue_date,
      certificate_url: row.credential_url,
      is_featured: true,
      description: row.expiration_date ? `Expires: ${row.expiration_date}` : undefined
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications data' },
      { status: 500 }
    );
  }
}