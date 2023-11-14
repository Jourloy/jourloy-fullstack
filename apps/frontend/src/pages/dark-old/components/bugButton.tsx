import {Button, Divider, Modal, Stack, Title} from "@mantine/core";
import BugForm from "../../../components/inputs/bugForm";
import { useState } from "react";

export default function BugButton() {
	const [bugModal, setBugModal] = useState(false);

	return (
		<>
			<Modal opened={bugModal} onClose={() => setBugModal(false)} centered>
				<Stack>
					<Title align={`center`}>Сообщить об ошибке</Title>
					<Divider />
					<BugForm />
				</Stack>
			</Modal>

			<Button fullWidth variant={`outline`} onClick={() => setBugModal(true)}  style={{color: `white`, borderColor: `white`}}>
				Сообщить об ошибке
			</Button>
		</>
	);
}
