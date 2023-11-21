import {Button, Card, Divider} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import { store } from "src/store/store";

export default function TrackerDefault() {
	const navigate = useNavigate();

	return (
		<div className={`w-full h-full flex flex-col justify-center items-center p-5 space-y-5`}>
			<Card className={`max-w-[850px] w-full flex flex-col text-center`}>
				<h1 className={`text-[40px]`}>Привет</h1>
				<Divider className={`my-[15px]`} />

				<h2 className={`text-[30px] my-[10px]`}>Неподключенные инструменты</h2>
				<div className={`grid grid-cols-3 gap-5`}>
					<div
						hidden={store.getState().budgetReducer.budgets.length > 0}
						className={`col-span-6 md:col-span-1 h-full`}
					>
						<Card withBorder className={`w-full h-full`}>
							<h2 className={`text-[30px] text-amber-500`}>Бюджет</h2>
							<p>Расходы и доходы под рукой</p>
							<Divider className={`my-[15px]`} />
							<Button
								variant={`outline`}
								color={`black`}
								className={`mt-auto`}
								onClick={() => navigate(`/budget/preview`)}
							>
								Подробнее
							</Button>
						</Card>
					</div>
				</div>
			</Card>
		</div>
	);
}
