import {Button, ButtonProps, createStyles, DefaultMantineColor} from "@mantine/core";
import {useCallback, useState} from "react";
import {useLongPress} from "use-long-press";

type TProps = {
	/**
	 * State of the button. Get from `useState`
	 */
	loading: boolean;

	/**
	 * Label of the button
	 *
	 * Default: `Удалить`
	 */
	label: string;

	/**
	 * How long to wait before triggering the `onPressed`
	 *
	 * Default: `2`
	 */
	seconds?: number;

	onPressed: () => void;
};

const useStyles = createStyles(
	(theme, {color, seconds}: {color: DefaultMantineColor; seconds: string}) => ({
		button: {
			position: "relative",
			overflow: "hidden",
			"&::before": {
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				height: "100%",
				content: `attr(data-content)`,
				position: "absolute",
				top: 0,
				left: 0,
				bottom: 0,
				color: theme.white,
				borderRadius: theme.radius.xs,
				margin: "auto",
				clipPath: "polygon(0 0, 0 0, 0% 100%, 0 100%)",
				transition: `all ${seconds} ease`,
			},
		},

		onMousedown: {
			"&::before": {
				backgroundColor: theme.colors[color][theme.colorScheme === "dark" ? 5 : 6],
				clipPath: "polygon(0 0, 110% 0, 110% 110%, 0 110%)",
			},
		},
	})
);

export default function LongPressButton({
	onPressed,
	label = `Удалить`,
	seconds = 2,
	loading,
	...props
}: TProps & ButtonProps) {
	const [progress, setProgress] = useState(0);

	const callback = useCallback(() => {
		onPressed();
	}, []);

	const bind = useLongPress(callback, {
		onStart: () => setProgress(100),
		onCancel: () => setProgress(0),
		onFinish: () => {
			setProgress(0);
		},
		threshold: 1000 * seconds,
	});

	const {classes, cx} = useStyles({color: props.color || `gray`, seconds: seconds + `s`});

	return (
		<Button
			{...props}
			className={cx(classes.button, {[classes.onMousedown]: progress === 100})}
			data-content={label}
			{...bind()}
			loaderPosition={`center`}
			loading={loading}
		>
			{!loading && label}
		</Button>
	);
}
