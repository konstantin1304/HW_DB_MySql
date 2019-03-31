const userName = document.getElementById("userName");
const mail = document.getElementById("mail");
const login = document.getElementById("login");
const pass = document.getElementById("passw");
const confpass = document.getElementById("confPass");
const btnSubmit = document.getElementById("submitRegistr");

btnSubmit.addEventListener('click', () => {
    let userData = {
        userName: userName.value,
        email: mail.value,
        login:login.value,
        password: pass.value,
        confirmpass: confpass.value
    };
    if (userData.password != userData.confirmpass){
        alert("FUCK YOU!!!");
    }
    let xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost:3000/registr');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", function () {
        let a = xhr.response;
        console.log(a);
    });
    xhr.onerror = ()=> alert('server error');
    xhr.send(JSON.stringify(userData));
});

console.log("gjhkhhjkhg");



