interface TProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: `solid` | `dashed` | `dotted` | `double`;
	color?: `primary` | `secondary` | `accent` | `neutral` | `white`;
	label?: string;
	className?: string;
	dividerClassName?: string;
	labelClassName?: string;
};

export default function Divider(props: TProps) {
	const variant = props.variant || `solid`;
	const color = props.color || `primary`;

	let className = `inline-flex items-center justify-center w-full`;

	let dividerClassName = `w-[100%] bg-transparent`;
	dividerClassName += props.variant ? ` ${props.variant}` : ` border-solid`;

	let labelClassName = `absolute px-3 bg-black`;


	const variants = {
		solid: `border-y-[0.5px] border-solid`,
		dashed: `border-y-[0.5px] border-dashed`,
		dotted: `border-y-[0.5px] border-dotted`,
		double: `border-y-[1px] border-double h-[7px]`,
	}

	const colors = {
		primary: `border-darkPrimaryColor`,
		secondary: `border-darkSecondaryColor`,
		accent: `border-indigo-500`,
		neutral: `border-neutral-700`,
		white: `border-white`,
	}

	// Variants
	dividerClassName += ` ${variants[variant]}`;

	// Colors
	dividerClassName += ` ${colors[color]}`;
	// labelClassName += ` text-${colors[color]}`;

	if (props.className) className += ` ${props.className}`;
	if (props.dividerClassName) dividerClassName += ` ${props.dividerClassName}`;
	if (props.labelClassName) labelClassName += ` ${props.labelClassName}`;

	return (
		<div className={className} {...props}>
			<hr className={dividerClassName} />
			<span hidden={props.label == null} className={labelClassName}>
				{props.label}
			</span>
		</div>
	);
}
