import socketIOClient from "socket.io-client";
import { API_URL } from '../../config';

export default function connect() {
    const socket = socketIOClient(API_URL);
    return new Promise(resolve => {
      socket.on('connect', () => { 
        resolve(socket);
        console.log("Socket connected");
        
      });
    });
}