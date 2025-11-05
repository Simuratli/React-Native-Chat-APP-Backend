import { Server as SocketIOServer, Socket } from "socket.io";
import users from "../models/users";
import { generateToken } from "../utils/token";
export function registerUserEvents(io: SocketIOServer, socket: Socket) {
    socket.on("testSocket", (data) => {
        socket.emit("testSocket", { msg: "Realtime updates!", data });
    })

    socket.on("updateProfile", async (data: { name?: string, avatar?: string }) => {
        console.log("UPDATE PROFILE EVENT: ", data);

        const userId = socket.data.userId;

        if (!userId) {
            return socket.emit("updateProfile", {
                success: false, msg: "Unauthorized"
            })
        }


        try {
            const updatedUser = await users.findByIdAndUpdate(
                userId,
                {
                    name: data.name,
                    avatar: data.avatar
                },
                { new: true }
            );

            if (!updatedUser) {
                return socket.emit("updateProfile", {
                    success: false, msg: "User not found"
                })
            }

            // generate token with updated user
            const newToken = generateToken(updatedUser);
            socket.emit("updateProfile", {
                success: true, msg: "Profile updated successfully", data: { token: newToken }
            })

        } catch (error) {
            console.log("Error updating profile: ", error);
            socket.emit("updateProfile", {
                success: false, msg: "Error updating profile"
            })
        }
    })
}