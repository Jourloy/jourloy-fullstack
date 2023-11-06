import {Center, Container, Grid, Loader, Title} from "@mantine/core";

export default function DefaultLoading() {
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
					<Title align={`center`}>Проверяем и загружаем</Title>
				</Grid.Col>
			</Grid>
		</Container>
	);
}
