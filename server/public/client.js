
$(main);

const re = /^(\b0\.0*)*?[1-9]\d*(\.\d+)?[\+\*\/\-](\b0\.0*)*?[1-9]\d*(\.\d+)?$/g;

let expression = {
    val1: 0,
    val2: 0,
    operator: '+'
}

const allowedSet = [46, 48, 57];

const opEnum = {
    '+':0,'-':1,'*':2,'/':3,'%':4,'=':5
}

function main() {

    $(document).on('click', 'button', whichButton);

    $('input').on('keypress', typeSet);

}

function whichButton() {

    expression.operator = $(this).attr('id');

    update();

}

function update() {
    $('#operator').text(expression.operator);
}

function typeSet(evt) {
    console.log('Typed something', $(this));
    console.log('What keyboard', evt.which);

    if( !(evt.which >= allowedSet[1] && evt.which <= allowedSet[2]) ) {
        evt.which != allowedSet[0] ? evt.preventDefault() : console.log('Good input');
    }


}