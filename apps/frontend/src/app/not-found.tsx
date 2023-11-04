"use client";

import Button from "@/components/actions/button";
import Card from "@/components/layout/card";
import {Divider, TextInput} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import {IconCheck} from "@tabler/icons-react";
import {useState} from "react";
import {z} from "zod";

export default function NotFound() {
	const [sended, setSended] = useState(false);

	const schema = z.object({
		email: z.string(),
		comments: z.string().min(10, {message: "Минимальная длина комментария 10 символов"}),
	});

	const form = useForm({
		initialValues: {
			email: ``,
			comments: ``,
		},
		validate: zodResolver(schema),
	});

	const onSubmit = (values: typeof form.values) => {
		setSended(true);
	};

	return (
		<div className={`h-[calc(100dvh)] flex justify-center items-center p-2`}>
			<div className={`max-w-[600px] w-[100%]`}>
				<Card className={`w-[100%] grid grid-cols-1 place-items-center`}>
					<h1 className={`text-[40px] text-center`}>Секретная страница!</h1>
					<p className={`text-[50px]`}>😱</p>
					<p className={`text-[14px] text-center`}>
						Когда давно, когда еще пираты ходили в моря, а рыцари покоряли королевства, один странник
						придумал как спрятать свой клад.
					</p>
					<p className={`text-[14px] text-center`}>
						Но, к сожалению, мы об этом ничего не знаем, как и о том, куда подевалась страница из твоего
						запроса. Возможно она больше недоступна или переехала на новый адрес.
					</p>
					<Divider w={`100%`} my={`5px`} size={`sm`} />
					{!sended && (
						<>
							<h2 className={`text-[20px] `}>Если это точно ошибка, то напиши нам</h2>
							<form onSubmit={form.onSubmit(onSubmit)} style={{width: `100%`}}>
								<TextInput
									label={`Email`}
									placeholder={`Необязательно`}
									{...form.getInputProps(`email`)}
									w={`100%`}
								/>
								<TextInput
									label={`Комментарии`}
									placeholder={`Обязательно`}
									{...form.getInputProps(`comments`)}
									w={`100%`}
								/>
								<Button
									type={`submit`}
									w={`100%`}
									color={`black`}
									variant={`outline`}
									className={`mt-[5px]`}
									fullWidth
								>
									Отправить
								</Button>
							</form>
						</>
					)}
					{sended && (
						<>
							<h2 className={`text-[20px] `}>Спасибо за твой комментарий</h2>
							<div className={`border-[2px] border-lightSecondaryColor rounded-[100%] h-[45px] w-[45px]`}>
								<IconCheck color={`green`} size={`40px`} className={`mt-[2px]`} />
							</div>
						</>
					)}
					<Divider w={`100%`} my={`15px`} size={`sm`} />
					<Button redirect={`/`} w={`100%`} color={`black`} className={`mt-[5px]`}>
						На главную
					</Button>
				</Card>
			</div>
		</div>
	);
}
