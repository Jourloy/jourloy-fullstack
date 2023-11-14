import {PropsWithChildren} from "react";

type TProps = {
	/**
	 * Default: `neutral`
	 */
	color?: `accent` | `secondary` | `primary` | `white` | `neutral` | string;

	/**
	 * Default: `outline`
	 */
	variant?: `filled` | `outline` | `glass`;

	/**
	 * Default: false
	 */
	withBorder?: boolean;

	/**
	 * Default: `20px`
	 */
	padding?: string;

	className?: string;
};

export default function CustomCard(props: PropsWithChildren<TProps>) {
	const variant = props.variant || `outline`;
	const color = props.color || `neutral`;
	const padding = props.padding || `20px`;
	const withBorder = props.withBorder || true;

	let className = `${props.className} rounded-md`;

	if (variant === `filled`) {
		className += ``;

		if (withBorder) className += ` border border-[1px]`;

		if (color === `primary`) {
			className += ` bg-darkPrimaryColor/40`;
			className += ` border-darkPrimaryColor/40`;
		} else if (color === `secondary`) {
			className += ` bg-darkSecondaryColor/40`;
			className += ` border-darkSecondaryColor/40`;
		} else if (color === `accent`) {
			className += ` bg-darkAccentColor/40`;
			className += ` border-darkAccentColor/40`;
		} else if (color === `white`) {
			className += ` bg-white/40`;
			className += ` border-white/40`;
		} else if (color === `neutral`) {
			className += ` bg-neutral-700/40`;
			className += ` border-neutral-700/40`;
		} else {
			className += ` ${color}`;
		}
	} else if (variant === `outline`) {
		if (withBorder) className += ` border border-[1px]`;

		if (color === `primary`) {
			className += ` border-darkPrimaryColor`;
		} else if (color === `secondary`) {
			className += ` border-darkSecondaryColor`;
		} else if (color === `accent`) {
			className += ` border-darkAccentColor`;
		} else if (color === `white`) {
			className += ` border-white`;
		} else if (color === `neutral`) {
			className += ` border-neutral-300`;
		} else {
			className += ` ${color}`;
		}
	} else if (variant === `glass`) {
		if (withBorder) className += ` border border-[1px]`;

		if (color === `primary`) {
			className += ` border-darkPrimaryColor`;
		} else if (color === `secondary`) {
			className += ` border-darkSecondaryColor`;
		} else if (color === `accent`) {
			className += ` border-darkAccentColor`;
		} else if (color === `white`) {
			className += ` border-white`;
		} else if (color === `neutral`) {
			className += ` border-neutral-800`;
		} else {
			className += ` ${color}`;
		}

		className += ` bg-transparent backdrop-blur-xl`;
	}

	return (
		<div className={className} style={{padding: padding}}>
			{props.children}
		</div>
	);
}