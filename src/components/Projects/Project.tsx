'use client';
import React from "react";
import { motion } from "framer-motion";

export default function Project() {
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

	return (
		<div className="h-full w-full flex flex-col justify-center items-center mt-[-60px] md:mt-0">
			<motion.div
				variants={fadeInAnimationVariant}
				initial="initial"
				whileInView="animate"
				viewport={{
					once: true,
				}}
				className="mb-11 flex flex-col items-center"
			>
				<h1 className="text-5xl font-bold mb-[20px] md:mb-[60px] uppercase">Projects</h1>
			</motion.div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-4">
				<motion.div
					variants={fadeInAnimationVariant}
					initial="initial"
					transition={{ duration: 0.5, delay: 0.25 }}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					className="max-w-full p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col"
				>
					<div className="w-full h-48 overflow-hidden rounded-t-lg">
						<img className="w-full h-full object-cover object-center" src="/../assets/image4.png" alt="BisTalk v2 Screenshot" />
					</div>
					<div className="p-5 flex flex-col flex-grow">
						<div className="mb-6">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								BisTalk v2 (Pocket Translator)
							</h5>
						</div>
						<p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
							A mother tongue based speech to text application that translates different languages similar to google translate.
						</p>
					</div>
					
					<div className="px-5 py-2 flex flex-wrap gap-2">
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Android Studio
						</span>
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Java
						</span>
					</div>

					<div className="mt-auto px-5 py-2">
						<a
							type="button"
							className="text-white w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
							target="_blank"
							href="https://github.com/Kjm517/pocket-translator"
						>
							Github
						</a>
					</div>
				</motion.div>

				<motion.div
					variants={fadeInAnimationVariant}
					initial="initial"
					transition={{ duration: 0.5, delay: 0.42 }}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					className="max-w-full p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col"
				>
					<div className="w-full h-48 overflow-hidden rounded-t-lg">
						<img className="w-full h-full object-cover object-center" src="/../assets/image4.png" alt="BisTalk Capstone Screenshot" />
					</div>
					<div className="p-5 flex flex-col flex-grow">
						<div className="mb-6">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							   BisTalk: A mother tongue speech-to-text mobile application for first graders
							</h5>
						</div>
						<p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
							A mother tongue based speech to text application utilized as an
							E-learning tool intended for first graders. This app helps teachers demonstrate simple teaching tools for students to learn 
							English to Cebuano or vice versa. 
						</p>
					</div>

					<div className="px-5 py-2 flex flex-wrap gap-2">
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Android Studio
						</span>
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Java
						</span>
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Capstone
						</span>
					</div>

					<div className="mt-auto px-5 py-2">
						<a
							type="button"
							className="text-white w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
							target="_blank"
							href="https://github.com/Kjm517/capstone"
						>
							Github
						</a>
					</div>
				</motion.div>

				<motion.div
					variants={fadeInAnimationVariant}
					initial="initial"
					transition={{ duration: 0.5, delay: 0.59 }}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					className="max-w-full p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col"
				>
					<div className="w-full h-48 overflow-hidden rounded-t-lg">
						<img className="w-full h-full object-cover object-center" src="/../assets/barkepedia_logo.png" alt="Barkepedia Logo" />
					</div>
					<div className="p-5 flex flex-col flex-grow">
						<div className="mb-6">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								Barkepedia
							</h5>
						</div>
						<p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
							A comprehensive dog breed encyclopedia application that provides detailed information about various dog breeds, their characteristics, and care requirements.
						</p>
					</div>

					<div className="px-5 py-2 flex flex-wrap gap-2">
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Android Studio
						</span>
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Kotlin
						</span>
					</div>

					<div className="mt-auto px-5 py-2">
						<a
							type="button"
							className="text-white w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
							target="_blank"
							href="https://github.com/Kjm517/barkepedia"
						>
							Github
						</a>
					</div>
				</motion.div>
				<motion.div
					variants={fadeInAnimationVariant}
					initial="initial"
					transition={{ duration: 0.5, delay: 0.59 }}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					className="max-w-full p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col"
				>
					<div className="w-full h-48 overflow-hidden rounded-t-lg">
						<img className="w-full h-full object-cover object-center" src="/../assets/barkepedia_logo.png" alt="Barkepedia Logo" />
					</div>
					<div className="p-5 flex flex-col flex-grow">
						<div className="mb-6">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								Personal Portfolio
							</h5>
						</div>
						<p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
							A comprehensive dog breed encyclopedia application that provides detailed information about various dog breeds, their characteristics, and care requirements.
						</p>
					</div>

					<div className="px-5 py-2 flex flex-wrap gap-2">
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							React.js
						</span>
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Next.js
						</span>
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Typescript
						</span>
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Tailwind CSS
						</span>
					</div>

					<div className="mt-auto px-5 py-2">
						<a
							type="button"
							className="text-white w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
							target="_blank"
							href="https://github.com/Kjm517/portfolio"
						>
							Github
						</a>
					</div>
				</motion.div>
				<motion.div
					variants={fadeInAnimationVariant}
					initial="initial"
					transition={{ duration: 0.5, delay: 0.59 }}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					className="max-w-full p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col"
				>
					<div className="w-full h-48 overflow-hidden rounded-t-lg">
						<img className="w-full h-full object-cover object-center" src="/../assets/barkepedia_logo.png" alt="Barkepedia Logo" />
					</div>
					<div className="p-5 flex flex-col flex-grow">
						<div className="mb-6">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								Silverius Portfolio
							</h5>
						</div>
						<p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
							A comprehensive dog breed encyclopedia application that provides detailed information about various dog breeds, their characteristics, and care requirements.
						</p>
					</div>

					<div className="px-5 py-2 flex flex-wrap gap-2">
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Vue.js
						</span>
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Laravel
						</span>
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Typescript
						</span>
						<span className="bg-purple-400 text-white text-xs font-medium px-3 py-2 rounded-full">
							Tailwind CSS
						</span>
					</div>

					<div className="mt-auto px-5 py-2">
						<a
							type="button"
							className="text-white w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
							target="_blank"
							href="https://github.com/Kjm517/portfolio"
						>
							Github
						</a>
					</div>
				</motion.div>
			</div>
		</div>
	);
}