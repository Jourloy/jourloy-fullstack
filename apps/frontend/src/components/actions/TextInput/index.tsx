"use client";

interface ITextInputProps {
	/**
	 * Default: `default`
	 */
	variant?: `default` | `outline` | `inline`;

	/**
	 * Default: `primary`
	 */
	color?: `primary` | `secondary` | `accent` | `white`;

	/**
	 * Default: `false`
	 */
	light?: boolean;

	// Label
	label?: string;
	labelProps?: React.HTMLAttributes<HTMLParagraphElement>;
	labelClassName?: string;

	// Description
	description?: string;
	descriptionProps?: React.HTMLAttributes<HTMLParagraphElement>;
	descriptionClassName?: string;

	// Error
	error?: string;
	errorProps?: React.HTMLAttributes<HTMLParagraphElement>;
	errorClassName?: string;

	// Input
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	inputClassName?: string;

	// Main div
	className?: string;
}

export default function TextInput(props: ITextInputProps) {
	let className = `flex flex-col`;
	let inputClassName = `rounded-md h-[40px]`;
	let labelClassName = `text-[15px]`;
	let descriptionClassName = `text-[15px] text-neutral-500 mb-[5px]`;
	let errorClassName = `text-red-500 text-[13px]`;

	const variant = props.variant || `default`;
	const color = props.color || `primary`;
	const theme = props.light ? `light` : `dark`;

	const variants = {
		default: {
			light: {
				primary: `Not ready`,
				accent: `Not ready`,
				secondary: `Not readyr`,
				white: `Not ready`,
			},
			dark: {
				primary: `Not ready`,
				accent: `Not ready`,
				secondary: `Not readyr`,
				white: `Not ready`,
			},
		},
		outline: {
			light: {
				primary: `Not ready`,
				accent: `Not ready`,
				secondary: `Not readyr`,
				white: `Not ready`,
			},
			dark: {
				primary: `border-darkPrimaryColor/20 hover:border-darkPrimaryColor/50 focus:border-darkPrimaryColor text-neutral-500 hover:text-neutral-300 focus:text-white`,
				accent: `border-darkAccentColor/20 hover:border-darkAccentColor/50 focus:border-darkAccentColor text-neutral-500 hover:text-neutral-300 focus:text-white`,
				secondary: `border-darkSecondaryColor/20 hover:border-darkSecondaryColor/50 focus:border-darkSecondaryColor text-neutral-500 hover:text-neutral-300 focus:text-white`,
				white: `border-white/20 hover:border-white/50 focus:border-white text-neutral-500 hover:text-neutral-300 focus:text-white`,
			},
		},
		inline: {
			light: {
				primary: `Not ready`,
				accent: `Not ready`,
				secondary: `Not readyr`,
				white: `Not ready`,
			},
			dark: {
				primary: `Not ready`,
				accent: `Not ready`,
				secondary: `Not readyr`,
				white: `Not ready`,
			},
		}
	}

	if (variant === `default`) inputClassName += ` border p-2 transition duration-300 ease-in-out`;
	if (variant === `outline`) inputClassName += ` border border-[2px] p-2 transition duration-300 ease-in-out bg-transparent placeholder-neutral-500 focus:outline-none`;
	if (variant === `inline`) inputClassName += ` border-b-2 rounded-none transition duration-300 ease-in-out`;

	inputClassName += ` ${variants[variant][theme][color]}`;



	// Input

	/* if (!props.variant || props.variant === `default`) {
		inputClassName += ` border p-2 transition duration-300 ease-in-out`;
		if (!props.color || props.color === `primary`) {
			inputClassName += ` bg-white border-white placeholder-neutral-500 focus:outline-none`;
			if (!props.inputProps?.disabled) {
				inputClassName += ` text-black hover:text-neutral-300 hover:bg-neutral-800 hover:border-neutral-400
				focus:text-white focus:bg-black focus:border-white`;
			} else {
				labelClassName += ` opacity-50 cursor-not-allowed`;
				inputClassName += ` opacity-50 cursor-not-allowed bg-neutral-900`;
			}
		}

		if (props.color === `secondary`) {
			inputClassName += ` bg-neutral-800 placeholder-neutral-500 border-neutral-800 focus:outline-none`;
			if (!props.inputProps?.disabled) {
				labelClassName += ` text-neutral-400`;
				inputClassName += ` text-neutral-400 hover:border-neutral-500 hover:bg-neutral-900 
				hover:text-neutral-300 focus:border-white focus:text-white focus:bg-black`;
			} else {
				labelClassName += ` opacity-50 cursor-not-allowed`;
				inputClassName += ` opacity-50 cursor-not-allowed bg-neutral-900`;
			}
		}

		if (props.color === `accent`) {
			inputClassName += ` bg-indigo-500 border-indigo-500 placeholder-indigo-950 focus:outline-none`;
			if (!props.inputProps?.disabled) {
				labelClassName += ` text-indigo-500`;
				inputClassName += ` text-black hover:text-indigo-300 hover:bg-indigo-800 hover:border-indigo-800
				focus:text-indigo-500 focus:bg-black focus:border-indigo-500`;
			} else {
				labelClassName += ` opacity-50 cursor-not-allowed`;
				inputClassName += ` opacity-50 cursor-not-allowed bg-neutral-900`;
			}
		}
	}

	if (props.variant === `outline`) {
		inputClassName += ` border border-[2px] p-2 transition duration-300 ease-in-out`;
		if (!props.color || props.color === `primary`) {
			inputClassName += ` bg-transparent placeholder-neutral-800 border-neutral-800 focus:outline-none`;
			if (!props.inputProps?.disabled) {
				inputClassName += ` hover:border-neutral-500 focus:border-neutral-200 text-neutral-400 
				hover:text-neutral-300 focus:text-white`;
			} else {
				labelClassName += ` opacity-50 cursor-not-allowed`;
				inputClassName += ` opacity-50 cursor-not-allowed bg-neutral-900`;
			}
		}

		if (props.color === `secondary`) {
			inputClassName += ` bg-transparent placeholder-neutral-600 border-neutral-400 focus:outline-none`;
			if (!props.inputProps?.disabled) {
				labelClassName += ` text-neutral-400`;
				inputClassName += ` hover:border-neutral-600 focus:border-neutral-800 text-neutral-400 
				hover:text-neutral-300 focus:text-white`;
			} else {
				labelClassName += ` opacity-50 cursor-not-allowed`;
				inputClassName += ` opacity-50 cursor-not-allowed bg-neutral-900`;
			}
		}

		if (props.color === `accent`) {
			inputClassName += ` bg-transparent placeholder-indigo-900 border-indigo-500 focus:outline-none`;
			if (!props.inputProps?.disabled) {
				labelClassName += ` text-indigo-500`;
				inputClassName += ` text-indigo-800 hover:border-indigo-700 hover:text-indigo-700 
				focus:border-indigo-900 focus:text-indigo-500`;
			} else {
				labelClassName += ` opacity-50 cursor-not-allowed`;
				inputClassName += ` opacity-50 cursor-not-allowed bg-neutral-900`;
			}
		}

		if (props.color === `white`) {
			inputClassName += ` bg-transparent placeholder-neutral-800 border-neutral-800 focus:outline-none`;
			if (!props.inputProps?.disabled) {
				labelClassName += ` text-indigo-500`;
				inputClassName += ` text-indigo-800 hover:border-indigo-700 hover:text-indigo-700 
				focus:border-indigo-900 focus:text-indigo-500`;
			} else {
				labelClassName += ` opacity-50 cursor-not-allowed`;
				inputClassName += ` opacity-50 cursor-not-allowed bg-neutral-900`;
			}
		}
	}

	if (props.variant === `inline`) {
		inputClassName += ` border-b-2 rounded-none transition duration-300 ease-in-out`;
		errorClassName += ` ml-[1px]`;
		labelClassName += ` ml-[1px]`;
		if (!props.color || props.color === `primary`) {
			inputClassName += ` bg-transparent placeholder-neutral-500 border-white focus:outline-none`;
			if (!props.inputProps?.disabled) {
				inputClassName += ` hover:border-neutral-400 focus:border-neutral-800 text-neutral-400 
				hover:text-neutral-300 focus:text-white`;
			} else {
				labelClassName += ` opacity-50 cursor-not-allowed`;
				inputClassName += ` opacity-50 cursor-not-allowed bg-neutral-900`;
			}
		}

		if (props.color === `secondary`) {
			inputClassName += ` bg-transparent placeholder-neutral-600 border-neutral-500 focus:outline-none`;
			if (!props.inputProps?.disabled) {
				labelClassName += ` text-neutral-400`;
				inputClassName += ` hover:border-neutral-700 focus:border-neutral-800 text-neutral-400 
				hover:text-neutral-300 focus:text-white`;
			} else {
				labelClassName += ` opacity-50 cursor-not-allowed`;
				inputClassName += ` opacity-50 cursor-not-allowed bg-neutral-900`;
			}
		}

		if (props.color === `accent`) {
			inputClassName += ` bg-transparent placeholder-indigo-900 border-indigo-900 focus:outline-none`;
			if (!props.inputProps?.disabled) {
				labelClassName += ` text-indigo-500`;
				inputClassName += ` text-indigo-800 hover:border-indigo-700 hover:text-indigo-700 
				focus:border-indigo-500 focus:text-indigo-500`;
			} else {
				labelClassName += ` opacity-50 cursor-not-allowed`;
				inputClassName += ` opacity-50 cursor-not-allowed bg-neutral-900`;
			}
		}
	} */

	if (props.inputClassName) inputClassName += ` ${props.inputClassName}`;

	// Label

	if (props.labelClassName) labelClassName += ` ${props.labelClassName}`;

	// Error

	if (props.errorClassName) errorClassName += ` ${props.errorClassName}`;

	// Description

	if (props.descriptionClassName) descriptionClassName += ` ${props.descriptionClassName}`;

	// Required

	const required = props.inputProps?.required ? `*` : ``;

	// Other

	if (props.className) className += ` ${props.className}`;

	return (
		<div className={className}>
			<div className={`flex`}>
				{props.label && <p className={labelClassName}>{props.label}</p>}
				<label className={`text-red-500 text-[15px]`}>{required}</label>
			</div>
			{props.description && <p className={descriptionClassName}>{props.description}</p>}
			<input
				className={inputClassName}
				{...props.inputProps}
			/>
			<label hidden={!props.error} className={errorClassName}>
				{props.error}
			</label>
		</div>
	);
}