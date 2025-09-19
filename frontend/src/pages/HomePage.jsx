import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
	const { selectedUser } = useChatStore();

	return (
		<div className="min-h-svh bg-base-200">
			<div className="flex items-center justify-center pt-20 px-4 xl:px-0">
				<div className="bg-base-100 rounded-lg w-full max-w-5xl h-[calc(100vh-8rem)]">
					<div className="flex h-full rounded-lg overflow-hidden shadow-md">
						<Sidebar />
						{!selectedUser ? <NoChatSelected /> : <ChatContainer />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
