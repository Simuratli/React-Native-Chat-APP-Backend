"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./rouets/auth.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const socket_1 = require("./socket/socket");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.default);
app.get("/", (req, res) => {
    res.send("Server is running!");
});
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
// Start Socket.IO with the HTTP server
(0, socket_1.intializeSocket)(server);
(0, db_1.default)().then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map