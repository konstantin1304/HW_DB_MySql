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
    //xhr.onerror = ()=> alert('server error');
    //xhr.onreadystatechange=(e)=>{console.log(e)};
    xhr.send(JSON.stringify(userDataLogin));
   console.log("gjhkhhjkhg");

});
