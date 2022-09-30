
$(main);

const opEnum = {
    '+':0,'-':1,'*':2,'/':3,'%':4,'=':5
}

function main() {

    $(document).on('click', 'button', whichButton);

}

function whichButton() {
    

    switch(opEnum[$(this).attr('id')]) {

    }
}