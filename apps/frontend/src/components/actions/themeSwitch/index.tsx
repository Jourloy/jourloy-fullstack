import {Group, Switch, useMantineColorScheme, useMantineTheme, Text} from "@mantine/core";
import {IconSun, IconMoonStars} from "@tabler/icons-react";

export default function ThemeSwitch() {
	const {colorScheme, toggleColorScheme} = useMantineColorScheme();
	const theme = useMantineTheme();

	return (
		<Group w={`100%`} position={`center`}>
			<Text>Изменить тему сайта</Text>
			<Switch
				checked={colorScheme === `light`}
				onChange={() => toggleColorScheme()}
				radius={`md`}
				size={`md`}
				onLabel={
					<IconSun
						color={theme.white}
						stroke={1.3}
						size={`20px`}
						style={{
							marginRight: `5px`,
						}}
					/>
				}
				offLabel={
					<IconMoonStars
						color={theme.colors.gray[6]}
						stroke={1.3}
						size={`20px`}
						style={{
							marginLeft: `5px`,
						}}
					/>
				}
			/>
		</Group>
	);
}
