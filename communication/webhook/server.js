const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app); // HTTP server to handle WebSocket connections
const io = new Server(server); // Socket.io server

// Serve the HTML file at the root route
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

// webhook endpoint, this will set in the application where we are waiting for the data.
// so this is delivery app, so once resturent gets an order, so in this delivery app we will receive the info which will send by resturant app
app.post("/webhook", (req, res) => {
    const payload = req.body;
    console.log("received webhook payload", payload)
    res.status(200).send("webhook received");
})

// Set the port for the server
const port = process.env.PORT || 5011;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
