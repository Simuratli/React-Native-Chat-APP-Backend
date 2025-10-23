"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "1m" });
};
exports.generateToken = generateToken;
//# sourceMappingURL=token.js.map