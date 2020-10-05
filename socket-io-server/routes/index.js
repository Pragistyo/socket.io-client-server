'use strict'

import express from 'express'
import chalk from 'chalk'
const router = express.Router()


router.get('/',(req,res)=>{
    let socket_id = [];
    const io = req.app.get('socketio')
    // console.log(chalk.green(JSON.stringify(req.app.get('socketio'))))
    // io.emit('hi!');
    let interval;
    io.on("connection", (socket) => {
        console.log("New client connected");
        socket_id.push(socket.id);
        if (socket_id[0] === socket.id) {
            // remove the connection listener for any subsequent 
            // connections with the same ID
            io.removeAllListeners('connection'); 
          }
        if (interval) {
        clearInterval(interval);
        }
        interval = setInterval(() => getApiAndEmit(socket), 1000);
            socket.on("disconnect", () => {
            console.log("Client disconnected");
            clearInterval(interval);
        });
        getApiAndEmit(socket)
    });
  
    const getApiAndEmit = socket => {
    const response = new Date();
        console.log(' this is response: '+ response+ '\n aaa ')
        // Emitting a new message. Will be consumed by the client
        let number = Math.random(100)
        socket.emit("FromAPI", `this is response = ${number}`);
        
    };
    console.log('berhasil')
    res.send('berhasil -> io ').status(200)
})

export default router