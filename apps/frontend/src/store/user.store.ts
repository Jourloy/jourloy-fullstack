import { create } from 'zustand'

interface IUser {
	logined: boolean;
	username: string;
	avatar: string;
	role: string;
}

export const useUserStore = create<IUser>(set => ({
	logined: false,
	username: ``,
	avatar: ``,
	role: ``,
}));