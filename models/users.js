"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
});
exports.default = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=users.js.map