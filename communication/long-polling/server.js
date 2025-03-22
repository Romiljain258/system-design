const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let data = 'hello world';
let waitingClientList = [];

// we are checking last data and this data should not be matched, we have to only process new data to client otherwise if time ends we have to close req by sending no data found message
// generaly we send message.id or some id to compare last data and new data
app.get('/getData', (req, res) => {
    if (req.query.lastData !== data) {
        res.json({ data })
    }
    else {
        waitingClientList.push(res)
    }
});


// we have to close req if no data found after some time
app.get('/updateData', (req, res) => {
    data = req.query.newData;
    while (waitingClientList.length > 0) {
        const client = waitingClientList.pop();
        client.json({ data });
    }
    res.send({ success: "Data send successfully!" });
})

const port = process.env.PORT || 5011;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
