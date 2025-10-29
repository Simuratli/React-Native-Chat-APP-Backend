"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intializeSocket = intializeSocket;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const socket_io_1 = require("socket.io");
const userEvents_1 = require("./userEvents");
dotenv_1.default.config();
function intializeSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        }
    });
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("Authentication error no token provided"));
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error("Authentication error invalid token"));
            }
            //ATTACH USER DATA TO SOCKET
            let userData = decoded;
            socket.data = userData;
            socket.data.userId = userData.id;
            next();
        });
    });
    // when socked connect's register events
    io.on('connection', async (socket) => {
        const userId = socket.data.userId;
        console.log(`User connected: ${userId} : ${socket.data.name}`);
        // register events
        (0, userEvents_1.registerUserEvents)(io, socket);
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${userId} : ${socket.data.name}`);
        });
    });
    return io;
}
//# sourceMappingURL=socket.js.map