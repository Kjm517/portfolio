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
					<p className="text-gray-700 dark:text-gray-300">
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
					<motion.div 
						variants={fadeInAnimationVariant}
						initial="initial"
						whileInView="animate"
						viewport={{
							once: true,
						}} 
						className="w-full rounded overflow-hidden shadow-2xl flex items-center justify-between h-auto font-medium text-2xl leading-10 px-7 py-7 bg-white dark:bg-gray-800">
						<p className="text-gray-700 dark:text-gray-300 flex-1">
							Kotlin for Java Developers
						</p>
						<a
							type="button"
							className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4 flex-shrink-0"
							target="_blank"
							href="https://www.coursera.org/account/accomplishments/verify/TACBOUSKZDYY"
						>
							View Certificate
						</a>
					</motion.div>
					
					<motion.div 
						variants={fadeInAnimationVariant}
						initial="initial"
						whileInView="animate"
						viewport={{
							once: true,
						}} 
						className="w-full rounded overflow-hidden shadow-2xl flex items-center justify-between h-auto font-medium text-2xl leading-10 px-7 py-7 bg-white dark:bg-gray-800">
						<p className="text-gray-700 dark:text-gray-300 flex-1">
							Android Development Certificate
						</p>
						<a
							type="button"
							className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4 flex-shrink-0"
							target="_blank"
							href="#"
						>
							View Certificate
						</a>
					</motion.div>

					{/* Add more certification cards as needed */}
					<motion.div 
						variants={fadeInAnimationVariant}
						initial="initial"
						whileInView="animate"
						viewport={{
							once: true,
						}} 
						className="w-full rounded overflow-hidden shadow-2xl flex items-center justify-between h-auto font-medium text-2xl leading-10 px-7 py-7 bg-white dark:bg-gray-800">
						<p className="text-gray-700 dark:text-gray-300 flex-1">
							Java Programming Certificate
						</p>
						<a
							type="button"
							className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4 flex-shrink-0"
							target="_blank"
							href="#"
						>
							View Certificate
						</a>
					</motion.div>
				</div>
			</div>
		</div>
	);
}