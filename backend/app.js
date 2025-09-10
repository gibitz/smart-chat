import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
const PORT = process.env.PORT

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
    console.error(err);
    
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
});

app.listen(PORT, () => {
    connectDB();
    console.log(`RUNNING ON PORT ${PORT}`);
});