import { Card, Grid } from "@mantine/core";

export default function WorkersApp() {
	return (
		<>
			<Grid>
				<Grid.Col span={4}>
					<Card withBorder>
						<h2 style={{textAlign: `center`}}>Настройки поиска</h2>
					</Card>
				</Grid.Col>
			</Grid>	
		</>
	)
}