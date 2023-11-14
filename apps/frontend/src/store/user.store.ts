import {create} from "zustand";

type TUserStore = {
	username: string;
	avatar: string;
	logined: boolean;
	role: string;
};

export const useUserStore = create<TUserStore>(() => ({
	username: ``,
	avatar: ``,
	logined: false,
	role: ``,
}));
