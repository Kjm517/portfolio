'use client'
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import axios from 'axios';
import Image from 'next/image';

interface Education {
  id: number;
  institution_name: string;
  degree: string;
  email: string;
  field_of_study: string;
  description: string;
  location: string;
  sort_order: string;
  date: string;
}

interface Experience {
  id: number;
  company_name: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current?: string;
  company_url: string;
  company_logo_url?: string;
  sort_order: number;
  description: string;
}

interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description: string;
  type: 'education' | 'experience';
  sortOrder: number;
  companyUrl?: string;
  logoUrl?: string;
}

export default function Education() {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fadeInAnimationVariant = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.25 }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let combinedItems: TimelineItem[] = [];

        try {
          const educationResponse = await axios.get('/api/education');
          const educationData: Education[] = educationResponse.data;
          
          const educationItems: TimelineItem[] = educationData.map(edu => ({
            id: edu.id,
            title: edu.degree,
            organization: edu.institution_name,
            location: edu.location,
            startDate: edu.date,
            endDate: undefined,
            isCurrent: false,
            description: edu.description,
            type: 'education' as const,
            sortOrder: parseInt(edu.sort_order) || 0
          }));
          
          combinedItems.push(...educationItems);
        } catch (eduError) {
          console.error('Failed to fetch education data:', eduError);
        }

        try {
          const experienceResponse = await axios.get('/api/experience');
          const experienceData: Experience[] = experienceResponse.data;
          
          const experienceItems: TimelineItem[] = experienceData.map(exp => ({
            id: exp.id + 1000, // Offset to avoid ID conflicts
            title: exp.position,
            organization: exp.company_name,
            location: exp.location,
            startDate: exp.start_date,
            endDate: exp.end_date,
            isCurrent: exp.is_current === 'true' || exp.is_current === '1',
            description: exp.description,
            type: 'experience' as const,
            sortOrder: exp.sort_order,
            companyUrl: exp.company_url,
            logoUrl: exp.company_logo_url
          }));
          
          combinedItems.push(...experienceItems);
        } catch (expError) {
          console.error('Failed to fetch experience data:', expError);
        }

        if (combinedItems.length === 0) {
          console.error('No data available from database APIs');
          setError('No education or experience data found. Please check your database.');
          setLoading(false);
          return;
        }


        combinedItems.sort((a, b) => {
          if (a.type === 'education' && b.type === 'experience') return 1;
          if (a.type === 'experience' && b.type === 'education') return -1;
          
          return a.sortOrder - b.sortOrder;
        });
        setTimelineItems(combinedItems);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load timeline data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const formatDateRange = (startDate: string, endDate?: string, isCurrent?: boolean) => {
    const start = formatDate(startDate);
    if (isCurrent || !endDate) {
      return `${start} - Present`;
    }
    return `${start} - ${formatDate(endDate)}`;
  };

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="text-red-500 text-center text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full mt-0 md:mt-[100px]">
      <div className="mb-11 flex flex-col items-center">
        <motion.div
          variants={fadeInAnimationVariant}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}>
          <h1 className="text-5xl font-bold mb-[70px] mx-auto">
            EXPERIENCE & EDUCATIONAL BACKGROUND
          </h1>
        </motion.div>
        
        <div className="space-y-20 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent z-[-1]">
          {timelineItems.map((item, index) => (
            <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border shadow-2xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <span className={`animate-ping absolute inline-flex h-6 w-6 rounded-full bg-violet-800 ${item.isCurrent ? 'opacity-75' : 'opacity-20'}`}></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
                </span>
              </div>

              <motion.div
                variants={fadeInAnimationVariant}
                initial="initial"
                whileInView="animate"
                transition={{ duration: 0.5, delay: 0.25 + (index * 0.1) }}
                viewport={{
                  once: true,
                }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow-2xl dark:bg-gray-800 dark:border-gray-700">
                
                <div className="flex items-center justify-between space-x-2">
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.title}
                    {item.isCurrent && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Current
                      </span>
                    )}
                  </h3>
                </div>
                
                <div className="mb-2 flex items-center space-x-2">
                  {item.logoUrl && (
                    <Image 
                    src={item.logoUrl} 
                    alt={`${item.organization} logo`}
                    width={24}
                    height={24}
                    className="rounded"
                  />
                  )}
                  {item.companyUrl ? (
                    <a 
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-italic tracking-tight text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      {item.organization}
                    </a>
                  ) : (
                    <p className="text-xl font-italic tracking-tight text-gray-900 dark:text-white">
                      {item.organization}
                    </p>
                  )}
                  {item.location && (
                    <span className="text-gray-500 dark:text-gray-400">• {item.location}</span>
                  )}
                </div>
                
                <p className="block mb-2 text-base font-normal leading-none text-gray-400 dark:text-gray-500">
                  {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                </p>
                
                <div className="font-normal text-gray-700 dark:text-gray-400 mb-3">
                  {item.description.split('\n').map((line, lineIndex) => (
                    <p key={lineIndex} className={lineIndex > 0 ? 'mt-2' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
                
                {/* Type badge */}
                <div className="flex justify-between items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.type === 'education' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                  }`}>
                    {item.type === 'education' ? '🎓 Education' : '💼 Work Experience'}
                  </span>
                  
                  {item.companyUrl && (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-sm"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}