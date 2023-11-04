import type {Meta, StoryObj} from "@storybook/react";
import Button from "./index";

export default {
	title: "Components/Actions/Button",
	tags: ["autodocs"],
	component: Button,
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
};

type Story = StoryObj<typeof Button>;

export const Light: Story = {
	name: `Light`,
	args: {},
	render: args => (
		<div className={`bg-white p-5 w-full h-[100px]`}>
			<Button {...args}>Кнопка светлой версии</Button>
		</div>
	),
};

export const Dark: Story = {
	name: `Dark`,
	args: {},
	render: args => (
		<div className={`dark bg-black p-5 w-full h-[100px]`}>
			<Button {...args}>Кнопка темной версии</Button>
		</div>
	),
};
