function generateId() {
  let id = 0;
  return function () {
    return id++;
  };
}

function getTodos() {
  const todos = localStorage.getItem('todos');
  return JSON.parse(todos) || [];
}

const getID = generateId();
let todos = getTodos();

function render(todos) {

  console.log(todos)
  let display = document.querySelector(".display");
  display.innerHTML = '';

  for (let i = 0; i < todos.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("to-do-list");
    let newinput = document.createElement("input")
    if (todos[i].status == "editing") {


      newinput.value = todos[i].title;
      newDiv.appendChild(newinput);
    } else {
      let newText = document.createElement("p");
      newText.textContent = todos[i].title;
      newText.classList.add("toDoListP");
      newDiv.appendChild(newText);
      if (todos[i].status == "done") {
        newText.style.color = "green";
      }
    }


    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    newDiv.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => deleteToDo(todos[i].id));

    let doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    newDiv.appendChild(doneButton);
    doneButton.addEventListener("click", () => markAsDone(todos[i].id));

    if (todos[i].status == "editing") {

      let saveButton = document.createElement("button")
      saveButton.textContent = "Save";

      newDiv.appendChild(saveButton);
      saveButton.addEventListener("click", function () {
        saveToDo(todos[i].id, newinput.value);
      });
    } else {

      let editButton = document.createElement("button");
      editButton.textContent = "Edit";
      newDiv.appendChild(editButton);

      editButton.addEventListener("click", function () {
        editToDo(todos[i].id)
      })

      let inProgressButton = document.createElement("button");
      inProgressButton.textContent = "inProgress";
      newDiv.appendChild(inProgressButton);
      
      inProgressButton.addEventListener("click", function () {
        filterinprogres(todos[i].id);
      });

    }
    display.appendChild(newDiv);
  }
}

function filterbystatus(status) {
  let newtodosByPending = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].status == status) {
      newtodosByPending.push(todos[i]);
    }
  }
  render(newtodosByPending);
  ender(newtodosByProgress);
}
function filterAllToDo() {
  render(todos);
}

function deleteToDo(id) {
  todos = todos.filter(todo => todo.id != id);
  render(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
  console.log(id);
}

function markAsDone(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos[i].status = "done";
    }
  }
  localStorage.setItem('todos', JSON.stringify(todos));
  render(todos);
}

function sumbitToDo() {
  let input = document.querySelector(".a");
  if (input.value == "") {
    return;
  }
  let newTodo = { title: input.value, id: getID(), status: 'pending' };
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  render(todos);
}

function editToDo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos[i].status = "editing";
    }
  }
  localStorage.setItem('todos', JSON.stringify(todos));
  render(todos);
}

function filterinprogres(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos[i].status = "inprogress";
    }
  }

  render(todos);
}

function sortToDo() {
  todos.sort((a, b) => a.title.localeCompare(b.title))
  render(todos)

}

function saveToDo(id, title) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos[i].status = "pending";
      todos[i].title = title
    }
  }
  localStorage.setItem('todos', JSON.stringify(todos));
  render(todos);
}

function filterbyInProgress() {
  let newtodosByProgress = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].status == "inprogress") {
      newtodosByProgress.push(todos[i]);
    }
  }
  render(newtodosByProgress);
}
let filterbyInProgresshtml = document.querySelector(".filterbyinProgress");
filterbyInProgresshtml.addEventListener("click", filterbyInProgress)

let resetFilter = document.querySelector(".Allfilters")
resetFilter.addEventListener("click", filterAllToDo)

let Sortbutton = document.querySelector(".sortButton");
Sortbutton.addEventListener("click", sortToDo)

let submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", sumbitToDo);

let filterPendingToDo = document.querySelector(".filterByPending");
filterPendingToDo.addEventListener("click", function () {
  filterbystatus("pending")

});

let filterToDo = document.querySelector(".filterToDo");
filterToDo.addEventListener("click", function () {
  filterbystatus("done")

});
render(todos);
