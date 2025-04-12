const express = require("express");
const { join } = require("node:path");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

app.get("/sse", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Cache-Control", "no-cache"); // we don't want to cache the event stream

    // I want to keep sending events from server to client
    res.write("data: welcome to the server \n\n");
    const intervalId = setInterval(() => {
        res.write(`data: server time ${new Date().toLocaleDateString()} \n\n`);
    }, 5000);

    //if connection closed
    req.on("close", () => {
        console.log("Connection closed");
        clearInterval(intervalId);
    });
});
const port = process.env.PORT || 5011;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
