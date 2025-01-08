'use client'
import React from "react";
import {motion} from 'framer-motion';

export default function About() {
	const fadeInAnimationVariant = {
		initial: {
			opacity: 0,
			y: 100,
		},
		animate: {
			opacity: 1,
			y: 0,
			transition:{duration: 0.5, delay: 0.25}
		}
	}
	return (
		<div className="h-full w-full flex flex-wrap justify-evenly mt-[-100px] md:mt-0">
			<motion.div 
				variants={fadeInAnimationVariant}
				initial="initial"
				whileInView="animate"
				viewport={{
					once: true,
				}}
			className="flex items-center justify-center my-0">
				{/* <Image
					src="/../assets/my-photo.jpg"
					alt="Profile"
					className="shadow rounded-full m-w-80 h-screen border-non"
				/> */}
			</motion.div>
			<div className="flex flex-col justify-center items-center">
				<motion.div
					variants={fadeInAnimationVariant}
					initial="initial"
					whileInView="animate"
					viewport={{
						once: true,
					}}  
					className="mb-11">
					<h1 className="text-5xl font-bold">ABOUT</h1>
				</motion.div >
				<motion.div 
					variants={fadeInAnimationVariant}
					initial="initial"
					whileInView="animate"
					viewport={{
						once: true,
					}} 
					className="max-w-[950px] rounded overflow-hidden shadow-2xl flex h-auto font-medium text-2xl leading-10 px-7 py-7">
					<p>
						I'm a skilled Software Developer specializing in Android development
						using Android Studio, and proficient in Front-end Web development
						with ReactJS and Angular. Graduated in May 2019 with a degree in
						Information Technology, I've honed my expertise in crafting
						appealing front-end designs and robust Android applications for
						various clients. My passion lies in leveraging the latest
						technologies to deliver exceptional user experiences. I'm committed
						to becoming a full stack developer, with a vision of creating
						seamless interfaces and efficient server architectures. I'm
						dedicated to staying updated on emerging technologies, pushing the
						boundaries of what's possible in development. Join me in crafting
						innovative solutions that exceed expectations and drive growth.
						Let's collaborate to create technological wonders!
						<br />
						<br />
						Excited to potentially work together!
					</p>
				</motion.div>
			</div>
		</div>
	);
}
