import {Divider, Modal} from "@mantine/core";
import SpendForm from "./forms/spendForm";

type TProps = {
	type: `income` | `spend` | `credit`;
	opened: boolean;
	onClose: () => void;
	className?: string;
};

export default function SpendModal(props: TProps) {
	const title = {
		income: `доход`,
		spend: `расход`,
		credit: `кредит`,
	};

	const form = {
		income: <></>,
		spend: <SpendForm onClose={props.onClose} />,
		credit: <></>,
	};

	const onClose = () => {
		props.onClose();
	};

	return (
		<Modal
			opened={props.opened}
			onClose={onClose}
			className={`flex flex-col`}
			overlayProps={{blur: 5}}
			withCloseButton={false}
			centered
		>
			<div className={`flex flex-col space-y-5`}>
				<h1 className={`text-[25px] text-center`}>Добавить {title[props.type]}</h1>

				<Divider className={`w-full my-[15px]`} />

				{form[props.type]}
			</div>
		</Modal>
	);
}
