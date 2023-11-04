import {PropsWithChildren} from "react";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";

type TProps = {
	/**
	 * Default: `filled`
	 */
	variant?: `filled` | `outline` | `invisible` | `clear`;

	/**
	 * Default: `square`
	 */
	form?: `circle` | `pill` | `square`;

	/**
	 * Default: `primary`
	 */
	color?: `accent` | `secondary` | `primary` | `white`;

	/**
	 * Defailt: `false`
	 */
	light?: boolean;

	/**
	 * Default: false
	 */
	compact?: boolean;

	/**
	 * Default: false
	 */
	disabled?: boolean;

	/**
	 * Default: false
	 */
	glass?: boolean;

	/**
	 * Default: fit-content
	 */
	width?: string;

	/**
	 * Default: `8px`
	 */
	paddingX?: string;

	/**
	 * Default: `8px`
	 */
	paddingY?: string;

	className?: string;
};

export default function Badge(props: PropsWithChildren<TProps>) {
	const variant = props.variant || `filled`;
	let color = props.color || `primary`;
	const form = props.form || `square`;
	const compact = props.compact || false;
	const width = props.width || `fit-content`;
	const paddingX = props.paddingX || `8px`;
	const paddingY = props.paddingY || `8px`;
	const light = props.light || false;

	let className = `inline-flex items-center text-sm font-medium text-center transition-all duration-[100ms]`;

	const variants = {
		filled: {
			light: {
				primary: `bg-lightPrimaryColor text-white`,
				accent: `bg-lightAccentColor text-white`,
				secondary: `bg-lightSecondaryColor text-dark`,
				white: `bg-black text-white`,
			},
			dark: {
				primary: `bg-PrimaryColor text-black`,
				accent: `bg-AccentColor text-white`,
				secondary: `bg-SecondaryColor text-white`,
				white: `bg-white text-black`,
			},
		},
		outline: {
			light: {
				primary: `border border-lightPrimaryColor text-lightPrimaryColor`,
				accent: `border border-lightAccentColor text-lightAccentColor`,
				secondary: `border border-lightSecondaryColor text-lightSecondaryColor`,
				white: `border border-black text-black`,
			},
			dark: {
				primary: `border border-PrimaryColor text-PrimaryColor`,
				accent: `border border-AccentColor text-AccentColor`,
				secondary: `border border-SecondaryColor text-SecondaryColor`,
				white: `border border-white text-white`,
			},
		},
		invisible: {
			light: {
				primary: `text-white bg-transparent`,
				accent: `text-white bg-transparent`,
				secondary: `text-white bg-transparent`,
				white: `text-white bg-transparent`,
			},
			dark: {
				primary: `text-white bg-transparent`,
				accent: `text-white bg-transparent`,
				secondary: `text-white bg-transparent`,
				white: `text-white bg-transparent`,
			},
		},
		clear: {
			light: {
				primary: `bg-transparent`,
				accent: `bg-transparent`,
				secondary: `bg-transparent`,
				white: `bg-transparent`,
			},
			dark: {
				primary: `bg-transparent`,
				accent: `bg-transparent`,
				secondary: `bg-transparent`,
				white: `bg-transparent`,
			},
		},
	};

	className += ` ${variants[variant][light ? `light` : `dark`][color]}`;

	const forms = {
		square: `rounded-md`,
		circle: `rounded-full`,
		pill: `rounded-xl`,
	};

	className += ` ${forms[form]}`;

	if (props.className) className += ` ${props.className}`;


	return (
		<div
			className={className}
			style={{
				width: width,
				paddingBlock: compact ? 0 : paddingX,
				paddingInline: compact ? 0 : paddingY,
			}}
		>
			{props.children}
		</div>
	);
}
