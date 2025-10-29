import { Request, Response } from "express"
import users from "../models/users";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";

export const registerUser = async (req: Request, res: Response) => {
    const { email, password, name, avatar } = req.body;
    console.log('Registering user with email:', email);

    try {
        let user = await users.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        user = new users({ email, password, name, avatar: avatar ? avatar : "" })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const token = generateToken(user);
        res.json({ success: true, token })

    } catch (error) {
        console.log("Registration error:", error);
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password, } = req.body;
    try {
        let user = await users.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "There is no regitered  users" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        const token = generateToken(user);
        res.json({ success: true, token })

    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" })
    }

}