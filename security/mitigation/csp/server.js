const express = require("express");

const app = express();
const PORT = "2010";

app.use(express.static("public"));

app.use((req, res, next) => {
    // now we are telling any API which is outside of the domain will not be called from our website.
    // "script-src 'self' http://unsecure.com" - there I'm allowing which all domains or external libraries we can load it other than our own domain path
    // 'nonce-randomKey' - all scipt which has nonce can be executed
    // unsafe-inline - all the script which are written in my inline codebase like html file, can be executed by writing this

    res.setHeader("Content-Security-Policy", "default-src 'self';" + "script-src 'self' 'nonce-randomKey' 'unsafe-inline' http://unsecure.com");
    next();
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.listen(PORT, () => {
    console.log("server started");
});
