"use client";

import {IconEye, IconEyeOff} from "@tabler/icons-react";
import {useState} from "react";

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

export default function PasswordInput(props: ITextInputProps) {
	const [showPassword, setShowPassword] = useState(true);

	let className = `flex flex-col`;
	let inputClassName = `rounded-md h-[40px] w-full`;
	let buttonClassName = `rounded-md h-[40px]`;
	let labelClassName = `text-[15px]`;
	let descriptionClassName = `text-[15px] text-neutral-500 mb-[5px]`;
	let errorClassName = `text-red-500 text-[13px]`;
	let iconClassName = `w-[25px] h-[25px]`;

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
		},
	};

	if (variant === `default`) {
		inputClassName += ` border p-2 transition duration-300 ease-in-out`;
		buttonClassName += ` border p-2 transition duration-300 ease-in-out`;
	}
	if (variant === `outline`) {
		inputClassName += ` border border-[2px] p-2 transition duration-300 ease-in-out bg-transparent placeholder-neutral-500 focus:outline-none`;
		buttonClassName += ` border border-[2px] p-2 transition duration-300 ease-in-out bg-transparent placeholder-neutral-500 focus:outline-none`;
	}
	if (variant === `inline`) {
		inputClassName += ` border-b-2 rounded-none transition duration-300 ease-in-out`;
		buttonClassName += ` border-b-2 rounded-none transition duration-300 ease-in-out`;
	}

	inputClassName += ` ${variants[variant][theme][color]}`;
	buttonClassName += ` ${variants[variant][theme][color]} focus:none`;

	if (props.inputClassName) inputClassName += ` ${props.inputClassName}`;

	// Label

	if (props.labelClassName) labelClassName += ` ${props.labelClassName}`;

	// Error

	if (props.errorClassName) errorClassName += ` ${props.errorClassName}`;

	// Description

	if (props.descriptionClassName) descriptionClassName += ` ${props.descriptionClassName}`;

	// Required

	const required = props.inputProps?.required ? `*` : ``;

	// Placeholder

	let placeholder = `••••••••••`;

	if (props.inputProps?.placeholder) {
		if (showPassword) placeholder = `•`.repeat(props.inputProps?.placeholder.length);
		else placeholder = props.inputProps?.placeholder;
	}

	// Other

	if (props.className) className += ` ${props.className}`;

	return (
		<div className={className}>
			<div className={`flex`}>
				{props.label && <p className={labelClassName}>{props.label}</p>}
				<label className={`text-red-500 text-[15px]`}>{required}</label>
			</div>
			{props.description && <p className={descriptionClassName}>{props.description}</p>}
			<div className={`flex w-full`}>
				<input className={inputClassName} placeholder={placeholder} type={showPassword ? `password` : `text`} {...props.inputProps} />

				<button className={`ml-3`} onClick={() => setShowPassword(!showPassword)}>
					<div hidden={showPassword}>
						<IconEyeOff className={iconClassName} />
					</div>
					<div hidden={!showPassword}>
						<IconEye className={iconClassName} />
					</div>
				</button>
			</div>
			<label hidden={!props.error} className={errorClassName}>
				{props.error}
			</label>
		</div>
	);
}
