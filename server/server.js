const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('./server/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
    console.log('Server is live!!');
})

const history = [];

const calcObj = {
    val1: 0,
    val2: 0,
    operator: '+',
    sum: 0,
}

// ------------------------------------------

// GET BEGIN
app.get('/calculate', (req, res) => {
    console.log('server.js /calculate GET');

    res.send(calcObj);
})
// GET END

// ------------------------------------------

// POST BEGIN
app.post('/calculate', (req, res) => {
    console.log('server.js /calculate POST', req.body);

    history.push(req.body);

    calc(req.body);

    res.sendStatus(201);
})
// POST END

// ------------------------------------------

// FUNCTIONS

function calc(obj) {
    obj.sum 
}