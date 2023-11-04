import type {StorybookConfig} from "@storybook/nextjs";
import * as path from "path";

const config: StorybookConfig = {
	stories: [`../src/**/*.mdx`, `../src/**/*.stories.@(js|jsx|ts|tsx)`],
	addons: [
		`@storybook/addon-links`,
		`@storybook/addon-essentials`,
		`@storybook/addon-interactions`,
		`storybook-dark-mode`,
		{
			name: `@storybook/addon-styling`,
			options: {
				postCss: true,
			},
		},
	],
	framework: {
		name: `@storybook/nextjs`,
		options: {
			nextConfigPath: path.resolve(__dirname, "../next.config.js"),
		},
	},
	docs: {
		autodocs: `tag`,
	},
	core: {
		disableTelemetry: true,
	},
	webpackFinal: async (config, {configType}) => {
		config.resolve!.modules = [path.resolve(__dirname, ".."), "node_modules"];

		config.resolve!.alias = {
			...config.resolve!.alias,
			"@": path.resolve(__dirname, "../src"),
		};

		return config;
	},
};
export default config;
