"use client";
import React from "react";
import { Tooltip } from 'antd';
import { Reveal } from "@/components/utils/Reveal";

export default function TypingEffect() { 
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
            <a href="/../assets/resume.pdf" download="Resume" target='_blank'>
                <button className="bg-violet-600 text-white font-bold py-4 px-4 delay-150 hover:bg-violet-800 duration-300 rounded-lg">Download Resume</button>
            </a>
        </div>

        </Reveal>
        <Reveal><h2 className="text-4xl font-bold uppercase">Technology Stack</h2></Reveal>
        <div className="flex flex-wrap justify-between gap-4 mt-5 md:mt-9">
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="Android Studio"><img src="/../assets/android-studio.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="Angular"><img src="/../assets/angular.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="React.js"><img src="/../assets/reactjs.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="Next.js"><img src="/../assets/nextjs.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-inout duration-150">
                <Tooltip title="Bootstrap"><img src="/../assets/bootstrap.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="CSS"><img src="/../assets/css.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="HTML"><img src="/../assets/html.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="Java"><img src="/../assets/java.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="Javascript"><img src="/../assets/javascript.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="MySQL"><img src="/../assets/mysql.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="Firebase"><img src="/../assets/firebase.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="SASS"><img src="/../assets/sass.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="TailWind"><img src="/../assets/tailwind.svg" height="80" width="80" /></Tooltip>
            </div>
            <div className="slide flex flex-col items-center cursor-pointer hover:scale-150 ease-out duration-150">
                <Tooltip title="Framer"><img src="/../assets/framer.svg" height="80" width="80" /></Tooltip>
            </div>
        </div>

    </div>
);
}
