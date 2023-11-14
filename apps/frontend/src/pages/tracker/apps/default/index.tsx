import { Card, Divider } from "@mantine/core";

export default function TrackerDefault() {
	return (
		<div className={`w-full h-full flex flex-col justify-center items-center p-5 space-y-5`}>
			<Card withBorder className={`max-w-[850px] w-full flex flex-col text-center`}>
				<h1 className={`text-[30px]`}>Привет</h1>
				<Divider className={`my-[15px]`} />
			</Card>
		</div>
	)
}