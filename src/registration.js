//const userName = document.getElementById("userName");
const mail = document.getElementById("mail");
const login = document.getElementById("login");
const pass = document.getElementById("password");
const confpass = document.getElementById("confPass");
const btnSubmit = document.getElementById("submitRegister");

btnSubmit.addEventListener('click', () => {
    let userData = {
        //userName: userName.value,
        email: mail.value,
        login:login.value,
        password: pass.value,
        confirmpass: confpass.value
    };
    if (userData.password != userData.confirmpass){
        alert("Passwords do not match"); //todo переделать оповещение
    }
    let xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost:3000/registr');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText === "login exist"){
                    renderMsg("Login is already exist");
                }
                if (xhr.responseText === "email exist"){
                    renderMsg("Email is already exist");
                }
                if (xhr.responseText === "insertSuccess"){
                    window.location='registration.html';
                }
                console.log(xhr.responseText);
            }
        }
    };
    xhr.onerror = ()=> console.log('server error');
    xhr.send(JSON.stringify(userData));
});
function renderMsg(msg) {

    if (msg) {
        msgBox.innerText = msg;
    } else {
        msgBox.innerText = '';
    }
}




