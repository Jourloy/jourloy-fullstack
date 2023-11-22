import {Badge, Card, UnstyledButton} from "@mantine/core";
import {formatter} from "src/context";
import {TSpend} from "src/store/features/budget.slice";
import SpendLogic from "../../spendLogic";
import dayjs from "dayjs";
import {useState} from "react";
import SpendModal from "./modal";

type TProps = {
	spend: TSpend;
};

export default function Spend({spend}: TProps) {
	const spendLogic = new SpendLogic(spend);

	const [openSpendModal, setOpenSpendModal] = useState(false);

	const onClose = () => {
		setOpenSpendModal(false);
	};

	return (
		<>
			<SpendModal opened={openSpendModal} onClose={onClose} spend={spend} />
			<UnstyledButton className={`w-full`} onClick={() => setOpenSpendModal(true)}>
				<Card withBorder className={`w-full grid grid-cols-12`}>
					<p className={`col-span-3`}>{formatter.format(spend.cost)}</p>
					<div className={`col-span-6 flex justify-center items-center`}>
						<Badge color={spendLogic.getBadgeColor()} radius={`sm`} variant={`light`}>
							<p>{spendLogic.formatCategory()}</p>
						</Badge>
					</div>

					<p className={`col-span-3 text-right`}>
						{dayjs(spend.createdAt).locale(`ru`).format(`DD MMMM YYYY`)}
					</p>
				</Card>
			</UnstyledButton>
		</>
	);
}
