import {Modal, Title, Text, Divider, Flex} from "@mantine/core";

type TProps = {
	text: Array<string>;
	title: string;
	opened: boolean;
	onClose: () => void;
};
export default function FeatureModal(props: TProps) {
	return (
		<Modal opened={props.opened} onClose={props.onClose} centered>
			<Flex gap="md" justify="center" align="center" direction="column" wrap="wrap">
				<Title align={`center`}>{props.title}</Title>

				<Divider w={"100%"} />

				{props.text.map((item, index) => (
					<Text key={index} align={`center`}>
						{item}
					</Text>
				))}
			</Flex>
		</Modal>
	);
}
