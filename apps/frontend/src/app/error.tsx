"use client"

import Card from "@/components/layout/card";
import Button from "@/components/actions/button";

export default function Error({error, reset}: {error: Error; reset: () => void}) {
	return (
		<div className={`min-h-screen grid place-items-center`}>
			<div className={`flex justify-center`}>
				<Card className={`grid grid-cols-2 gap-x-5 place-items-center`} variant={`outline`}>
					<h1 className={`col-span-2 max-w-[600px] text-[40px] text-center`}>Что-то пошло не так</h1>
					<p className={`col-span-2 text-[50px]`}>😰</p>
					<p className={`col-span-2 w-[450px] mb-[20px] text-center`}>
						Мы ее уже получили ошибку и обрабатываем, ну а ты можешь попробовать снова или вернуться на
						главную страницу
					</p>
					<Button
						onClick={() => {
							reset();
						}}
						variant={`outline`}
						width={`100%`}
					>
						<p className={`w-full text-center`}>Попробовать снова</p>
					</Button>
					<Button redirect={`/`} width={`100%`}>
						<p className={`w-full text-center`}>Вернуться на главную</p>
					</Button>
				</Card>
			</div>
		</div>
	);
}
