import { UserProps } from "../types";
import jwt from "jsonwebtoken";
export const generateToken = (user: UserProps) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
    }

    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1m" })
}