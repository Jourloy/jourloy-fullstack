import {Button, ButtonProps} from "@mantine/core";
import {ButtonHTMLAttributes, PropsWithChildren, useState} from "react";
import BuyModal from "../modals/buy";

type TProps = object & ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export default function BuyButton(props: PropsWithChildren<TProps>) {
	const [opened, setOpened] = useState(false);

	return (
		<>
			<BuyModal opened={opened} onClose={() => setOpened(false)} />
			<Button {...props} onClick={() => setOpened(true)}>{props.children}</Button>
		</>
	);
}
