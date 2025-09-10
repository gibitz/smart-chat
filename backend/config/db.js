import mongoose from "mongoose";

// * ESTABLISH CONNECTION WITH MONGODB
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`MONGO CONNECTED AT ${conn.connection.host}`)
    } catch (e) {
        console.log(e);
        process.exit(1);
    };
};