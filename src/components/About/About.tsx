'use client'
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import axios from 'axios';

interface Profile {
  id: number;
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  github_url?: string;
  linkedin_url?: string;
  website_url?: string;
}

interface Certification {
  id: number;
  title: string;
  description?: string;
  certificate_url?: string;
  issuer?: string;
  issue_date?: string;
  is_featured: boolean;
}

export default function About() {
  // State for profile and certifications
  const [profile, setProfile] = useState<Profile | null>(null);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString; 
    }
  };

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
        
        const profileResponse = await axios.get('/api/profile');
        setProfile(profileResponse.data);

        try {
          const certificationsResponse = await axios.get('/api/certifications');
          setCertifications(certificationsResponse.data);
        } catch (certError) {
          console.error('Failed to fetch certifications data:', certError);
          setCertifications([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load profile data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <div className="h-full w-full flex flex-col justify-center items-center mt-[-100px] md:mt-0 px-4">
      <div className="w-full max-w-6xl flex flex-col justify-center items-center">
        <motion.div
          variants={fadeInAnimationVariant}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          className="mb-11">
          <h1 className="text-5xl font-bold">ABOUT</h1>
        </motion.div>

        <motion.div
          variants={fadeInAnimationVariant}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          className="w-full rounded overflow-hidden shadow-2xl flex h-auto font-medium text-2xl leading-10 px-7 py-7 bg-white dark:bg-gray-800">
          <div className="text-gray-700 dark:text-gray-300">
            {profile && (
              <div className="mb-6">
              </div>
            )}
            
            <p>
              {profile?.bio}
            </p>
            <br />
            <br />
            <p className="font-bold text-purple-600 dark:text-purple-400">
              Let’s build something great together!
            </p>

            {/* Social Links */}
            {/* {profile && (profile.github_url || profile.linkedin_url || profile.website_url) && (
              <div className="mt-6 flex gap-4">
                {profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    GitHub
                  </a>
                )}
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    LinkedIn
                  </a>
                )}
                {profile.website_url && (
                  <a
                    href={profile.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    Website
                  </a>
                )}
              </div>
            )} */}
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-6xl flex flex-col justify-center items-center mt-20">
        <motion.div
          variants={fadeInAnimationVariant}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          className="mb-11">
          <h1 className="text-5xl font-bold">CERTIFICATIONS & AWARDS</h1>
        </motion.div>

        <div className="w-full space-y-6">
          {certifications.length > 0 ? (
            certifications.filter(cert => cert.is_featured).map((certification, index) => (
              <motion.div
                key={certification.id}
                variants={fadeInAnimationVariant}
                initial="initial"
                whileInView="animate"
                transition={{ duration: 0.5, delay: 0.25 + (index * 0.1) }}
                viewport={{
                  once: true,
                }}
                className="w-full rounded overflow-hidden shadow-2xl flex items-center justify-between h-auto font-medium text-2xl leading-10 px-7 py-7 bg-white dark:bg-gray-800">
                <div className="text-gray-700 dark:text-gray-300 flex-1">
                  <p className="text-xl font-semibold">{certification.title}</p>
                  {certification.issuer && (
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
                      Issued by {certification.issuer}
                    </p>
                  )}
                  {certification.issue_date && (
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
                      {formatDate(certification.issue_date)}
                    </p>
                  )}
                </div>
                {certification.certificate_url && (
                  <a
                    className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4 flex-shrink-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={certification.certificate_url}
                  >
                    View Certificate
                  </a>
                )}
              </motion.div>
            ))
          ) : (
            <div className="w-full rounded overflow-hidden shadow-2xl flex items-center justify-center h-auto font-medium text-xl leading-10 px-7 py-7 bg-white dark:bg-gray-800">
              <p className="text-gray-500 dark:text-gray-400">
                No certifications data available. Please check your database.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}