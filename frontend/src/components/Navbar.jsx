import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
	const { logout, authUser } = useAuthStore();

	return (
		<header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg shadow-md">
			<div className="container mx-auto px-4 h-16">
				<div className="flex items-center justify-between h-full">
					<div className="flex items-center gap-8">
						<Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
							<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
								<MessageSquare className="size-5 text-primary" />
							</div>
							<h1 className="text-lg font-bold">Smart Chat</h1>
						</Link>
					</div>
					<div className="flex items-center gap-2">
						<Link to={"/settings"} className={`btn btn-sm border-none gap-2 bg-primary/10 transition-colors ease-in duration-200 rounded-lg`}>
							<Settings className="size-5 text-primary" />
							<span className="hidden sm:inline">Settings</span>
						</Link>

						{authUser && (
							<>
								<Link
									to={"/profile"}
									className={`btn btn-sm border-none gap-2 bg-primary/10 transition-colors ease-in duration-200 rounded-lg `}
								>
									<User className="size-5 text-primary" />
									<span className="hidden sm:inline">Profile</span>
								</Link>

								<button
									className="btn btn-sm gap-2 border-none bg-primary/10 flex items-center transition-colors ease-in duration-200 rounded-lg"
									onClick={logout}
								>
									<LogOut className="size-5 text-primary" />
									<span className="hidden sm:inline">Logout</span>
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
