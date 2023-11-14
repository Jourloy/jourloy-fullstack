import {Modal, Stack, Title, Text, Badge, Divider, Grid, Avatar} from "@mantine/core";
import {TDarkClass} from "../../../types";
import DarkLogic from "../logic";

type TDarkClassModalProps = {
	opened: boolean;
	onClose: () => void;
	class: TDarkClass;
};

export default function DarkClassModal(props: TDarkClassModalProps) {
	const logic = new DarkLogic(props.class);

	return (
		<Modal opened={props.opened} onClose={props.onClose} centered p={0}>
			<Grid>
				<Grid.Col span={3}>
					<Avatar src={logic.getClassIconUrl()} variant={`outline`} />
				</Grid.Col>

				<Grid.Col span={6}>
					<Title align={`center`}>{props.class.enName}</Title>
				</Grid.Col>

				<Grid.Col span={3} />

				<Grid.Col>
					<Divider />
				</Grid.Col>

				<Grid.Col>
					<Stack spacing={1}>
						<Text align={`center`}>Роль</Text>
						<Badge variant={`filled`} radius={`sm`} color={logic.getTypeColor()} w={`100%`}>
							{logic.getType()}
						</Badge>
					</Stack>
				</Grid.Col>

				<Grid.Col md={6} sm={12}>
					<Stack spacing={1}>
						<Text align={`center`}>Дальность боя</Text>
						<Badge
							variant={`outline`}
							radius={`sm`}
							color={logic.getRangeColor()}
							w={`100%`}
						>
							{logic.getRange()}
						</Badge>
					</Stack>
				</Grid.Col>

				<Grid.Col md={6} sm={12}>
					<Stack spacing={1}>
						<Text align={`center`}>Сложность</Text>
						<Badge
							variant={`outline`}
							radius={`sm`}
							color={logic.getDifficultColor()}
							w={`100%`}
						>
							{logic.getDifficult()}
						</Badge>
					</Stack>
				</Grid.Col>

				<Grid.Col>
					<Divider />
				</Grid.Col>

				<Grid.Col>
					<Text>Test text</Text>
				</Grid.Col>
			</Grid>
		</Modal>
	);
}
