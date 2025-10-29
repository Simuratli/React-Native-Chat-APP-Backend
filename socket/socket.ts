import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';
import { registerUserEvents } from './userEvents';
dotenv.config();

export function intializeSocket(server:any) {
 const io = new Server(server, {
    cors: {
        origin: "*",
    }
 });

 io.use((socket:Socket,next)=>{
    const token  = socket.handshake.auth.token;
    if(!token){
        return next(new Error("Authentication error no token provided"));
    }

    jwt.verify(token, process.env.JWT_SECRET!,(err:any,decoded:any)=>{
        if(err){
            return next(new Error("Authentication error invalid token"));
        }
        //ATTACH USER DATA TO SOCKET
        let userData = decoded
        socket.data = userData;
        socket.data.userId = userData.id;
        next();
    })
 })

 // when socked connect's register events

 io.on('connection',async(socket:Socket)=>{
    const userId = socket.data.userId;
    console.log(`User connected: ${userId} : ${socket.data.name}`);
    
    // register events
    registerUserEvents(io,socket);

    socket.on('disconnect',()=>{
        console.log(`User disconnected: ${userId} : ${socket.data.name}`);
    });
 })
 return io;
}