import { config } from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.model.js";
import Message from "../models/Message.model.js"
import bcrypt from "bcryptjs";

config();

const seedUsers = [
    // Female Users
    {
        email: "emma.thompson@example.com",
        fullName: "Emma Thompson",
        username: "emma.thompson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        email: "olivia.miller@example.com",
        fullName: "Olivia Miller",
        username: "olivia.miller",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        email: "sophia.davis@example.com",
        fullName: "Sophia Davis",
        username: "sophia.davis",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        email: "ava.wilson@example.com",
        fullName: "Ava Wilson",
        username: "ava.wilson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        email: "isabella.brown@example.com",
        fullName: "Isabella Brown",
        username: "isabella.brown",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
        email: "mia.johnson@example.com",
        fullName: "Mia Johnson",
        username: "mia.johnson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
        email: "charlotte.williams@example.com",
        fullName: "Charlotte Williams",
        username: "charlotte.williams",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
        email: "amelia.garcia@example.com",
        fullName: "Amelia Garcia",
        username: "amelia.garcia",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    },

    // Male Users
    {
        email: "james.anderson@example.com",
        fullName: "James Anderson",
        username: "james.anderson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        email: "william.clark@example.com",
        fullName: "William Clark",
        username: "william.clark",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
        email: "benjamin.taylor@example.com",
        fullName: "Benjamin Taylor",
        username: "benjamin.taylor",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        email: "lucas.moore@example.com",
        fullName: "Lucas Moore",
        username: "lucas.moore",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
        email: "henry.jackson@example.com",
        fullName: "Henry Jackson",
        username: "henry.jackson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        email: "alexander.martin@example.com",
        fullName: "Alexander Martin",
        username: "alexander.martin",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
        email: "daniel.rodriguez@example.com",
        fullName: "Daniel Rodriguez",
        username: "daniel.rodriguez",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();
        await User.deleteMany({});
        await Message.deleteMany({})
        for (const user of seedUsers) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully with hashed passwords");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close()
    }
};

seedDatabase();