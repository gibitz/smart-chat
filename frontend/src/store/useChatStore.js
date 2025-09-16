import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSendingMessage: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/users");
            set({ users: res.data });
        } catch (e) {
            console.log(e);
            toast.error(e.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messages: res.data });
        } catch (e) {
            console.log(e);
            toast.error(e.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        set({ isSendingMessage: true });
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (e) {
            console.log(e);
            toast.error(e.response.data.message);
        } finally {
            set({ isSendingMessage: false });
        }
    },

    // todo: optimize
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));