import {Button, Card, Divider, Flex, Grid, Title} from "@mantine/core";
import AttributeList from "./components/attributeList.components";
import BuyCoffeButton from "../../components/actions/buyCoffeButton";
import ClassList from "./components/classList.component";
import BugButton from "./components/bugButton";
import {useState} from "react";
import {store} from "../../store/store";
import AddClassButton from "./components/addClassButton.component";
import AddAttributeButton from "./components/addAttributeButton.component";

export default function DarkIndex() {
	const [logined, setLogined] = useState(store.getState().userReducer.logined);
	const [admin, setAdmin] = useState(store.getState().userReducer.role === `admin`);
	store.subscribe(() => {
		const _logined = store.getState().userReducer.logined;
		const _admin = store.getState().userReducer.role === `admin`;
		if (logined !== _logined) setLogined(_logined);
		if (admin !== _admin) setAdmin(_admin);
	});

	return (
		<Flex justify={`center`} py={20} px={20}>
			<Grid maw={`850px`}  w={`100%`}>
				<Grid.Col span={12}>
					<Card>
						<Grid>
							<Grid.Col>
								<Title order={1} align={`center`}>
									Классы
								</Title>
							</Grid.Col>

							<Grid.Col>
								<Divider />
							</Grid.Col>

							<ClassList />
						</Grid>
					</Card>
				</Grid.Col>

				<Grid.Col md={6} sm={12}>
					<Card>
						<Grid>
							<Grid.Col>
								<Title order={2} align={`center`}>
									Поиск по атрибутам
								</Title>
							</Grid.Col>

							<AttributeList />
						</Grid>
					</Card>
				</Grid.Col>

				<Grid.Col md={6} sm={12}>
					<Card>
						<Grid>
							<Grid.Col>
								<Title order={2} align={`center`}>
									Гайды
								</Title>
							</Grid.Col>

							<AttributeList />
						</Grid>
					</Card>
				</Grid.Col>

				<Grid.Col>
					<Divider />
				</Grid.Col>

				<Grid.Col md={6} sm={12}>
					<Button fullWidth variant={`outline`} style={{color: `white`, borderColor: `white`}}>
						API
					</Button>
				</Grid.Col>

				<Grid.Col md={6} sm={12}>
					<BugButton />
				</Grid.Col>

				<Grid.Col>
					<BuyCoffeButton />
				</Grid.Col>

				<Grid.Col>
					<Card hidden={!admin}>
						<Grid>
							<Grid.Col>
								<Title order={2} align={`center`}>
									Раздел администратора
								</Title>
							</Grid.Col>

							<Grid.Col md={6} sm={12}>
								<AddClassButton />
							</Grid.Col>

							<Grid.Col md={6} sm={12}>
								<AddAttributeButton />
							</Grid.Col>
						</Grid>
					</Card>
				</Grid.Col>
			</Grid>
		</Flex>
	);
}
