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
	setLogined: (logined: boolean) => set({ logined }),
	setUsername: (username: string) => set({ username }),
	setAvatar: (avatar: string) => set({ avatar }),
	setRole: (role: string) => set({ role }),
}));