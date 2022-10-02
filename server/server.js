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
// send results of calculation
app.get('/calculate', (req, res) => {
    console.log('server.js /calculate GET');
    console.log(calcObj);

    res.send(calcObj);
})

// send history to client to render
app.get('/history', (req, res) => {
    console.log('server.js /history GET');
    console.log(history);

    res.send(history);
})
// GET END

// ------------------------------------------

// POST BEGIN
// receive expression to be calculated
app.post('/calculate', (req, res) => {
    console.log('server.js /calculate POST', req.body);
    history.push(req.body);
    calcObj = req.body;

    calc();

    res.sendStatus(201);
})

// receive history to be recalculated
app.post('/history', (req, res) => {
    console.log('server.js /history POST');

    calcObj = history[req.body.index];

    res.sendStatus(200);
})
// POST END

// DELETE BEGIN
// receive command to delete history
app.delete('/history', (req, res) => {
    console.log('server.js /history DELETE');

    history.length = 0;

    res.sendStatus(200);
})
// DELETE END

// ------------------------------------------

// FUNCTIONS
// does calculation for the calculator
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
} // END calc()