"use client";

import {Button, ButtonProps} from "@mantine/core";
import {useRouter} from "next/navigation";
import {PropsWithChildren} from "react";

type TProps = {
	redirect?: string;
} & ButtonProps &
	React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CustomButton(props: PropsWithChildren<TProps>) {
	const router = useRouter();

	return (
		<Button {...props} onClick={e => (props.redirect ? router.push(props.redirect) : props.onClick ? props.onClick(e) : null)}>
			{props.children}
		</Button>
	);
}
