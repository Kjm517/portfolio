'use client';
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  github_url?: string;
  website_url?: string;
  technologies?: string[];
}

export default function Project() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter projects based on search
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies?.some(tech => 
      tech.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (filteredProjects.length === 0) return;
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => {
        const newIndex = Math.min(prev + 1, filteredProjects.length - 1);
        setSelectedProject(filteredProjects[newIndex]);
        return newIndex;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => {
        const newIndex = Math.max(prev - 1, 0);
        setSelectedProject(filteredProjects[newIndex]);
        return newIndex;
      });
    } else if (e.key === "Enter" && selectedProject) {
      if (selectedProject.website_url) {
        window.open(selectedProject.website_url, "_blank");
      } else if (selectedProject.github_url) {
        window.open(selectedProject.github_url, "_blank");
      }
    }
  }, [filteredProjects, selectedProject]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/projects');
        setProjects(response.data);
        if (response.data.length > 0) {
          setSelectedProject(response.data[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Update selected project when filter changes
  useEffect(() => {
    if (filteredProjects.length > 0 && !filteredProjects.includes(selectedProject!)) {
      setSelectedProject(filteredProjects[0]);
      setSelectedIndex(0);
    }
  }, [filteredProjects, selectedProject]);

  const handleProjectSelect = (project: Project, index: number) => {
    setSelectedProject(project);
    setSelectedIndex(index);
    setIsMobileDetailOpen(true);
  };

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

  const fadeInFromLeftVariant = {
    initial: {
      opacity: 0,
      x: -20,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  };

  const fadeInFromRightVariant = {
    initial: {
      opacity: 0,
      x: 20,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  };

  const fadeInFromTopVariant = {
    initial: {
      opacity: 0,
      y: -20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900">
      {/* Section Header */}
      <div className="text-center py-12 px-4">
        <motion.h1
          variants={fadeInFromTopVariant}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white uppercase"
        >
          Projects
        </motion.h1>
        <motion.p
          variants={fadeInAnimationVariant}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-500 dark:text-gray-400 mt-3"
        >
          A collection of my work and side projects
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
          
          {/* Left Panel - Project List */}
          <motion.div
            variants={fadeInFromLeftVariant}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-[380px] flex-shrink-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Projects</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {filteredProjects.length} projects • Use ↑↓ to navigate
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>

            {/* Project List */}
            <div ref={listRef} className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-3 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                    <span className="text-gray-500 text-sm">Loading projects...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-red-500">{error}</p>
                  </div>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="flex items-center justify-center h-full py-12">
                  <div className="text-center">
                    <p className="text-gray-500">No projects found</p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      Clear search
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 space-y-1">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={fadeInAnimationVariant}
                      initial="initial"
                      whileInView="animate"
                      viewport={{
                        once: true,
                      }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => handleProjectSelect(project, index)}
                      className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedProject?.id === project.id
                          ? "bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700/50 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Thumbnail */}
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                          <Image
                            src={project.image_url || "/assets/default-project.png"}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-sm truncate transition-colors ${
                            selectedProject?.id === project.id
                              ? "text-purple-700 dark:text-purple-400"
                              : "text-gray-900 dark:text-white"
                          }`}>
                            {project.title}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-xs truncate mt-0.5">
                            {project.description}
                          </p>
                          <div className="flex gap-1 mt-1.5 overflow-hidden">
                            {project.technologies?.slice(0, 2).map((tech, techIndex) => (
                              <span
                                key={`${project.id}-tech-${techIndex}`}
                                className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-md whitespace-nowrap"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies && project.technologies.length > 2 && (
                              <span className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-md">
                                +{project.technologies.length - 2}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        {selectedProject?.id === project.id && (
                          <div className="self-center">
                            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Panel - Project Detail */}
          <motion.div
            variants={fadeInFromRightVariant}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:flex flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Hero Image */}
                  <div className="relative h-[280px] overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={selectedProject.image_url || "/assets/default-project.png"}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Quick Action Badges */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {selectedProject.github_url && (
                        <a
                          href={selectedProject.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg flex items-center gap-1.5 hover:bg-white transition-colors"
                        >
                          <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Source</span>
                        </a>
                      )}
                      {selectedProject.website_url && (
                        <a
                          href={selectedProject.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-purple-600 rounded-lg flex items-center gap-1.5 hover:bg-purple-700 transition-colors"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span className="text-sm font-medium text-white">Live Demo</span>
                        </a>
                      )}
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-2xl xl:text-3xl font-bold text-white">
                        {selectedProject.title}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 xl:p-8 overflow-y-auto">
                    {/* Technologies */}
                    <motion.div 
                      className="mb-6"
                      variants={fadeInAnimationVariant}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies?.map((tech, index) => (
                          <motion.span
                            key={`detail-tech-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div 
                      className="mb-8"
                      variants={fadeInAnimationVariant}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        About This Project
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {selectedProject.description}
                      </p>
                    </motion.div>

                    {/* Action Buttons */}
                    {selectedProject.website_url && (
                      <motion.div 
                        className="flex gap-3"
                        variants={fadeInAnimationVariant}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <motion.a
                          href={selectedProject.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/25"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          View Website
                        </motion.a>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Select a project to view details</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Mobile Detail Modal */}
      <AnimatePresence>
        {isMobileDetailOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileDetailOpen(false)}
              className="absolute top-4 left-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Content */}
            <div className="h-full overflow-y-auto">
              {/* Hero Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                  src={selectedProject.image_url || "/assets/default-project.png"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent" />
              </div>

              {/* Details */}
              <div className="p-6 -mt-12 relative">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedProject.title}
                </h2>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies?.map((tech, index) => (
                    <span
                      key={`mobile-tech-${index}`}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 whitespace-pre-line">
                  {selectedProject.description}
                </p>

                {selectedProject.website_url && (
                  <div className="flex flex-col gap-3">
                    <a
                      href={selectedProject.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}