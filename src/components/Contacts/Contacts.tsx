"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import ContactAnim from "../../../public/anim/contact-us.json";

interface Profile {
  id: number;
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  mobile_number: string;
}

export default function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

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

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/profile');
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      label: "Email",
      value: profile?.email || "",
      action: () => window.open(`mailto:${profile?.email}`, '_blank'),
      copyValue: profile?.email || "",
      description: "Send me an email"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      label: "Phone",
      value: profile?.mobile_number || "",
      action: () => window.open(`tel:${profile?.mobile_number}`, '_blank'),
      copyValue: profile?.mobile_number || "",
      description: "Give me a call"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      label: "Location",
      value: profile?.location || "",
      action: () => {
        const query = encodeURIComponent(profile?.location || "");
        window.open(`https://www.google.com/maps/search/${query}`, '_blank');
      },
      copyValue: profile?.location || "",
      description: "View on map"
    }
  ];

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col lg:flex-row justify-center items-center mt-[-70px] md:mt-[-50px] px-4 bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Content Section */}
      <div className="w-full lg:w-1/2 max-w-2xl">
        <motion.div
          variants={fadeInAnimationVariant}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          className="text-center lg:text-left mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-purple-600 dark:text-purple-400">
            Let&apos;s Connect
          </h1>
          
          {profile && (
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-2">
                {profile.name}
              </h2>
              <p className="text-lg text-purple-600 dark:text-purple-400 font-medium mb-4">
                {profile.title}
              </p>
            </div>
          )}
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          className="space-y-4"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              variants={fadeInAnimationVariant}
              className="group relative"
            >
              <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {method.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {method.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {method.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {/* Action Button */}
                  <button
                    onClick={method.action}
                    className="p-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200"
                    title={`Open ${method.label.toLowerCase()}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </button>
                  
                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(method.copyValue, method.label)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="Copy to clipboard"
                  >
                    {copiedItem === method.label ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={fadeInAnimationVariant}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            💬 Let&apos;s Start a Conversation
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I&apos;m always excited to connect with new people and explore opportunities for collaboration. 
            Whether you have a project in mind, want to discuss ideas, or just want to say hello, 
            I&apos;d love to hear from you!
          </p>
        </motion.div>
      </div>

      {/* Animation Section */}
      <motion.div
        variants={fadeInAnimationVariant}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className="w-full lg:w-3/5 max-w-2xl mt-8 lg:mt-0"
      >
        <Lottie 
          animationData={ContactAnim} 
          className="w-full h-auto scale-110"
        />
      </motion.div>
    </div>
  );
}