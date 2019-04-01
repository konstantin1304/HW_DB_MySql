const tableBody = document.querySelector('#tableBody');

const id = document.querySelector('#id');
const login = document.querySelector('#login');
const passw = document.querySelector('#pass');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const age = document.querySelector('#age');

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

function createDbElement() {
    let data = {};
    data.login = login.value;
    data.password = passw.value;
    data.firstName = firstName.value;
    data.lastName = lastName.value;
    data.age = age.value;
    let xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:3000/create');
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
}


let tempDataArr = [];

//  MODEL

function delEntry(indArr) {
    dataArr.splice(indArr, 1);
}


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


function checkIdInArr(id) {
    for (var i = 0; i < dataArr.length; i++) {
        if (dataArr[i].id == id) {
            return i;
        }
    }
    return false;
}


function createEntryToPlase() {
    let person = {};
    
    if (checkID()) {
        return;
    }
    person.id = id.value;
    person.login = login.value;
    person.passw = passw.value;
    person.age = age.value;
    renderMsg();
    return person;
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

function clearInput() {
    id.value = '';
    login.value = '';
    passw.value = '';
    age.value = '';
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

//ADD TO START
function addStartBtnEvent() {
    let pers = createEntryToPlase();
    if (pers) {
        dataArr.unshift(pers);
    }
    renderTable();
}

//SAVE
function saveToLS() {
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:3000/save');
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
    renderMsg(`Data was saved to DataBase.`);
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
    
    dataArr = [];
    renderMsg(`LocalStorage and table was cleared.`);
    renderTable();
}

//DELETE
function deleteEntry() {
    
    let check = true;
    
    dataArr.forEach((entry, index) => {
        if (entry.id === id.value) {
            renderMsg(`User ID ${id.value} was deleted.`);
            for (let i = index; i < dataArr.length; i++) {
                dataArr[i] = dataArr[i + 1];
            }
            dataArr.length = dataArr.length - 1;
            check = false;
        }
    });
    
    if (check) {
        renderMsg(`The given ID ${id.value} was not found`);
    }
    
    renderTable();
}


readBtn.addEventListener('click', readBtnEvent);
addStartBtn.addEventListener('click', createDbElement);
saveBtn.addEventListener('click', saveToLS);
updateBtn.addEventListener('click', update);
clearBtn.addEventListener('click', clearAll);
deleteBtn.addEventListener('click', deleteEntry);

