const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('./server/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
    console.log('Server is live!!');
})

const history = [];

let calcObj = {
    val1: 0,
    val2: 0,
    operator: '+',
    sum: 0,
}

console.log(calcObj);

// ------------------------------------------

// GET BEGIN
app.get('/calculate', (req, res) => {
    console.log('server.js /calculate GET');
    console.log(calcObj);

    res.send(calcObj);
})

app.get('/history', (req, res) => {
    console.log('server.js /history GET');
    console.log(history);

    res.send(history);
})
// GET END

// ------------------------------------------

// POST BEGIN
app.post('/calculate', (req, res) => {
    console.log('server.js /calculate POST', req.body);

    history.push(req.body);

    calcObj = req.body;

    calc();

    res.sendStatus(201);
})

app.post('/history', (req, res) => {
    console.log('server.js /history POST');

    history.splice(req.body.index, 1);

    res.sendStatus(200);
})
// POST END

// ------------------------------------------

// FUNCTIONS

function calc() {
    switch(calcObj.operator) {
        case '+':
            calcObj.sum = Number(calcObj.val1) + Number(calcObj.val2);
            break;
        case '-':
            calcObj.sum = Number(calcObj.val1) - Number(calcObj.val2);
            break;
        case '/':
            calcObj.sum = Number(calcObj.val1) / Number(calcObj.val2);
            break;
        case '%':
            calcObj.sum = Number(calcObj.val1) % Number(calcObj.val2);
            break;
        case '*':
            calcObj.sum = Number(calcObj.val1) * Number(calcObj.val2);
            break;
    }
}