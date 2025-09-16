import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
const PORT = process.env.PORT

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.use((err, req, res, next) => {
    console.error(err);

    const status = err.status || 500;
    const message = err.message || "Something went wrong!";

    res.status(status).json({ message });
});

app.listen(PORT, () => {
    connectDB();
    console.log(`RUNNING ON PORT ${PORT}`);
});