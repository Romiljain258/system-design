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

// Handle Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        // Emit the received message to all clients
        io.emit('chat message', msg);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Set the port for the server
const port = process.env.PORT || 5011;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
