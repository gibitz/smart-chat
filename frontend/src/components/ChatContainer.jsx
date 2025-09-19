import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime, formatDateSeparator, hasDateSeparator } from "../utils/dateUtils";
import DateSeparator from "./DateSeparator.jsx";

const ChatContainer = () => {
	const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } =
		useChatStore();
	const { authUser } = useAuthStore();
	const messageEndRef = useRef(null);

	useEffect(() => {
		getMessages(selectedUser._id);

		subscribeToMessages();

		return () => unsubscribeFromMessages();
	}, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

	useEffect(() => {
		if (messageEndRef.current && messages) messageEndRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	if (isMessagesLoading) {
		return (
			<div className="flex flex-1 flex-col overflow-auto">
				<ChatHeader />
				<MessageSkeleton />
				<MessageInput />
			</div>
		);
	}

	return (
		<div className="flex flex-1 flex-col overflow-auto">
			<ChatHeader />
			<div className="overflow-y-auto p-4 space-y-4 relative flex-1">
				{messages.map((message, i) => (
					<div>
						{hasDateSeparator(messages, i) && (
							<DateSeparator date={formatDateSeparator(new Date(message.createdAt))} />
						)}
						<div
							key={message._id}
							className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
							ref={messageEndRef}
						>
							<div className="chat-image avatar">
								<div className="size-10 rounded-full border">
									<img
										src={
											message.senderId === authUser._id
												? authUser.profilePic || "/avatar.png"
												: selectedUser.profilePic || "/avatar.png"
										}
										alt="Profile Pic"
									/>
								</div>
							</div>
							<div className="chat-header mb-1">
								<time className="text-xs opacity-50">{formatMessageTime(message.createdAt)}</time>
							</div>
							<div className={`chat-bubble ${message.senderId === authUser._id ? "bg-primary text-primary-content" : "bg-base-200 text-base-content"} break-words mx-w-sm sm:max-w-md`}>
								{/* className={`chat ${message.senderId === authUser._id ? "bg-primary text-primary-content" : "bg-base-200"}`} */}
								{message.image && (
									<img
										src={message.image}
										alt="Attachment"
										className="sm:max-w-[200px] rounded-md mb-2"
									/>
								)}
								{message.content && <p>{message.content}</p>}
							</div>
						</div>
					</div>
				))}
			</div>
			<MessageInput />
		</div>
	);
};

export default ChatContainer;
