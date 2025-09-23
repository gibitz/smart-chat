import { useThemeStore } from "../store/useThemeStore";
import DateSeparator from "../components/DateSeparator.jsx";

import { THEMES } from "../constants/index";

import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
	{ id: 1, content: "Hey! How've you been doing?", isSent: false },
	{ id: 2, content: "I'm doing good, thanks!", isSent: true },
];

const SettingsPage = () => {
	const { theme, setTheme } = useThemeStore();

	return (
		<div className="min-h-svh bg-base-200">
			<div className="space-y-5 container mx-auto px-4 pb-10 max-w-5xl">
				<div className="flex flex-col gap-1 pt-20">
					<h2 className="text-lg font-semibold">Theme</h2>
					<p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
				</div>
				<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
					{THEMES.map((t) => (
						<button
							key={t}
							className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
								theme === t ? "bg-base-300" : "hover:bg-base-100"
							}`}
							onClick={() => setTheme(t)}
						>
							<div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
								<div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
									<div className="rounded bg-primary"></div>
									<div className="rounded bg-secondary"></div>
									<div className="rounded bg-accent"></div>
									<div className="rounded bg-neutral"></div>
								</div>
							</div>
							<span className="text-xs">{t.charAt(0).toUpperCase() + t.slice(1)}</span>
						</button>
					))}
				</div>
				{/* Preview Section */}
				<div className="rounded-xl overflow-hidden shadow-md p-4 bg-base-300">
					<h3 className="text-lg font-semibold mb-3">Preview</h3>
					<div className="max-w-xl mx-auto bg-base-100 rounded-xl shadow-sm overflow-hidden">
						{/* Chat Header */}
						<div className="p-3 border-b border-base-300 flex items-center gap-3">
							<div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
								Y
							</div>
							<div>
								<h3 className="font-medium text-sm">Your Friend</h3>
								<p className="text-xs text-base-content/70">Online</p>
							</div>
						</div>

						{/* Chat Messages */}
						<div className="p-2 space-y-4 min-h-[200px] overflow-y-auto bg-base-100">
							<DateSeparator date={"Today"} />
							{PREVIEW_MESSAGES.map((message) => (
								<div key={message.id} className={`chat ${message.isSent ? "chat-end" : "chat-start"}`}>
									<div
										className={` rounded-xl p-3 shadow-sm ${
											message.isSent ? "bg-primary text-primary-content" : "bg-base-200"
										}`}
									>
										<p className="text-sm">{message.content}</p>
										<p
											className={`text-[10px] mt-1.5 ${
												message.isSent ? "text-primary-content/70" : "text-base-content/70"
											}`}
										>
											12:00 PM
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Chat Input */}
						<div className="p-4 border-t border-base-300 bg-base-100 flex gap-2">
							<input
								type="text"
								className="input input-bordered rounded-lg flex-1 text-sm h-10"
								placeholder="Type a message..."
								value="This is a preview"
								readOnly
							/>
							<button className="btn btn-primary btn-circle h-10 min-h-0">
								<Send size={22} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SettingsPage;
