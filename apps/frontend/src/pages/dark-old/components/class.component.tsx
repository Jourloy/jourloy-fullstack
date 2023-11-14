import {Title, Card, Group, UnstyledButton, Stack, Badge, Image, Avatar} from "@mantine/core";
import {TDarkClass} from "../../../types";
import {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import DarkClassModal from "../modals/class.modal";
import DarkLogic from "../logic";

type TProps = {
	class: TDarkClass;
};

export default function Class(props: TProps) {
	const logic = new DarkLogic(props.class);

	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const activeClass = searchParams.get(`class`);

	const [width, setWidth] = useState(`150px`);
	const [top, setTop] = useState(`-52px`);
	const [blur, setBlur] = useState(`1px`);
	const [brightness, setBrightness] = useState(`0.7`);

	const [modal, setModal] = useState(props.class.enName.toLocaleLowerCase() === activeClass);

	const onMouseEnter = () => {
		setWidth(`200px`);
		setTop(`-110px`);
		setBlur(`2px`);
		setBrightness(`0.3`);
	};

	const onMouseLeave = () => {
		setWidth(`150px`);
		setTop(`-52px`);
		setBlur(`1px`);
		setBrightness(`0.7`);
	};

	const onClick = () => {
		navigate(`/dark?class=${props.class.enName.toLocaleLowerCase()}`);
		setModal(true);
	}

	const onClose = () => {
		navigate(`/dark`);
		setModal(false);
	}

	return (
		<>
			<DarkClassModal opened={modal} onClose={onClose} class={props.class} />
			<UnstyledButton
				w={`100%`}
				h={`120px`}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={onClick}
			>
				<Card h={`100%`} style={{overflow: `visible`}}>
					<Image
						src={logic.getBackgroundUrl()}
						style={{
							position: `absolute`,
							left: `0px`,
							top: `0px`,
							transition: `all 0.5s ease-in-out`,
							filter: `blur(${blur}) brightness(${brightness})`,
						}}
						height={`120px`}
						radius={`md`}
					/>
					<Image
						className={`class-image`}
						src={logic.getClassUrl()}
						style={{
							position: `absolute`,
							top: top,
							right: `20px`,
							filter: ``,
							transition: `all 0.5s ease-in-out`,
							width: width,
						}}
					/>
					<Stack style={{position: `absolute`}}>
						<Group>
							<Avatar src={logic.getClassIconUrl()} variant={`outline`} />
							<Badge variant={`outline`} radius={`sm`} color={logic.getTypeColor()}>
								{logic.getType()}
							</Badge>
						</Group>
						<Group>
							<Title order={3} color={`white`}>
								{props.class.enName}
							</Title>
						</Group>
					</Stack>
				</Card>
			</UnstyledButton>
		</>
	);
}
