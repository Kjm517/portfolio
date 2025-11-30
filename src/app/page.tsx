"use client";

import dynamic from 'next/dynamic';

const NavBar = dynamic(() => import('@/components/Navbar/Navbar'), { ssr: false });
const Home = dynamic(() => import('@/components/Home/Home'), { ssr: false });
const About = dynamic(() => import('@/components/About/About'), { ssr: false });
const Education = dynamic(() => import('@/components/Education/Education'), { ssr: false });
const Project = dynamic(() => import('@/components/Projects/Project'), { ssr: false });
const Contacts = dynamic(() => import('@/components/Contacts/Contacts'), { ssr: false });
const SideMenu = dynamic(() => import('@/components/SideMenu/SideMenu'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer/Footer'), { ssr: false });

export default function App() {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div id="home">
        <NavBar />
      </div>
      <div>
        <SideMenu />
      </div>
      <div className='flex justify-between w-full h-full px-4 2xl:px-16 bg-white dark:bg-gray-950 transition-colors duration-300'>
        <Home />
      </div>
      <div className='flex justify-between w-full h-full px-4 2xl:px-16 mt-[200px] bg-white dark:bg-gray-950 transition-colors duration-300' id="about">
        <About />
      </div>
      <div className='flex justify-between w-full h-full px-4 2xl:px-16 mt-[200px] bg-white dark:bg-gray-950 transition-colors duration-300' id="education">
        <Education />
      </div>
      <div className='flex justify-between w-full h-full px-4 2xl:px-16 mt-[200px] bg-white dark:bg-gray-950 transition-colors duration-300' id="project">
        <Project />
      </div>
      <div className='flex justify-between w-full h-full px-4 2xl:px-16 mt-[200px] bg-white dark:bg-gray-950 transition-colors duration-300' id="contacts">
        <Contacts />
      </div>
      <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
        <Footer />
      </div>
    </div>
  );
}