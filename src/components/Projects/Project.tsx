'use client';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  technologies?: string[];
}

export default function Project() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  
  const fadeInAnimationVariant = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  const toggleExpanded = (projectId: number) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const getDisplayDescription = (project: Project) => {
    const isExpanded = expandedProjects.has(project.id);
    const shouldTruncate = project.description.length > 200;
    
    if (!shouldTruncate || isExpanded) {
      return project.description;
    }
    
    return project.description.substring(0, 300) + "...";
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center mt-[-60px] md:mt-0">
      <motion.div
        variants={fadeInAnimationVariant}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className="mb-11 flex flex-col items-center"
      >
        <h1 className="text-5xl font-bold mb-[20px] md:mb-[60px] uppercase">Projects</h1>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeInAnimationVariant}
              initial="initial"
              transition={{ duration: 0.5, delay: 0.25 + (index * 0.17) }}
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className="max-w-full p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col"
            >
              <div className="w-full h-48 overflow-hidden rounded-t-lg relative">
                <Image 
                  className="object-cover object-center" 
                  src={project.image_url || "/assets/default-project.png"}
                  alt={`${project.title} Screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-6">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {project.title}
                  </h5>
                </div>
                <p
                  className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: getDisplayDescription(project).replace(/\\n/g, "<br />"),
                  }}
                />
                
                {project.description.length > 300 && (
                  <button
                    onClick={() => toggleExpanded(project.id)}
                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium mb-3 self-start transition-colors duration-200"
                  >
                    {expandedProjects.has(project.id) ? "See less" : "See more"}
                  </button>
                )}
              </div>
              
              <div className="px-5 py-2 flex flex-wrap gap-2">
                {project.technologies?.map((tech, techIndex) => (
                  <span 
                    key={`${project.id}-tech-${techIndex}`} 
                    className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto px-5 py-2">
                {project.github_url && (
                  <a
                    className="text-white w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-block"
                    target="_blank"
                    href={project.github_url}
                    rel="noopener noreferrer"
                  >
                    {project.github_url.includes("github.com") ? "Github" : "Show Website"}
                  </a>
                )}

                {project.demo_url && (
                  <a
                    className="text-purple-700 w-full bg-white border border-purple-500 hover:bg-purple-50 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-block"
                    target="_blank"
                    href={project.demo_url}
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}