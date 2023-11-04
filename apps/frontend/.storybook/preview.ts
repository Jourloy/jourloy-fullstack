import type {Preview} from "@storybook/react";
import "../src/app/globals.css";
import {themes} from "@storybook/theming";

const preview: Preview = {
	parameters: {
		actions: {argTypesRegex: "^on[A-Z].*"},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		darkMode: {
			// Override the default dark theme
			dark: {...themes.dark, appBg: "black"},
			// Override the default light theme
			light: {...themes.normal, appBg: "white"},
			current: "dark",
		},
	},
};

export default preview;
