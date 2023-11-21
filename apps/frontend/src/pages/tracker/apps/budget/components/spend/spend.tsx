import {Badge, Card, UnstyledButton} from "@mantine/core";
import {formatter} from "src/context";
import {TSpend} from "src/store/features/budget.slice";
import SpendLogic from "../../spendLogic";
import dayjs from "dayjs";

type TProps = {
	spend: TSpend;
};

export default function Spend({spend}: TProps) {
	const spendLogic = new SpendLogic(spend);

	return (
		<>
			<UnstyledButton className={`w-full`}>
				<Card withBorder className={`w-full`}>
					<p className={`col-span-3`}>{formatter.format(spend.cost)}</p>
					<Badge
						color={spendLogic.getBadgeColor()}
						radius={`md`}
						variant={`light`}
					>
						<p>{spendLogic.formatCategory()}</p>
					</Badge>
					{dayjs(spend.createdAt).format(`DD.MM.YY`)}
				</Card>
			</UnstyledButton>
		</>
	);
}
