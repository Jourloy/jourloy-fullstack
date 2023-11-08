import { Badge, UnstyledButton } from "@mantine/core";
import CustomCard from "../../../components/layout/CustomCard";
import {ISpend} from "../../../types";
import { formatter } from "../../../context";
import TrackerLogic from "../logic";
import dayjs from "dayjs";

interface IProps {
	spend: ISpend;
	length: number;
	index: number;
}

export default function SpendComponent(props: IProps) {
	const logic = new TrackerLogic();

	return (
		<UnstyledButton className={`w-full`}>
			<CustomCard color={`neutral`} className={`grid grid-cols-12 w-full place-content-center place-items-center`}>
				<p className={`col-span-3 text-left w-full`}>{formatter.format(props.spend.cost)}</p>
				<Badge
					color={logic.getBadgeColor(props.spend)}
					radius={`sm`}
					variant={`outline`}
					className={`col-span-6 self-center`}
				>
					<p className={`text-center`}>{logic.formatCategory(props.spend.category)}</p>
				</Badge>
				<p className={`col-span-3 text-right w-full`}>{dayjs(props.spend.createdAt).format(`DD.MM.YYYY`)}</p>
			</CustomCard>
		</UnstyledButton>
	)
}