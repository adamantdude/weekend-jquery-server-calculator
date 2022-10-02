
$(main);

const re = /^(\b0\.0*)*?[1-9]\d*(\.\d+)?[\+\*\/\-](\b0\.0*)*?[1-9]\d*(\.\d+)?$/g;

const calcObj = {
    val1: 0,
    val2: 0,
    operator: '+',
    sum: 0
}

const allowedSet = [46, 48, 57];

const opEnum = {
    '+':0,'-':1,'*':2,'/':3,'%':4,'=':5
}

function main() {

    $(document).on('click', 'button', whichButton);

    // $('input').on('keypress', typeSet);

}

function whichButton() {

    calcObj.val1 = $('#value1').val();
    calcObj.val2 = $('#value2').val();

    calcObj.operator = $(this).attr('id');

    (calcObj.operator == '=' && (calcObj.val1 && calcObj.val2)) ? sendVals() : update();

}

function update() {

    if(operator != '=') {
        $('#operator').text(calcObj.operator);
    }
    
    $('#sum').text(calcObj.sum);
}

function sendVals() {
    
    $.ajax({
        url: '/calculate',
        method: 'POST',
        data: calcObj
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
        calcObj.sum = res;
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