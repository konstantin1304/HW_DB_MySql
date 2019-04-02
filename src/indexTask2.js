const tableBody = document.querySelector('#tableBody');

const id = document.querySelector('#id');
const login = document.querySelector('#login');
const passw = document.querySelector('#pass');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const age = document.querySelector('#age');
//const userId = document.querySelector('#id');

const readBtn = document.querySelector('#readBtn');
const addStartBtn = document.querySelector('#addStartBtn');
const saveBtn = document.querySelector('#saveBtn');
const updateBtn = document.querySelector('#updateBtn');
const clearBtn = document.querySelector('#clearBtn');
const deleteBtn = document.querySelector('#deleteBtn');

let dataArr = [];

window.onload = function(){
   onLoad();
};
//Load from DB
function onLoad() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/onload', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr.responseText);
                dataArr = JSON.parse(xhr.responseText);
                console.log(dataArr);
                renderTable();
            }
        }
    };
    xhr.send();
}
//Create element in DB
function createDbElement() {
    let data = {};
    data.login = login.value;
    data.password = passw.value;
    data.firstName = firstName.value;
    data.lastName = lastName.value;
    data.age = age.value;
    if(id.value != "") {
        renderMsg(`Please, enter values without field "ID", it will be added automatically`);
        return;
    }
    if(login.value === "" || passw.value === "" || firstName.value === "" || lastName.value === "" || age.value === ""){
        renderMsg(`Please, fill all fields values without "ID", it will be added automatically`);
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:3000/createElement',true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                renderMsg(xhr.responseText);
            }
        }
    };
    xhr.onerror = ()=> console.log('server error');
    xhr.send(JSON.stringify(data));
    //console.log(data);
    onLoad();
}

function updateDbElement() {
    let data = {};
    data.id = id.value;
    data.login = login.value;
    data.password = passw.value;
    data.firstName = firstName.value;
    data.lastName = lastName.value;
    data.age = age.value;
    let xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:3000/update',true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.onerror = ()=> console.log('server error');
    xhr.send(JSON.stringify(data));
    console.log(data);
}

function deleteDbElement() {
    let data = {};
    data.id = id.value;
    if(id.value === "") {
        renderMsg(`Please, enter values into field "ID"`);
        return;
    }
    if(login.value !== "" || passw.value !== "" || firstName.value !== "" || lastName.value !== "" || age.value !== ""){
        renderMsg(`Please, fill only field "ID"`);
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:3000/delete',true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.onerror = ()=> console.log('server error');
    xhr.send(JSON.stringify(data));
    console.log(data);
}



//  MODEL

function delEntry(indArr) {
    dataArr.splice(indArr, 1);
}

/*
function checkID() {
    
    let check = false;
    
    if (isNaN(id.value) || !id.value.trim() || parseInt(id.value) !== +id.value) {
        renderMsg(`ID must to be an integer number`);
        return true;
    }
    
    dataArr.forEach((entry) => {
        if (entry.id === id.value) {
            renderMsg(`ID ${id.value} already used. Please enter an unique ID.`);
            check = true;
        }
    });
    return check;
}
*/

function checkIdInArr(id) {
    for (var i = 0; i < dataArr.length; i++) {
        if (dataArr[i].id == id) {
            return i;
        }
    }
    return false;
}

// VIEW

function renderTable() {
    var insertData = '';
    
    for (var i = 0; i < dataArr.length; i++) {
        insertData += '<div class="row">\n<div class="col-2">'.concat(dataArr[i].userId, '</div>\n<div class="col-4">').concat(dataArr[i].login, '</div>\n<div class="col-4">').concat(dataArr[i].password, '</div>\n<div class="col-4">').concat(dataArr[i].FirstName, '</div>\n<div class="col-4">').concat(dataArr[i].LastName, '</div>\n<div class="col-4">').concat(dataArr[i].AGE, '</div>\n<div class="col-2">').concat(dataArr[i].userDataId, '</div>\n</div>');
    }
    
    tableBody.innerHTML = insertData;
    return true;
}



function renderMsg(msg) {
    
    if (msg) {
        msgBox.innerText = msg;
    } else {
        msgBox.innerText = '';
    }
}


// CONTROLLER

//READ
function readBtnEvent() {
    tableBody.innerHTML = '';
    dataArr.length = 0;

    let xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:3000/load');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(dataArr));
    xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            console.log(xhr.responseText);
        }
    }
};
    xhr.onerror = ()=> console.log('server error');
    renderTable();
}



//SAVE
function saveToLS() {
    onLoad();
    localStorage.setItem('myKey', JSON.stringify(dataArr));
    renderTable();
    renderMsg(`Data was saved to LocalStorage.`);
}

//UPDATE
function update() {
    
    const indArr = checkIdInArr(id.value);
    const user = dataArr[indArr];
    (login.value === '') ? dataArr[indArr].login = user.login : dataArr[indArr].login = login.value;
    (passw.value === '') ? dataArr[indArr].passw = user.passw : dataArr[indArr].passw = passw.value;
    (age.value === '') ? dataArr[indArr].age = user.age : dataArr[indArr].age = age.value;
    renderTable();
}

//CLEAR
function clearAll() {
    localStorage.clear();
    renderMsg(`LocalStorage and table was cleared.`);
}

addStartBtn.addEventListener('click', createDbElement);
updateBtn.addEventListener('click', updateDbElement);
deleteBtn.addEventListener('click', deleteDbElement);

saveBtn.addEventListener('click', saveToLS);
clearBtn.addEventListener('click', clearAll);


