import React from "react";

export default function Footer() {
	return (
		<footer className="w-full bg-white rounded-lg shadow dark:bg-gray-950">
			<div className="w-full max-w-screen-xxl mx-auto p-4 md:py-8">
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
					<ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:ml-auto">
						<li>
							<a href="https://www.linkedin.com/in/karenjanemana-ay/" target="_blank" className="mr-4 hover:underline md:mr-6">
								LinkedIn
							</a>
						</li>
						<li>
							<a href="https://github.com/Kjm517" target="_blank" className="hover:underline">
								Github
							</a>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 dark:border-gray-700" />
				<span className="block text-sm text-gray-500 text-center dark:text-gray-400">
					© 2025. All Rights Reserved.
					Created with sugar and spice and everything nice ❤️
				</span>
			</div>
		</footer>
	);
}

