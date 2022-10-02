
$(main);

const re = /^(\b0\.0*)*?[1-9]\d*(\.\d+)?[\+\*\/\-](\b0\.0*)*?[1-9]\d*(\.\d+)?$/g;

const calcObj = {
    val1: 0,
    val2: 0,
    operator: '+',
    sum: 0,
}

let history = [];

console.log(history.length);

const allowedSet = [46, 48, 57];

function main() {

    $(document).on('click', 'button', whichButton);

    $(document).on('click', '.historyItem', historyRemove);

    // $('input').on('keypress', typeSet);

    historyLoad();

} // END main()

function whichButton() {

    calcObj.val1 = $('#value1').val();
    calcObj.val2 = $('#value2').val();

    if($(this).attr('id') != '=') {
        calcObj.operator = $(this).attr('id');
    }

    ($(this).attr('id') == '=' && (calcObj.val1 && calcObj.val2)) ? sendVals() : render();

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

function historyRemove() {

    $.ajax({
        url: '/history',
        method: 'POST',
        data: {
            index: $(this).attr('id')
        }
    })
        .then((res) => {
            console.log('in /history POST', res);
            historyLoad();
        })
        .catch((err) => {
            console.log('in /history POST error', err);
        })
} // END historyRemove()

// function typeSet(evt) {
//     console.log('Typed something', $(this));
//     console.log('What keyboard', evt.which);
// }