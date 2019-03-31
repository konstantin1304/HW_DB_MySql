const authEmail = document.getElementById("authEmail");
const authPass = document.getElementById("authPass");
const btnSubmitLogin = document.getElementById("submitLogin");

btnSubmitLogin.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/login');
    let userDataLogin = {
        email: authEmail.value,
        password: authPass.value,
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", function () {
        let a = xhr.response;
        console.log(a);  // смотрим ответ сервера
    });
    xhr.onerror = ()=> alert('server error');
    xhr.send(JSON.stringify(userDataLogin));

});
/*let xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        let response;
        try {
            response = JSON.parse(xhr.responseText);
        } catch (e) {
            response = xhr.responseText;
        }
        if (xhr.status === 200) {
            callback(response);
        } else {
            typeof callbackFail === 'function' ? callbackFail(response, xhr.status) : void 0;
        }
    }
};
callback({error: false});
xhr.send(JSON.stringify(data));*/