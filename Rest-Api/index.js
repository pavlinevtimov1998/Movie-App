const express = require("express");

const app = express();

app.use('/', (req, res) => {
    console.log('asd');
    res.send('hello')
    
})

app.listen(3030, () => console.log("Listening on port 3030..."));
