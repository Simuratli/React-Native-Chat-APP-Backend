"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserEvents = registerUserEvents;
const users_1 = __importDefault(require("../models/users"));
const token_1 = require("../utils/token");
function registerUserEvents(io, socket) {
    socket.on("testSocket", (data) => {
        socket.emit("testSocket", { msg: "Realtime updates!", data });
    });
    socket.on("updateProfile", async (data) => {
        console.log("UPDATE PROFILE EVENT: ", data);
        const userId = socket.data.userId;
        if (!userId) {
            return socket.emit("updateProfile", {
                success: false, msg: "Unauthorized"
            });
        }
        try {
            const updatedUser = await users_1.default.findByIdAndUpdate(userId, {
                name: data.name,
                avatar: data.avatar
            }, { new: true });
            if (!updatedUser) {
                return socket.emit("updateProfile", {
                    success: false, msg: "User not found"
                });
            }
            // generate token with updated user
            const newToken = (0, token_1.generateToken)(updatedUser);
            socket.emit("updateProfile", {
                success: true, msg: "Profile updated successfully", data: { token: newToken }
            });
        }
        catch (error) {
            console.log("Error updating profile: ", error);
            socket.emit("updateProfile", {
                success: false, msg: "Error updating profile"
            });
        }
    });
}
//# sourceMappingURL=userEvents.js.map