
$(main);

// regexp saved for stretch goal
const re = /^(\b0\.0*)*?[1-9]\d*(\.\d+)?[\+\*\/\-](\b0\.0*)*?[1-9]\d*(\.\d+)?$/g;

// object to trade between client-server
let calcObj = {
    val1: 0,
    val2: 0,
    operator: '+',
    sum: 0,
}

// client side history
let history = [];

function main() {

    $(document).on('click', '.ops', whichButton);

    $(document).on('click', '.historyItem', historyRecalc);

    $('#delHistory').on('click', historyRemove);

    // $('input').on('keypress', typeSet);

    historyLoad();

} // END main()

function whichButton() {

    calcObj.val1 = $('#value1').val();
    calcObj.val2 = $('#value2').val();

    if($(this).attr('id').match(/[^=C]/) ) {
        calcObj.operator = $(this).attr('id');
    }

    if($(this).attr('id').match(/C/)) {
        $('input').val('');
        $('#sum').text('0');
    }

    if($(this).attr('id').match(/=/) && !(calcObj.val1 && calcObj.val2)) {
        alert('Requirement - Fill in both text boxes');
    }

    ($(this).attr('id').match(/=/) && (calcObj.val1 && calcObj.val2)) ? sendVals() : render();

} // END whichButton()

function render() {

    if(calcObj.operator != '=') {
        $('#operator').text(calcObj.operator);
    }
    
    $('#sum').text(calcObj.sum);

} // END render()

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

} // END sendVals()

function receiveResult() {

    $.ajax({
        url: '/calculate',
        method: 'GET'
    })
        .then((res) => {
            console.log('client.js /calculate GET', res);
            calcObj.sum = res.sum;
            historyLoad();
        })
        .catch((err) => {
            console.log('client.js /calculate GET error', err);
        })

    console.log('the sum is', calcObj.sum);

} // END receiveResult()

function historyLoad() {

    $.ajax({
        url: '/history',
        method: 'GET'
    })
        .then((res) => {
            console.log('in /history GET', res);

            history = res;

            $('#history').empty();
            for(let i=0; i<history.length; ++i) {
                $('#history').append(`
                    <p class="historyItem" id="${i}">${history[i].val1} ${history[i].operator} ${history[i].val2} = ${history[i].sum}</p><hr>
                `)
            }

            render();
        })
} // END historyLoad()

function historyRecalc() {
    calcObj = history[$(this).attr('id')]
    
    $('#value1').val(calcObj.val1);
    $('#value2').val(calcObj.val2);
    $('#operator').text(calcObj.operator);

    // tap into old history and send it back.
    sendVals();
    
} // END historyRecalc()

function historyRemove() {

    $.ajax({
        url: '/history',
        method: 'DELETE'
    })
        .then((res) => {
            console.log('in /history DELETE', res);
            historyLoad();
        })
        .catch((err) => {
            console.log('in /history DELETE error');
        })
} // END historyRemove()

// function typeSet(evt) {
//     console.log('Typed something', $(this));
//     console.log('What keyboard', evt.which);
// }