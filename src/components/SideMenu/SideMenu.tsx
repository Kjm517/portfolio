'use client';
import React, { useState } from "react";
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faUserGraduate,
  faLaptop,
  faPhone,
  faTimes,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function Side() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const menuItems = [
    { to: "home", icon: faHouse, label: "Home" },
    { to: "about", icon: faUser, label: "About" },
    { to: "education", icon: faUserGraduate, label: "Education" },
    { to: "project", icon: faLaptop, label: "Projects" },
    { to: "contacts", icon: faPhone, label: "Contact" }
  ];

  return (
    <div>
      {/* Menu Container */}
      <AnimatePresence>
        {isMenuVisible && (
          <motion.div
            className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Backdrop blur */}
            <div className="absolute inset-0 bg-white/20 dark:bg-gray-950/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl"></div>
            
            {/* Menu Items */}
            <div className="relative flex flex-col gap-3 p-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="group relative flex items-center justify-center w-14 h-14 rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border border-white/50 dark:border-gray-600/50 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:border-transparent transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105"
                    activeStyle={{
                      background: 'linear-gradient(135deg, #d9b2e9, #c084fc)',
                      borderColor: 'transparent',
                      transform: 'scale(1.1)',
                      boxShadow: '0 10px 25px rgba(217, 178, 233, 0.4)'
                    }}
                    onClick={() => setMenuVisible(false)}
                  >
                    <FontAwesomeIcon 
                      icon={item.icon} 
                      className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300" 
                    />
                    
                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none">
                      {item.label}
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 dark:border-l-white border-y-4 border-y-transparent"></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-xl z-50 flex items-center justify-center hover:from-purple-600 hover:to-pink-600 hover:scale-110 transition-all duration-300"
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isMenuVisible ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Toggle navigation menu"
      >
        <FontAwesomeIcon 
          icon={isMenuVisible ? faTimes : faEllipsisV} 
          className="text-lg" 
        />
      </motion.button>

      {/* Animated background dots */}
      {isMenuVisible && (
        <motion.div
          className="fixed top-1/2 right-24 transform -translate-y-1/2 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-purple-300/30 rounded-full mb-2"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}