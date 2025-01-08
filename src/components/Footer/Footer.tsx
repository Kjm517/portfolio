import React from "react";

export default function Footer() {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<footer className="w-full bg-white rounded-lg shadow dark:bg-gray-900 m-4">
				<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
					<div className="flex flex-row sm:items-center sm:justify-between">
						<a
							href="/"
							className="flex items-center mb-4 sm:mb-0"
						>
							<img
								src="/../assets/laptop.png"
								className="h-8 mr-3"
								alt="Flowbite Logo"
							/>
							<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
								Karen Mana-ay
							</span>
						</a>
						<ul className="flex flex-wrap items-center mb-6 text-sm mx-auto md:mx-0 my-auto md:my-0 mt-2 md:mt-0 ml-7 md:ml-0 font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
							<li>
								<a href="https://www.linkedin.com/in/karenjanemana-ay/" target="_blank" className="mr-4 hover:underline md:mr-6 ">
									LinkedIn
								</a>
							</li>
							<li>
								<a href="https://github.com/Kjm517" target="_blank" className="mr-4 hover:underline md:mr-6">
									Github
								</a>
							</li>
						</ul>
					</div>
					<hr className="my-6 border-gray-200 mx-auto dark:border-gray-700 lg:my-8" />
					<span className="block text-sm text-gray-500 text-center dark:text-gray-400">
						© 2023{" "}
						. All Rights Reserved.
					</span>
				</div>
			</footer>
		</div>
	);
}
