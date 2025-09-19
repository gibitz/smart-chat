import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ message: "Unauthorized - No Token Provided." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User Not Found." });

        req.user = user;
        next();
    } catch (e) {
        console.log(e);

        if (e.name === "TokenExpiredError") return res.status(401).json({ message: "Unauthorized - Token Expired" });
        if (e.name === "JsonWebTokenError") return res.status(401).json({ message: "Unauthorized - Invalid Token" });

        return res.status(500).json({ message: "Something went wrong!" });
    }
};