import mongoose from "mongoose";
const Schema = mongoose.Schema;

const opts = { timestamps: true };

const messageSchema = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
        },
        image: {
            type: String,
        },
    }, opts
);

const Message = mongoose.model("Message", messageSchema);

export default Message;