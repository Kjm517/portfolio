"use client";
import React, { useState, useEffect } from "react";
import { Tooltip } from 'antd';
import { Reveal } from "@/components/utils/Reveal";
import axios from 'axios';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency_level: number;
  is_featured: boolean;
  file_path: string;
}

export default function TypingEffect() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/skills');
        setSkills(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch skills data:', err);
        setError('Failed to load skills data. Please check your database.');
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const featuredSkills = skills.filter(skill => skill.is_featured);

  return (
    <div className="flex flex-col items-center w-full h-full mt-[75px] md:mt-[170px]">
      <Reveal>
        <div>
          <h1 className="text-4xl md:text-8xl font-bold">Karen Jane Mana-ay</h1>   
        </div>
      </Reveal>
      
      <Reveal>
        <div className="mb-7 md:mb-11">
          <h3 className="typeWriter !font-mono font-bold pt-5 text-purple-700 !text-3xl md:!text-5xl">
            Software Developer
          </h3>
        </div>
      </Reveal>
      
      <Reveal>
        <div className="mb-[80px] md:mb-[130px]">
          <a href="/assets/resume.pdf" download="Karen Jane Mana-ay - Resume" target='_blank'>
            <button className="bg-violet-600 text-white font-bold py-4 px-4 delay-150 hover:bg-violet-800 duration-300 rounded-lg">
              Download Resume
            </button>
          </a>
        </div>
      </Reveal>
      
      <Reveal>
        <h2 className="text-4xl font-bold uppercase">Technology Stack</h2>
      </Reveal>
      
      {loading ? (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-8">
          <p>{error}</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 mt-5 md:mt-9 max-w-4xl">
          {featuredSkills.length > 0 ? (
            featuredSkills.map((skill, index) => (
              <Reveal key={skill.id}>
                <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150 p-2">
                  <Tooltip 
                    title={`${skill.name}`}
                  >
                    <div className="relative">
                      <img 
                        src={skill.file_path || '/assets/default-skill.svg'} 
                        alt={skill.name}
                        height="80" 
                        width="80"
                        onError={(e) => {
                          // Fallback to a default icon if the file path doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.src = '/assets/default-skill.svg';
                        }}
                      />
                    </div>
                  </Tooltip>
                </div>
              </Reveal>
            ))
          ) : (
            <div className="text-gray-500 text-center mt-8">
              <p>No featured skills found. Please check your database.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}