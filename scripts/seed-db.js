require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false
});

// Sample project data
const projects = [
  {
    title: 'BisTalk v2 (Pocket Translator)',
    description: 'A mother tongue based speech to text application that translates different languages similar to google translate.',
    detailed_description: 'A mobile application that provides real-time translation between different languages, with a focus on local dialects like Cebuano.',
    image_url: '/../assets/image4.png',
    github_url: 'https://github.com/Kjm517/pocket-translator',
    project_type: 'Mobile App',
    is_featured: true,
    sort_order: 1,
    technologies: ['Android Studio', 'Java']
  },
  {
    title: 'BisTalk: A mother tongue speech-to-text mobile application for first graders',
    description: 'A mother tongue based speech to text application utilized as an E-learning tool intended for first graders. This app helps teachers demonstrate simple teaching tools for students to learn English to Cebuano or vice versa.',
    detailed_description: 'An educational application designed to assist teachers in bilingual education, specifically targeting first-grade students learning English and Cebuano.',
    image_url: '/../assets/image4.png',
    github_url: 'https://github.com/Kjm517/capstone',
    project_type: 'Mobile App',
    is_featured: true,
    sort_order: 2,
    technologies: ['Android Studio', 'Java', 'Capstone']
  },
  {
    title: 'Barkepedia',
    description: 'A comprehensive dog breed encyclopedia application that provides detailed information about various dog breeds, their characteristics, and care requirements.',
    detailed_description: 'An informational app for dog lovers and potential pet owners to learn about different dog breeds, their temperaments, exercise needs, and care guidelines.',
    image_url: '/../assets/barkepedia_logo.png',
    github_url: 'https://github.com/Kjm517/barkepedia',
    project_type: 'Mobile App',
    is_featured: true,
    sort_order: 3,
    technologies: ['Android Studio', 'Kotlin']
  },
  {
    title: 'Personal Portfolio',
    description: 'A personal portfolio website showcasing my projects, skills, and experience as a software developer.',
    detailed_description: 'A responsive portfolio website built with modern web technologies to highlight my development work and professional journey.',
    image_url: '/../assets/barkepedia_logo.png',
    github_url: 'https://github.com/Kjm517/portfolio',
    project_type: 'Web App',
    is_featured: true,
    sort_order: 4,
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
  {
    title: 'Silverius Portfolio',
    description: 'A portfolio website developed for a client to showcase their creative work and professional experience.',
    detailed_description: 'A custom-designed portfolio website built for a client using modern web technologies and featuring a content management system for easy updates.',
    image_url: '/../assets/barkepedia_logo.png',
    github_url: 'https://github.com/Kjm517/portfolio',
    project_type: 'Web App',
    is_featured: true,
    sort_order: 5,
    technologies: ['Vue.js', 'Laravel', 'TypeScript', 'Tailwind CSS']
  }
];

const technologies = [
  { name: 'Android Studio', category: 'Tools', proficiency_level: 5, is_featured: true },
  { name: 'Java', category: 'Programming', proficiency_level: 4, is_featured: true },
  { name: 'Kotlin', category: 'Programming', proficiency_level: 4, is_featured: true },
  { name: 'React.js', category: 'Frontend', proficiency_level: 5, is_featured: true },
  { name: 'Next.js', category: 'Frontend', proficiency_level: 5, is_featured: true },
  { name: 'TypeScript', category: 'Programming', proficiency_level: 4, is_featured: true },
  { name: 'JavaScript', category: 'Programming', proficiency_level: 5, is_featured: true },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency_level: 5, is_featured: true },
  { name: 'HTML', category: 'Frontend', proficiency_level: 5, is_featured: true },
  { name: 'CSS', category: 'Frontend', proficiency_level: 5, is_featured: true },
  { name: 'Vue.js', category: 'Frontend', proficiency_level: 3, is_featured: true },
  { name: 'Laravel', category: 'Backend', proficiency_level: 3, is_featured: true },
  { name: 'Node.js', category: 'Backend', proficiency_level: 4, is_featured: true },
  { name: 'Express', category: 'Backend', proficiency_level: 4, is_featured: true },
  { name: 'PostgreSQL', category: 'Database', proficiency_level: 4, is_featured: true },
  { name: 'MongoDB', category: 'Database', proficiency_level: 3, is_featured: true },
  { name: 'Framer Motion', category: 'Frontend', proficiency_level: 4, is_featured: true },
];

