import CustomButton from "@/components/actions/button";
import Avatar from "../avatar";
import { Divider } from "@mantine/core";

export default function HeaderComponent() {
	return (
		<header className={`bg-transparent mt-[10px] w-full flex flex-col space-y-[10px] items-center justify-center h-[45px] absolute`}>
			<div className={`max-w-[850px] w-full flex justify-between items-center px-[15px] z-[99]`}>
				<CustomButton variant={`transparent`} redirect={`/`}>
					<h1 className={`text-black text-[35px] leading-none`}>JOURLOY</h1>
				</CustomButton>
				<div className={`flex justify-center items-center h-full`}>
					<Avatar />
				</div>
			</div>
			<Divider color={`black`} orientation={`horizontal`} w={`100%`}/>
		</header>
	);
}
