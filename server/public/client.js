
$(main);

const expression = {
    val1: 0,
    val2: 0,
    operator: '+'
}

const opEnum = {
    '+':0,'-':1,'*':2,'/':3,'%':4,'=':5
}

function main() {

    $(document).on('click', 'button', whichButton);

}

function whichButton() {

    expression.operator = $(this).attr('id');

    update();

}

function update() {
    $('#operator').text(expression.operator);
}

// function 