// app/api/projects/route.js
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
    console.log('Fetching projects with technologies from Supabase...');

    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select(`
        id,
        title,
        description,
        image_url,
        github_url,
        is_featured,
        sort_order,
        created_at,
        updated_at
      `)
      .order('sort_order', { ascending: true })
      .order('is_featured', { ascending: false })
      .order('id', { ascending: true });

    if (projectsError) {
      console.error('Supabase projects error:', projectsError);
      return NextResponse.json({ error: projectsError.message }, { status: 500 });
    }

    const { data: projectTechs, error: projectTechsError } = await supabase
      .from('project_technologies')
      .select('project_id, skill_id');

    if (projectTechsError) {
      console.error('Supabase project_technologies error:', projectTechsError);
    }

    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('id, name');

    if (skillsError) {
      console.error('Supabase skills error:', skillsError);
    }

    console.log('Raw projects:', projects);
    console.log('Raw project_technologies:', projectTechs);
    console.log('Raw skills:', skills);

    const processedProjects = (projects || []).map((project) => {
      const projectSkillIds = (projectTechs || [])
        .filter(pt => pt.project_id === project.id)
        .map(pt => pt.skill_id);

      const technologies = (skills || [])
        .filter(skill => projectSkillIds.includes(skill.id))
        .map(skill => skill.name);

      return { 
        ...project, 
        technologies: technologies
      };
    });

    console.log('Processed projects with technologies:', processedProjects);

    return NextResponse.json(processedProjects);

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects data' },
      { status: 500 }
    );
  }
}