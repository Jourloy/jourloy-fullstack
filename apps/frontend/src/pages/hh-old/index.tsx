import {AppShell, Button, Header, Navbar, Stack} from "@mantine/core";
import WorkersApp from "./apps/workers";

export default function HHPage() {
	return (
		<>
			<AppShell
				header={<Header height={45}>Hi</Header>}
				navbar={
					<Navbar width={{base: 300}} p={`xs`}>
						<Stack>
							<Button>Соискатели</Button>
						</Stack>
					</Navbar>
				}
			>
				<WorkersApp />
			</AppShell>
		</>
	);
}
