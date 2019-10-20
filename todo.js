const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function editToDo(event) {
    const btn = event.target;
    let li = btn.parentNode;
    let span = li.firstChild;
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.value = span.innerText;
    input.id = li.id;
    form.appendChild(input);
    li.replaceWith(form);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const thisForm = event.target;
        const thisInput = thisForm.firstChild;
        span.innerText = thisInput.value;
        form.replaceWith(li);
        const index = toDos.findIndex(function(element) {
            return element.id === Number(li.id);
        });
        toDos[index].text = span.innerText;
        saveToDos();
    });

    function isSame(element) {
        return element.id === Number(li.id);
    }

}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== Number(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

// JSON.stringify: object -> string
// localStorage는 Value를 string으로밖에 받지 못해서 바꿔줌
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    editBtn.innerText = "✏️";
    editBtn.addEventListener("click", editToDo);
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    let toDoObj = {
        text: text,
        id: newId,
        modifying: false
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

// JSON.parse(): string -> object
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();