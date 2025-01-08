'use client'
import React from "react";
import {motion} from 'framer-motion';

export default function Education() {
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
				<div className="flex flex-col items-center w-full h-full mt-0 md:mt-[100px]">
		<div className="mb-11 flex flex-col items-center">
				<motion.div
					variants={fadeInAnimationVariant}
					initial="initial"
					whileInView="animate"
					viewport={{
						once: true,
					}}>
					<h1 className="text-5xl font-bold mb-[70px] mx-auto">
						EXPERIENCE & EDUCATIONAL BACKGROUND
					</h1>
				</motion.div>
				<div className="space-y-20 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent z-[-1]">
					<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
						<div className="flex items-center justify-center w-10 h-10 rounded-full border shadow-2xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
							<span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8  ring-white dark:ring-gray-900 dark:bg-blue-900">
								<span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-violet-800 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
							</span>
						</div>

						<motion.div 
							variants={fadeInAnimationVariant}
							initial="initial"
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border shadow-2xl">
							<div className="flex items-center justify-between space-x-2">
								<h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									Android Developer
								</h3>
							</div>
							<p className="mb-2 text-xl font-italic tracking-tight text-gray-900 dark:text-white">
								Forty Degrees Celcius Inc.
							</p>
							<p className="block mb-2 text-base font-normal leading-none text-gray-400 dark:text-gray-700">
								Aug 2022 - Present
							</p>
							<p className="font-normal text-gray-700 dark:text-gray-400">
								Create and test Android apps, follow client specs, and improve
								code quality. Collaborating with design teams, I implement
								UI/UX, ensure app performance, and assess feature feasibility,
								all while maintaining code excellence.
							</p>
						</motion.div>
					</div>

					<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
						<div className="flex items-center justify-center w-10 h-10 rounded-full border text-slate-500 group-[.is-active]:text-emerald-50 shadow-2xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
							<span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-1 ring-2 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-violet-800 opacity-20"></span>
								<span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
							</span>
						</div>

						<motion.div 
							variants={fadeInAnimationVariant}
							initial="initial"
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow-2xl">
							<div className="flex items-center justify-between space-x-2">
								<h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									Quality Assurance Tester
								</h3>
							</div>
							<p className="mb-2 text-xl font-italic tracking-tight text-gray-900 dark:text-white">
								Forty Degrees Celcius Inc.
							</p>
							<p className="block mb-2 text-base font-normal leading-none text-gray-400 dark:text-gray-700">
								Aug 2020 - Sep 2022
							</p>
							<p className="font-normal text-gray-700 dark:text-gray-400">
								Responsible for testing software by creating test plans, running
								tests, and helping developers fix issues. Estimates testing
								tasks and supports the development team.
							</p>
						</motion.div>
					</div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
						<div className="flex items-center justify-center w-10 h-10 rounded-full border text-slate-500 group-[.is-active]:text-emerald-50 shadow-2xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
							<span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8  ring-white dark:ring-gray-900 dark:bg-blue-900">
                                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-violet-800 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
							</span>
						</div>

						<motion.div 
							variants={fadeInAnimationVariant}
							initial="initial"
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow-2xl">
							<div className="flex items-center justify-between space-x-2">
								<h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									Front-End Web Developer
								</h3>
							</div>
							<p className="mb-2 text-xl font-italic tracking-tight text-gray-900 dark:text-white">
								Software Expert Systems
							</p>
							<p className="block mb-2 text-base font-normal leading-none text-gray-400 dark:text-gray-700">
								Jul 2019 - Aug 2020
							</p>
							<p className="font-normal text-gray-700 dark:text-gray-400">
                            Create new user features, maintain the company website, and enhance its performance. Develop reusable code, validate user input, and collaborate with team members and stakeholders for effective results.
							</p>
						</motion.div>
					</div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
						<div className="flex items-center justify-center w-10 h-10 rounded-full border text-slate-500 group-[.is-active]:text-emerald-50 shadow-2xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
							<span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8  ring-white dark:ring-gray-900 dark:bg-blue-900">
                                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-violet-800 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
							</span>
						</div>

						<motion.div 
							variants={fadeInAnimationVariant}
							initial="initial"
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow-2xl">
							<div className="flex items-center justify-between space-x-2">
								<h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									.Net Developer (Internship)
								</h3>
							</div>
							<p className="mb-2 text-xl font-italic tracking-tight text-gray-900 dark:text-white">
                                Skanlog A/S
							</p>
							<p className="block mb-2 text-base font-normal leading-none text-gray-400 dark:text-gray-700">
								Feb 2019 - May 2019 
							</p>
							<p className="font-normal text-gray-700 dark:text-gray-400">
                            Utilize .NET to build client-focused software. Collaborate on complex projects, enhance code adherence, fix errors, and ensure quality. Test, deploy, and improve user-friendly solutions based on feedback. Stay updated on coding and tech changes.
							</p>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}
