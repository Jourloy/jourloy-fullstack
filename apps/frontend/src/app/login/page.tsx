"use client";

import Card from "@/components/layout/card";
import Section from "@/components/layout/section";
import {useUserStore} from "@/store/user.store";
import {Button, Divider, Loader, PasswordInput, TextInput} from "@mantine/core";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useForm, zodResolver} from "@mantine/form";
import {z} from "zod";

export default function KeyboardPage() {
	const router = useRouter();

	const user = useUserStore(state => state);

	useEffect(() => {
		if (user.logined) router.push(`/`);
	});

	const schema = z.object({
		username: z.string().min(3, {message: "Минимальная длина логина 3 символа"}),
		password: z.string().min(5, {message: "Минимальная длина пароля 5 символов"}),
	});

	const form = useForm({
		initialValues: {
			username: ``,
			password: ``,
		},
		validate: zodResolver(schema),
	});

	const onSubmit = (values: typeof form.values) => {};

	return (
		<main>
			<Section className={`flex flex-col justify-center items-center p-[15px]`}>
				<Card className={`flex flex-col justify-center items-center max-w-[650px] w-full`} color={`neutral`}>
					<h2 className={`text-[40px]`}>Привет!</h2>
					<p className={`text-neutral-500`}>Если аккаунта нет, то он будет создан автоматически</p>
					<Divider color={`gray`} w={`100%`} my={`10px`} />
					<form onSubmit={form.onSubmit(onSubmit)} className={`w-full flex flex-col`}>
						<TextInput w={`100%`} label={`Логин`} {...form.getInputProps(`username`)} />
						<PasswordInput
							w={`100%`}
							color={`white`}
							label={`Пароль`}
							{...form.getInputProps(`password`)}
						/>
						<Button fullWidth className={`mt-[15px]`} color={`black`} type={`submit`}>
							Войти
						</Button>
					</form>
					<Divider
						color={`gray`}
						w={`100%`}
						my={`10px`}
						label={<p className={`text-[15px]`}>или через</p>}
						labelPosition={`center`}
					/>
					<div className={`flex flex-col md:flex-row w-full md:space-x-5 md:space-y-0 space-y-5`}>
						<Button variant={`outline`} color={`black`} fullWidth>
							Google
						</Button>
						<Button variant={`outline`} color={`black`} fullWidth>
							Yandex
						</Button>
					</div>
				</Card>
			</Section>
		</main>
	);
}
