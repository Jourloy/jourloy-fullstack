import {Center, Container, Grid, Loader} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";

export default function DefaultLoading() {
	useDocumentTitle(`Загрузка`);

	return (
		<Container
			style={{
				position: `absolute`,
				left: `50%`,
				top: `50%`,
				transform: `translate(-50%, -50%)`,
				display: `flex`,
				justifyContent: `space-between`,
				alignItems: `center`,
				maxWidth: `720px`,
				width: `100%`,
			}}
		>
			<Grid columns={1} maw={`700px`} w={`100%`} p={0} align={`center`}>
				<Grid.Col>
					<Center>
						<Loader size={`50px`} variant={`dots`} color={`blue`} />
					</Center>
				</Grid.Col>

				<Grid.Col>
					<h1 className={`text-[40px] text-center`}>Проверяем и загружаем</h1>
				</Grid.Col>
			</Grid>
		</Container>
	);
}
