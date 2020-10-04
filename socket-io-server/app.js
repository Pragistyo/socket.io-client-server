'use strict'
import http from 'http'
import express, {Router} from 'express'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import cors from 'cors'
import socketIo from 'socket.io'
import indexRoute from './routes/index'
 
const app = express()
const port = process.env.PORT ||9000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/socket", indexRoute )

//setting socket
const server = http.createServer(app);
const io = socketIo(server);

let interval;
io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });
  
  const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };

server.listen(port,  () => {
    console.log(chalk.blue('Hello Port: ' + chalk.yellow(port)))
})