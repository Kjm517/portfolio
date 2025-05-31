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

    const projects = Array.isArray((result as unknown as { rows: any[] }).rows)
      ? (result as unknown as { rows: any[] }).rows
      : result;
    console.log('Parsed projects:', projects);

    const processedProjects = (projects as any[]).map((project: any) => {
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

  } catch (error) {
    console.error('Error fetching experience:', error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Failed to fetch experience data', details: errMsg },
      { status: 500 }
    );
  }
}

