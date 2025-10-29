"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserEvents = registerUserEvents;
function registerUserEvents(io, socket) {
    socket.on("testSocket", (data) => {
        socket.emit("testSocket", { msg: "Test socket received", data });
    });
}
//# sourceMappingURL=userEvents.js.map