"use client";

import React from "react";
import Image from 'next/image';

export default function NavBar() {
 return (
   <>
     <div className="h-20 shadow-xl z-[100] relative">
       <div className="flex justify-between items-center w-full h-full px-2 pl-5 2xl:px-16">
         <div>
           <h3 className="text-2xl md:text-base font-bold">Ren</h3>
           <p className="text-md md:text-sm font-medium mt-[-5px] md:mt-0">Software Developer</p>
         </div>

         <div className="flex flex-row space-x-3.5 mt-0 p-2 mr-0 md:mr-4 md:my-0 scale-110 md:scale-1">
           
           <a
             href="https://github.com/Kjm517"
             target="_blank"
             rel="noopener noreferrer"
             className="cursor-pointer hover:scale-105 ease-in duration-300 block"
           >
             <Image
               src="/assets/ic_github.png"
               alt="GitHub"
               width={40}
               height={40}
             />
           </a>
           
           <a
             href="https://www.linkedin.com/in/karenjanemana-ay/"
             target="_blank"
             rel="noopener noreferrer"
             className="cursor-pointer hover:scale-105 ease-in duration-300 block"
           >
             <Image
               src="/assets/ic_linkedin.png"
               alt="LinkedIn"
               width={40}
               height={40}
             />
           </a>
           
           <a
             href="/resume.pdf"
             download="Resume"
             rel="noopener noreferrer"
           >
             <button className="bg-violet-600 text-white font-bold py-2 px-4 rounded hidden md:block">
               Download Resume
             </button>
           </a>
         </div>
       </div>
     </div>
   </>
 );
}