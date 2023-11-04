import Section from "@/components/layout/section";
import {Loader} from "@mantine/core";

export default function Loading() {
	return (
		<main>
			<Section className={`flex flex-col justify-center items-center`}>
				<h2 className={`text-[30px]`}>Загружаем</h2>
				<Loader color={`black`} />
			</Section>
		</main>
	);
}
