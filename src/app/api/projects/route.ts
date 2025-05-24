import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Project, ProjectImage } from '@/types/project';


export async function GET() {
  try {
    console.log('Fetching projects from database...');

    const result = await db.query(`
      SELECT 
        id,
        title,
        description,
        image_url,
        github_url,
        is_featured,
        sort_order,
        created_at,
        updated_at
      FROM projects
      ORDER BY sort_order ASC, is_featured DESC, id ASC
    `);

    console.log('Raw DB result:', result);

    const projects = Array.isArray(result.rows) ? result.rows : result;
    console.log('Parsed projects:', projects);

    const processedProjects = projects.map(project => {
      let techs = [];
      try {
        techs = typeof project.technologies === 'string'
          ? JSON.parse(project.technologies)
          : project.technologies || [];
      } catch (parseErr) {
        console.error('JSON parse error for project:', project.id, parseErr);
        techs = [];
      }

      return { ...project, technologies: techs };
    });

    console.log('Processed projects:', processedProjects);

    return NextResponse.json(processedProjects);

  } catch (error: any) {
    console.error('API GET /api/projects failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}

