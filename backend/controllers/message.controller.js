import User from "../models/User.model.js";
import Message from "../models/Message.model.js";
import cloudinary from "../config/cloudinary.js";
import { getReceiverSocketId, io } from "../config/socket.js";

export const getUsersSidebar = async (req, res) => {
    try {
        const loggedUserId = req.user._id;
        const users = await User.find({ _id: { $ne: loggedUserId } }).select("-password");

        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }

};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        return res.status(200).json(messages);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { content, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploaded = await cloudinary.uploader.upload(image);
            imageUrl = uploaded.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            content,
            image: imageUrl,
        });
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};