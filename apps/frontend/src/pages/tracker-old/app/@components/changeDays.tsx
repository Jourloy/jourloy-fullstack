import LongPressButton from "../../../../components/actions/longPressButton";
import {useState} from "react";
import TrackerLogic from "../../logic";
import TrackerAPI from "../../api";
import ErrorNotification from "../../../../components/logical/notification/error.notification";
import SuccessNotification from "../../../../components/logical/notification/success.notification";

type TProps = {
	add?: boolean;
};

export default function ChangeDays(props: TProps) {
	const logic = new TrackerLogic();
	const api = new TrackerAPI();

	const [loading, setLoading] = useState(false);

	const onPressed = () => {
		setLoading(true);

		if (props.add) {
			logic
				.addDay()
				.then(() => {
					SuccessNotification({message: `День успешно добавлен`});
					api.autoUpdateTracker();
				})
				.catch(() => {
					ErrorNotification();
				})
				.finally(() => setLoading(false));
		} else {
			logic
				.removeDay()
				.then(() => {
					SuccessNotification({message: `День успешно убран`});
					api.autoUpdateTracker();
				})
				.catch(() => {
					ErrorNotification();
				})
				.finally(() => setLoading(false));
		}
	};

	return (
		<LongPressButton
			loading={loading}
			onPressed={onPressed}
			label={props.add ? `Добавить день` : `Убрать день`}
			variant={`outline`}
			fullWidth
			seconds={0.5}
		/>
	);
}
