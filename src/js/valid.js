// validation pour les inputs de register
var email = document.forms['form']['Username'];
var password = document.forms['form']['password'];

var email_error = document.getElementById('email_error');
var password_error = document.getElementById('password_error');

email.addEventListener('textInput', email_verify);
password.addEventListener('textInput', password_verify);

function validated(){
    if (email.value.length < 5){
        email.style.border = "1px solid red";
        email_error.style.display = "block";
        email.focus();
        return false;
    }

    if (password.value.length < 5){
        password.style.border = "1px solid red";
        password_error.style.display = "block";
        password.focus();
        return false;
    }
}

function email_verify(){
    if (email.value.length >= 4){
        email.style.border = "1px solid silver";
        email_error.style.display = "none";
        return true;
    }
}

function password_verify(){
    if (password.value.length >= 4){
        password.style.border = "1px solid silver";
        password_error.style.display = "none";
        return true;
    }
}

function enregisterUtilisateur() {
    var savedMemos = JSON.parse(localStorage.getItem('memos')) || [];
    var jsonData = JSON.stringify(savedMemos, null, 2);

    var blob = new Blob([jsonData], { type: 'application/json' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'memos.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}