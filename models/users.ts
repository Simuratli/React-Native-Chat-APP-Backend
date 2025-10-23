import { Schema, model } from "mongoose";
import { UserProps } from "../types";

const userSchema = new Schema<UserProps>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,

    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "",
    },
    created: {
        type: String,
        default: new Date().toISOString(),
    }

})

export default model<UserProps>("User", userSchema);