"use client"

import {Button} from "@mantine/core";
import { useRouter } from "next/navigation";
import {PropsWithChildren} from "react";

type TProps = {};

export default function Avatar(props: PropsWithChildren<TProps>) {
	const router = useRouter();

	return (
		<Button variant={`outline`} color={`black`} onClick={() => router.push(`/login`)}>
			Войти
		</Button>
	);
}
