"use client";
import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { Reveal } from "@/components/utils/Reveal";
import axios from "axios";
import Image from "next/image";

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
        const response = await axios.get("/api/skills");
        setSkills(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch skills data:", err);
        setError("Failed to load skills data. Please check your database.");
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const featuredSkills = skills.filter((skill) => skill.is_featured);

  return (
    <div className="flex flex-col items-center w-full h-full mt-[75px] md:mt-[170px] px-4 bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Name */}
      <Reveal>
        <h1 className="text-4xl md:text-8xl font-bold text-center text-gray-900 dark:text-white">
          Karen Jane Mana-ay
        </h1>
      </Reveal>

      {/* Role */}
      <Reveal>
        <h3 className="typeWriter !font-mono font-bold pt-4 text-purple-700 !text-3xl md:!text-5xl text-center">
          Software Developer
        </h3>
      </Reveal>

      {/* Resume */}
      <Reveal>
        <div className="my-10 md:my-14">
          <a href="/resume.pdf" download rel="noopener noreferrer">
            <button className="bg-violet-600 text-white font-bold px-6 py-4 rounded-xl hover:bg-violet-800 transition">
              Download Resume
            </button>
          </a>
        </div>
      </Reveal>

      {/* Technology Stack Title */}
      <Reveal>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-center">
            Technology Stack
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 text-center">
            A snapshot of the tools and technologies I’m comfortable shipping with.
          </p>
        </div>
      </Reveal>

      {/* Loading / Error / Content */}
      {loading ? (
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
        </div>
      ) : error ? (
        <p className="text-red-500 mt-8 text-center">{error}</p>
      ) : featuredSkills.length === 0 ? (
        <p className="text-gray-500 mt-8 text-center">
          No featured skills found. Please check your database.
        </p>
      ) : (
        <Reveal>
          <div
            className="
              mt-10 max-w-5xl w-full
              flex flex-wrap justify-center gap-6 md:gap-8
            "
          >
            {featuredSkills.map((skill) => (
              <Tooltip
                key={skill.id}
                title={`${skill.name} • ${skill.category}`}
                mouseEnterDelay={0.15}
              >
                <div
                  className="
                    group flex flex-col items-center gap-2
                    cursor-default
                    transition-transform duration-200
                    hover:-translate-y-1
                  "
                >
                  {/* Circular icon */}
                  <div
                    className="
                      w-16 h-16 md:w-20 md:h-20
                      rounded-full
                      flex items-center justify-center
                      bg-white/80 dark:bg-gray-950/80
                      shadow-[0_10px_30px_rgba(15,23,42,0.15)]
                      overflow-hidden
                      transition-shadow duration-200
                      group-hover:shadow-[0_16px_40px_rgba(79,70,229,0.35)]
                    "
                  >
                    <Image
                      src={skill.file_path || "/assets/default-skill.svg"}
                      alt={skill.name}
                      width={52}
                      height={52}
                      className={`
                        object-contain
                        grayscale opacity-70
                        group-hover:grayscale-0
                        group-hover:opacity-100
                        group-hover:scale-110
                        transition-all duration-200
                        ${skill.name.toLowerCase() === 'framer motion' || skill.name.toLowerCase() === 'next.js' 
                          ? 'dark:group-hover:brightness-0 dark:group-hover:invert dark:group-hover:opacity-100' 
                          : ''
                        }
                      `}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/assets/default-skill.svg";
                      }}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className="
                      text-xs md:text-sm font-medium
                      text-gray-700 dark:text-gray-200
                      group-hover:text-purple-600 dark:group-hover:text-purple-400
                      transition-colors duration-200
                      max-w-[100px] md:max-w-[120px] text-center truncate
                    "
                  >
                    {skill.name}
                  </span>
                </div>
              </Tooltip>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