const profile = {
  name: 'Karen M',
  title: 'Android Developer',
  email: 'km.android@example.com',
  location: 'Cebu City, Philippines',
  bio: 'Passionate Android developer with experience in building mobile applications and web development skills.',
  github_url: 'https://github.com/Kjm517',
  linkedin_url: 'https://linkedin.com/in/karen-m',
  website_url: 'https://karenm.dev'
};

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Starting database seeding...');
    await client.query('BEGIN');
    
    // 1. Insert profile
    console.log('Adding profile data...');
    await client.query(`
      INSERT INTO profiles (name, title, email, location, bio, github_url, linkedin_url, website_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        title = EXCLUDED.title,
        location = EXCLUDED.location,
        bio = EXCLUDED.bio,
        github_url = EXCLUDED.github_url,
        linkedin_url = EXCLUDED.linkedin_url,
        website_url = EXCLUDED.website_url
    `, [
      profile.name, 
      profile.title, 
      profile.email, 
      profile.location, 
      profile.bio, 
      profile.github_url, 
      profile.linkedin_url, 
      profile.website_url
    ]);
    
    // 2. Insert skills
    console.log('Adding skills...');
    for (const tech of technologies) {
      await client.query(`
        INSERT INTO skills (name, category, proficiency_level, is_featured)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (name) DO UPDATE SET
          category = EXCLUDED.category,
          proficiency_level = EXCLUDED.proficiency_level,
          is_featured = EXCLUDED.is_featured
      `, [tech.name, tech.category, tech.proficiency_level, tech.is_featured]);
    }
    
    // 3. Get skill IDs for reference
    const skillsResult = await client.query('SELECT id, name FROM skills');
    const skillMap = {};
    skillsResult.rows.forEach(skill => {
      skillMap[skill.name] = skill.id;
    });
    
    // 4. Insert projects and their technologies
    console.log('Adding projects...');
    for (const project of projects) {
      // Insert project
      const projectResult = await client.query(`
        INSERT INTO projects (
          title, description, detailed_description, image_url, github_url, 
          project_type, is_featured, sort_order
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (title) DO UPDATE SET
          description = EXCLUDED.description,
          detailed_description = EXCLUDED.detailed_description,
          image_url = EXCLUDED.image_url,
          github_url = EXCLUDED.github_url,
          project_type = EXCLUDED.project_type,
          is_featured = EXCLUDED.is_featured,
          sort_order = EXCLUDED.sort_order
        RETURNING id
      `, [
        project.title,
        project.description,
        project.detailed_description,
        project.image_url,
        project.github_url,
        project.project_type,
        project.is_featured,
        project.sort_order
      ]);
      
      const projectId = projectResult.rows[0].id;
      
      // Delete existing technology associations
      await client.query(`
        DELETE FROM project_technologies 
        WHERE project_id = $1
      `, [projectId]);
      
      // Associate technologies with the project
      for (const techName of project.technologies) {
        const techId = skillMap[techName];
        if (techId) {
          await client.query(`
            INSERT INTO project_technologies (project_id, skill_id)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING
          `, [projectId, techId]);
        } else {
          console.warn(`Technology "${techName}" not found in skills table`);
        }
      }
    }
    
    await client.query('COMMIT');
    console.log('Database seeding completed successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the seeding function
seedDatabase().catch(e => {
  console.error('Seed failed:', e);
  process.exit(1);
});