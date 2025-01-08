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
  faBars 
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function Side() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <div>

      <motion.div
        className={`fixed top-1/4 right-0 w-16 h-auto bg-white border border-gray-200 rounded-l-full dark:bg-gray-700 dark:border-gray-600 shadow-lg z-50 ${isMenuVisible ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-6 p-2">
          <Link
            activeClass="active"
            to="home"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            className="flex flex-col items-center justify-center h-16 hover:bg-purple-400 rounded-l-full"
          >
            <FontAwesomeIcon icon={faHouse} className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="sr-only">Home</span>
          </Link>

          <Link
            activeClass="active"
            to="about"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            className="flex flex-col items-center justify-center h-16 hover:bg-purple-400 rounded-l-full"
          >
            <FontAwesomeIcon icon={faUser} className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="sr-only">About</span>
          </Link>

          <Link
            activeClass="active"
            to="education"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            className="flex flex-col items-center justify-center h-16 hover:bg-purple-400 rounded-l-full"
          >
            <FontAwesomeIcon icon={faUserGraduate} className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="sr-only">Education</span>
          </Link>

          <Link
            activeClass="active"
            to="project"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            className="flex flex-col items-center justify-center h-16 hover:bg-purple-400 rounded-l-full"
          >
            <FontAwesomeIcon icon={faLaptop} className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="sr-only">Projects</span>
          </Link>

          <Link
            activeClass="active"
            to="contacts"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            className="flex flex-col items-center justify-center h-16 hover:bg-purple-400 rounded-l-full"
          >
            <FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="sr-only">Contact</span>
          </Link>
        </div>
      </motion.div>

      <button
        className="fixed bottom-8 right-8 p-4 bg-purple-600 text-white rounded-full shadow-lg z-50"
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </button>
    </div>
  );
}
