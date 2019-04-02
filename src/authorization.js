const authEmail = document.getElementById("authEmail");
const authPass = document.getElementById("authPass");
const btnSubmitLogin = document.getElementById("submitLogin");
const btnRegistration = document.getElementById("regLogin");
btnSubmitLogin.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:3000/login', true);
    let userDataLogin = {
        email: authEmail.value,
        password: authPass.value,
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

                if (xhr.responseText === "noMatches"){
                    renderMsg("Wrong password of login");
                }
                if (xhr.responseText === "isMatch") {
                    window.location='indexTable.html';
                }
            }
        }
    };
    xhr.send(JSON.stringify(userDataLogin));
});
btnRegistration.addEventListener('click', () => {
    window.location='registration.html';
});
function renderMsg(msg) {

    if (msg) {
        msgBox.innerText = msg;
    } else {
        msgBox.innerText = '';
    }
}