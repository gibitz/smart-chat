import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

import { Camera, AtSign, Mail, User } from "lucide-react";

const ProfilePage = () => {
	const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = async () => {
			const base64Image = reader.result;
			setSelectedImage(base64Image);
			await updateProfile({ profilePic: base64Image });
		};
	};

	return (
		<div className="min-h-svh bg-base-200">
			<div className="max-w-2xl mx-auto pt-20 p-4">
				<div className="bg-base-300 rounded-xl p-4 space-y-4 shadow-md">
					<div className="text-center">
						<h1 className="text-2xl font-semibold">Profile</h1>
						<p className="text-sm">Your profile information.</p>
					</div>
					{/* avatar upload section */}
					<div className="flex flex-col items-center gap-2">
						<div className="relative">
							<img
								src={selectedImage || authUser.profilePic || "/avatar.png"}
								alt="Profile"
								className="size-32 rounded-full object-cover border-4"
							/>
							<label
								htmlFor="avatar-upload"
								className={`absolute bottom-0 right-0 bg-primary hover:scale-110 p-2 rounded-full cursor-pointer transition-all duration-200 ${
									isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
								}`}
							>
								<Camera className="size-5 text-primary-content" />
								<input
									type="file"
									id="avatar-upload"
									className="hidden"
									accept="image/*"
									onChange={handleImageUpload}
									disabled={isUpdatingProfile}
								/>
							</label>
						</div>
						<p className="text-sm text-base-content">
							{isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
						</p>
					</div>
					<div className="space-y-6">
						<div className="space-y-1.5">
							<div className="text-sm text-base-content flex items-center font-medium gap-2">
								<AtSign className="size-5 text-primary" />
								Username
							</div>
							<p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.username}</p>
						</div>

						<div className="space-y-1.5">
							<div className="text-sm text-base-content flex items-center font-medium gap-2">
								<User className="size-5 text-primary" />
								Full Name
							</div>
							<p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
						</div>

						<div className="space-y-1.5">
							<div className="text-sm text-base-content flex items-center font-medium gap-2">
								<Mail className="size-5 text-primary" />
								Email Address
							</div>
							<p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
						</div>
					</div>

					<div className="mt-6 bg-base-300 rounded-xl p-6">
						<h2 className="text-lg font-medium mb-4">Account Information</h2>
						<div className="space-y-3 text-sm">
							<div className="flex items-center justify-between py-2 border-b border-base-100">
								<span>Member Since</span>
								<span>{authUser.createdAt?.split("T")[0]}</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<span>Account Status</span>
								<span className="text-green-500">Active</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
