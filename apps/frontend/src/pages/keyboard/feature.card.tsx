import {motion} from "framer-motion";
import {Card, createStyles, rem, SimpleGrid, Text, Title, useMantineTheme} from "@mantine/core";
import {IconBriefcase, IconCode, IconDeviceGamepad2} from "@tabler/icons-react";

const useStyles = createStyles(theme => ({
	title: {
		fontSize: rem(34),
		fontWeight: 900,

		[theme.fn.smallerThan("sm")]: {
			fontSize: rem(24),
		},
	},

	description: {
		maxWidth: 600,
		margin: "auto",

		"&::after": {
			content: '""',
			display: "block",
			backgroundColor: theme.fn.primaryColor(),
			width: rem(45),
			height: rem(2),
			marginTop: theme.spacing.sm,
			marginLeft: "auto",
			marginRight: "auto",
		},
	},

	card: {
		border: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
		}`,
	},

	cardTitle: {
		"&::after": {
			content: '""',
			display: "block",
			backgroundColor: theme.fn.primaryColor(),
			width: rem(45),
			height: rem(2),
			marginTop: theme.spacing.sm,
		},
	},
}));
const data = [
	{
		title: `Киберспорт`,
		text: [
			`Частота опроса клавиатуры составляет 1 мс, не все кастомные клавиатуры способны достичь такой скорости. Важно также отметить, что все нажатые клавиши в один момент времени будут надежно обработаны.`,
		],
		icon: IconDeviceGamepad2,
	},
	{
		title: `Офисы`,
		text: [
			`Если ты или твои сотрудники часто работают в Excel или подобных приложениях, то значительно облегчить работу помогут макросы - наборы действий, которые пользователь может настроить сам`,
		],
		icon: IconBriefcase,
	},
	{
		title: `Разработчики`,
		text: [
			`Благодаря наличию слоев, ты можешь назначить все необходимые символы и сочетания рядом, как тебе удобно. Это позволяет не только ускорить свою работу, но и снижает нагрузку на пальцы.`,
		],
		icon: IconCode,
	},
];
export default function FeatureCards() {
	const theme = useMantineTheme();
	const {classes} = useStyles();
	const features = data.map(item => (
		<motion.div
			key={item.title}
			initial={{opacity: 0}}
			whileInView={{opacity: 1}}
			transition={{duration: 2}}
		>
			<Card
				withBorder
				shadow={`md`}
				radius={`md`}
				className={classes.card}
				padding={`xl`}
				h={`100%`}
			>
				<item.icon
					style={{
						width: rem(50),
						height: rem(50),
					}}
					stroke={1.3}
					color={theme.colors.blue[6]}
				/>

				<Title fz={20} fw={500} className={classes.cardTitle} mt={`md`}>
					{item.title}
				</Title>

				{item.text.map((item, index) => (
					<Text fz={15} c={`md`} mt={`md`} key={index}>
						{item}
					</Text>
				))}
			</Card>
		</motion.div>
	));
	return (
		<SimpleGrid cols={3} breakpoints={[{maxWidth: `62rem`, cols: 1}]}>
			{features}
		</SimpleGrid>
	);
}
