import User from "../models/User.model.js";
import { hashPassword, compareHashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";

// * USER CONTROLLER FOR SIGNIN UP
export const signup = async (req, res) => {
    const { username, email, fullName, password } = req.body;
    try {
        // * VERIFY IF ALL FIELDS ARE PROVIDED
        if (!username || !email || !fullName || !password) return res.status(400).json({ message: "All fields are required." });

        // * PASSWORD LENGTH VALIDATION
        if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." });

        // * UNIQUE EMAIL VALIDATION
        const userEmail = await User.findOne({ email });
        if (userEmail) return res.status(409).json({ message: "This email is already in use with other accounts." });

        // * UNIQUE USERNAME VALIDATION
        const existingUsername = await User.findOne({ username });
        if (existingUsername) return res.status(409).json({ message: "Username already exists." });

        // * HASH PASSWORD THEN CREATE USER ON DB
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            username,
            email,
            fullName,
            password: hashedPassword,
        });

        if (newUser) {
            await newUser.save();
            generateToken(newUser._id, res);
            return res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic,
            })
        } else {
            return res.status(400).json({ message: "Invalid user data." });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }

};

// * USER CONTROLLER FOR LOGIN
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // * SEARCH USER IN DB
        const user = await User.findOne({ username });

        if (!user) return res.status(401).json({ message: "Username or password incorrect." });

        // * COMPARE WITH HASHED PASSWORD
        const isPasswordCorrect = await compareHashPassword(password, user.password);
        if (!isPasswordCorrect) return res.status(401).json({ message: "Username or password incorrect." });

        generateToken(user._id, res);
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

// * USER CONTROLLER FOR LOGOU
export const logout = (req, res) => {
    try {
        // * SET AUTH COOKIE TO BE EMPTY
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

// * USER CONTROLLER FOR UPDATING PROFILE PICTURE
export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        if (!profilePic) res.status(400).json({ message: "Profile pic is required." });

        const uploaded = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploaded.secure_url }, { new: true });

        return res.status(200).json(updatedUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (e) {
        console.log("Error in checkAuth controller.", e);
        res.status(500).json({ message: "Something went wrong!" });
    }
};