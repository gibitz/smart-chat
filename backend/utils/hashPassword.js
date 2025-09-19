import bcrypt from "bcryptjs";

// * GENERATE SALT ROUNDS THEN HASH THE PASSWORD
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

// * COMPARE SENT PASSWORD WITH HASHED ONE SOTRED IN DB
export const compareHashPassword = async (password, storedHashPassword) => {
    try {
        const isPasswordCorrect = await bcrypt.compare(password, storedHashPassword);
        return isPasswordCorrect;
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};