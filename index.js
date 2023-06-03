function generateId() {
  let id = 0;
  return function () {
    return id++;
  };
}
let getid = generateId();
let toDo = [
  { title: 'sad', id: getid(), status: 'pending' },
  { title: 'gwv', id: getid(), status: 'done' },
  { title: 'daa', id: getid(), status: 'pending' },
  { title: 'gaa', id: getid(), status: 'done' }
];


function render(toDo) {

  let display = document.querySelector(".display");
  display.innerHTML = '';
  for (let i = 0; i < toDo.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("toDoListDiv");

    let newText = document.createElement("p");
    newText.textContent = toDo[i].title;
    newText.classList.add("toDoListP");
    newDiv.appendChild(newText);
    if (toDo[i].status == "done") {
      newText.style.color = "green"
    }
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    newDiv.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => deleteToDo(toDo[i].id))
    let doneButton = document.createElement("button");


    doneButton.textContent = "Done";
    newDiv.appendChild(doneButton);
    doneButton.addEventListener("click", () => markAsDone(toDo[i].id))
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    newDiv.appendChild(editButton);

    display.appendChild(newDiv);
  }
}


function doneToDo() {
  let newToDoByDone = [];
  for (let i = 0; i < toDo.length; i++) {
    if (toDo[i].status == "done") {
      newToDoByDone.push(toDo[i]);
    }
  }
  render(newToDoByDone);

}

function pendingToDo() {
  let newToDoByPending = [];
  for (let i = 0; i < toDo.length; i++) {
    if (toDo[i].status == "pending") {
      newToDoByPending.push(toDo[i]);
    }
  }
  render(newToDoByPending);
}

function filterAllToDo() {
  render(toDo);
}

function deleteToDo(id) {
  toDo = toDo.filter(todo => todo.id != id);
  render(toDo)
  console.log(id)
}

function markAsDone(id) {
  for (let i = 0; i < toDo.length; i++) {
    if (toDo[i].id == id)
      toDo[i].status = "done"

  }
  render(toDo)
}
function sumbitToDo() {
  let input = document.querySelector(".a")
  if (input.value == "") {
    return;
  }
  let newToDo = { title: 'sad', id: getid(), status: 'pending' }

  toDo.push(newToDo)


  newToDo.title = input.value
  render(toDo)

}
let filtersumbit = document.querySelector(".submit");
console.log(filtersumbit)
filtersumbit.addEventListener("click", sumbitToDo);
let filterPendingToDo = document.querySelector(".filterByPending");
filterPendingToDo.addEventListener("click", pendingToDo);

let filterToDo = document.querySelector(".filterToDo");
filterToDo.addEventListener("click", doneToDo);



render(toDo);