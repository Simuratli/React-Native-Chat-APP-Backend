"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = require("../utils/token");
const registerUser = async (req, res) => {
    const { email, password, name, avatar } = req.body;
    console.log('Registering user with email:', email);
    try {
        let user = await users_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        user = new users_1.default({ email, password, name, avatar: avatar ? avatar : "" });
        const salt = await bcryptjs_1.default.genSalt(10);
        user.password = await bcryptjs_1.default.hash(password, salt);
        await user.save();
        const token = (0, token_1.generateToken)(user);
        res.json({ success: true, token });
    }
    catch (error) {
        console.log("Registration error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password, } = req.body;
    try {
        let user = await users_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "There is no regitered  users" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = (0, token_1.generateToken)(user);
        res.json({ success: true, token });
    }
    catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.controller.js.map