import Button from "@/components/actions/button";
import Card from "@/components/layout/card";

export default function NotFound() {

	return (
		<div className={`h-[calc(100dvh)] flex justify-center items-center p-2`}>
			<div className={`max-w-[600px] w-[100%]`}>
				<Card className={`w-[100%] grid grid-cols-1 place-items-center`}>
					<h1 className={`text-[40px] text-center`}>Секретная страница!</h1>
					<p className={`text-[50px]`}>😱</p>
					<p className={`text-[20px] text-center`}>Но тут ничего нет</p>
					<p className={`text-[20px] text-center mb-[10px]`}>
						Или ссылка неверная, или такой страницы больше нет
					</p>
					<Button redirect={`/`} width={`100%`}>
						<p className={`w-full text-center`}>
							На главную
						</p>
					</Button>
				</Card>
			</div>
		</div>
	);
}
