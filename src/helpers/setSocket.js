import socketIO from "socket.io-client";
export const socket = socketIO.connect(`http://${process.env.REACT_APP_API_URL}:3002`);
