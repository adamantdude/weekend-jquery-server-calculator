
$(main);

const re = /^(\b0\.0*)*?[1-9]\d*(\.\d+)?[\+\*\/\-](\b0\.0*)*?[1-9]\d*(\.\d+)?$/g;

let operator = '+';

let sum = {
    sum: 0
};

const allowedSet = [46, 48, 57];

const opEnum = {
    '+':0,'-':1,'*':2,'/':3,'%':4,'=':5
}

function main() {

    $(document).on('click', 'button', whichButton);

    // $('input').on('keypress', typeSet);

}

function whichButton() {

    let val1 = $('#value1').val(), val2 = $('#value2').val()

    operator = $(this).attr('id');

    (operator == '=' && (val1 && val2)) ? sendVals(val1, val2) : update();

}

function update() {
    $('#operator').text(operator);

    
    $('#sum').text(sum.sum);
}

function sendVals(val1, val2) {

    let values = {
        val1: val1,
        val2: val2
    }
    
    $.ajax({
        url: '/calculate',
        method: 'POST',
        data: values
    })
        .then((res) => {
            console.log('client.js /calculate POST', res);
            receiveResult();
        })
        .catch((err) => {
            console.log('client.js /calculate POST error', err);
        })

}

function receiveResult() {

$.ajax({
    url: '/calculate',
    method: 'GET'
})
    .then((res) => {
        console.log('client.js /calculate GET', res);
        sum = res;
        update();
    })
    .catch((err) => {
        console.log('client.js /calculate GET error', err);
    })

}

// function typeSet(evt) {
//     console.log('Typed something', $(this));
//     console.log('What keyboard', evt.which);
// }