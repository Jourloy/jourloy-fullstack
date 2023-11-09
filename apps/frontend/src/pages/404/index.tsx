import {useDocumentTitle} from "@mantine/hooks";
import Section from "../../components/layout/Section";
import GhostComponent from "./components/ghost";
import {Button, Card} from "@mantine/core";
import {useNavigate} from "react-router-dom";

export function Page404() {
	useDocumentTitle(`404`);

	const navigate = useNavigate();

	const toMain = () => {
		navigate(`/`);
	};

	return (
		<main>
			<Section className={`flex flex-col justify-center items-center`}>
				<Card
					withBorder
					className={`max-w-[550px] w-full flex flex-col  justify-center items-center`}
				>
					<div className={`flex flex-row w-full justify-around items-center`}>
						<GhostComponent />
						<h1 className={`text-[100px]`}>404</h1>
						<GhostComponent />
					</div>
					<p>Мы не нашли такую страницу</p>
					<Button
						fullWidth
						className={`mt-[15px]`}
						variant={`outline`}
						color={`black`}
						onClick={toMain}
					>
						На главную
					</Button>
				</Card>
			</Section>
		</main>
	);
}
