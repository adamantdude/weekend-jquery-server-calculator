const express = require('express'), app = express(), bodyParser = require('body-parser');

app.use(express.static('./server/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
    console.log('Server is live!!');
})

const mathHistory = [];

const expression = {
    val1: 0,
    val2: 0,
    operator: '+'
}

// ------------------------------------------

// GET BEGIN

// GET END

// ------------------------------------------

// POST BEGIN

// POST END

// ------------------------------------------

