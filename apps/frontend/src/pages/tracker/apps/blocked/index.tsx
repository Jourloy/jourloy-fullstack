import { Button, Card, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function TrackerBlocked() {
	const navigate = useNavigate();

	const toLogin = () => {
		navigate(`/login`);
	}

	return (
		<div className={`w-full h-full flex flex-col justify-center items-center p-5 space-y-5`}>
			<Card withBorder className={`max-w-[850px] w-full flex flex-col text-center`}>
				<h2 className={`text-[30px]`}>Для доступа нужно авторизоваться</h2>
				<Divider className={`my-[15px]`} />
				<Button color={`black`} onClick={toLogin}>
					Войти
				</Button>
			</Card>
		</div>
	)
}