import {PropsWithChildren} from "react";

interface ISection {
	image?: string;
	className?: string;
}

export default function Section(props: PropsWithChildren<ISection>) {
	let className = `h-[calc(100dvh)] overflow-y-hidden`;

	if (props.className) className += ` ${props.className}`;

	return (
		<div
			className={className}
			style={{backgroundImage: props.image ? `url(${props.image})` : `none`, backgroundSize: `cover`}}
		>
			{props.children}
		</div>
	);
}