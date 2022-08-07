import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";

export default function connect() {
    const socket = socketIOClient(ENDPOINT);
    return new Promise(resolve => {
      socket.on('connect', () => { 
        resolve(socket);
        console.log("Socket connected");
        
      });
    });
}