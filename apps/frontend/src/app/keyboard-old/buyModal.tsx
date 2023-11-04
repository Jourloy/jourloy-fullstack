"use client";

import Button from "@/components/actions/button";
import Card from "@/components/layout/card";
import Divider from "@/components/layout/divider";
import Modal from "@/components/layout/modal";
import {useState} from "react";

interface IBuyModal {
	buttonClassName?: string;
	modalClassName?: string;
	label?: string;
}

export default function BuyModal(props: IBuyModal) {
	const [hidden, setHidden] = useState(true);

	const buttonClassName = `mt-[30px] w-[100%] ${props.buttonClassName}`;

	return (
		<>
			<Modal hidden={hidden} toggle={() => setHidden(!hidden)} className={props.modalClassName}>
				<div className={`grid grid-cols-1`}>
					<p className={`text-red-500`}>К сожалению на сайте сейчас нельзя оформить заказ</p>
				</div>
				<Divider color={`accent`} />
				<div className={`text-center text-[23px]`}>
					Можно оформить заказ через телеграм, для этого просто напиши нам
				</div>
				<Card variant={`outline`} className={`mt-[15px]`}>
					<h1 className={`text-white text-center`}>@JOURLOY</h1>
				</Card>
				<div className={`text-center text-[14px] text-neutral-500`}>(или нажми на карточку)</div>
				<Divider color={`accent`} />
				<div className={`text-center text-[20px]`}>
					Если ты юридическое лицо или нужна большая партия, то ждем от тебя письма к нам на почту
				</div>
				<Card variant={`outline`} className={`mt-[15px]`}>
					<h1 className={`text-white text-center`}>support@jourloy.com</h1>
				</Card>
			</Modal>

			<Button className={buttonClassName} color={`accent`} onClick={() => setHidden(false)}>
				<p className={`font-["SF_Pro_Display_Regular"]`}>{props.label ?? `Начать кайфовать от клавиатуры`}</p>
			</Button>
		</>
	);
}
