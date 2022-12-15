// маска для телефону
const mask = ( selector ) => {

    let setCursorPosition = ( pos, elem ) => {
        elem.focus();

        if ( elem.setSelectionRange ) {
            elem.setSelectionRange(pos, pos);
        } else if ( elem.createTextRange ) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    function createMask( event ) {
        let matrix = '+38 (0__) ___-__-__',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');

        if ( def.length >= val.length ) {
            val = def;
        }

        this.value = matrix.replace(/./g, function ( a ) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if ( event.type === 'blur' ) {
            if ( this.value.length === 6 ) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};
mask("#cart-phone");


// якщо поле email пусте - генеруємо рандомну адресу

const submitOrder = document.querySelector("#submitOrder"),
    email = document.querySelector("#email");

submitOrder.addEventListener("click", () => {
    let time = new Date().getTime();
    if ( !email.value ) email.value = "auto" + time + "@gmail.com";
})


// перевірка введення телефону, імені та email

const em = document.querySelector("#email"),
    phone = document.querySelector("#cart-phone"),
    name = document.querySelector("#cart-name");
let currentP = phone.value,
    regName = /^[A-Za-zА-Яа-яёЁіІїЇєЄ ]+(?:[-'\s][A-Za-zА-Яа-яёЁіІїЇєЄ]+)*$/,
    regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

name.onblur = function () {
    if ( this.value === "" ) {
        this.style.borderColor = "#f84147"
    }
};

phone.onblur = function () {
    if ( this.value.length < 19 ) {
        this.style.borderColor = "#f84147"
    }
};

name.addEventListener("input", () => {

    if ( regName.test(name.value) && name.value.length > 1 ) {
        name.style.borderColor = "";
    } else {
        name.style.borderColor = "#f84147";
    }
})

em.addEventListener("input", () => {
    if ( regEmail.test(String(email.value).toLowerCase()) ) {
        em.style.borderColor = "";
    } else {
        em.style.borderColor = "#f84147";
    }
    if ( em.value === "" ) em.style.borderColor = "";
})

phone.addEventListener("input", () => {
    if ( phone.value.slice(0, 6) !== "+38 (0" ) {
        phone.value = currentP;
    } else if ( phone.value.length === 19 ) {
        phone.style.borderColor = "";
        currentP = phone.value;
    } else {
        phone.style.borderColor = "#f84147";
        currentP = phone.value;
    }
})
