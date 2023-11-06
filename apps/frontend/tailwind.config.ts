/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: {
		files: [
			"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
			"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		],
	},
	theme: {
		extend: {
			colors: {
				black: "#000000",
				white: "#ffffff",

				lightBackgorundColor: "#f3f2f2",
				lightPrimaryColor: "#0d3f96",
				lightSecondaryColor: "#d4e1cc",
				lightAccentColor: "#7545a5",
				lightTextColor: "#0e0901",

				darkBackgorundColor: "#0d0c0c",
				darkPrimaryColor: "#6a9bf2",
				darkSecondaryColor: "#8cd988",
				darkAccentColor: "#781cb2",
				darkTextColor: "#fef9f1",
			},
		},
	},
	plugins: [],
};