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

  console.log(todos);
  const display = document.querySelector(".display");
  display.innerHTML = '';

  todos.forEach(todo => {
    let todoElement = document.createElement("div");
    todoElement.classList.add("toDolist");
    let editInput  = document.createElement("input")
    if (todo.status === "editing") {
      editInput .value = todo.title;
      todoElement.appendChild(editInput );
    } else {

      let checkbox = document.createElement("INPUT");
      checkbox.setAttribute("type", "checkbox");
      checkbox.checked = todos.isChecked;
      todoElement.appendChild(checkbox);
      let select = document.createElement("select");
     select.value = todo.priority; 
      
      console.log(select.value)
      

      let option1 = document.createElement("option");
      option1.textContent = "low"
      option1.value = "low"
     
      select.appendChild(option1)

      let option2 = document.createElement("option");
      option2.textContent = "medium"
      option2.value = "medium"
      select.appendChild(option2)
      let option3 = document.createElement("option");
      option3.textContent = "high"
      option3.value = "high"


      select.appendChild(option3)
      todoElement.appendChild(select);

      let newText = document.createElement("p");
      newText.textContent = todo.title
      newText.classList.add("toDoListP");
      todoElement.appendChild(newText);
      if (todo.status === "done") {
        newText.style.color = "blue";
      }
      const todoId = todo.id;

      checkbox.addEventListener('change', function (e) {
        let isChecked = e.target.checked;
        todo.isChecked = isChecked;
        localStorage.setItem('todos', JSON.stringify(todos));
      });

      select.addEventListener("change", function (event) {

        let priority = event.target.value;
        console.log(priority, todo.id);

        todos.forEach(todo => {
          if (todo.id == todoId) {
            todo.priority = priority;
            
          }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        render(todos);
      })
    }

    if (todo.priority == "low") {
      todoElement.style.backgroundColor = "green";
    }
    if (todo.priority == "medium") {
      todoElement.style.backgroundColor = "yellow";
    }
    if (todo.priority == "high") {
      todoElement.style.backgroundColor = "red";
    }
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    todoElement.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => deleteToDo(todo.id));

    let doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    todoElement.appendChild(doneButton);
    doneButton.addEventListener("click", function () {
      markAsDone(todo.id);
    });

    if (todo.status == "editing") {

      let saveButton = document.createElement("button")
      saveButton.textContent = "Save";

      todoElement.appendChild(saveButton);
      saveButton.addEventListener("click", function () {
        saveTodo(todo.id, editInput .value);
      });

    } else {

      let editButton = document.createElement("button");
      editButton.textContent = "Edit";
      todoElement.appendChild(editButton);
      editButton.addEventListener("click", function () {
        editToDo(todo.id);
      });
      let inProgressButton = document.createElement("button");
      inProgressButton.textContent = "inProgress";
      todoElement.appendChild(inProgressButton);

      inProgressButton.addEventListener("click", function () {
        filterinprogres(todo.id);
      });
    }
    display.appendChild(todoElement);
  })
}
function filterbystatus(status) {
  let newtodosByStatus = todos.filter(todo => todo.status == status);
  render(newtodosByStatus)
}
function filterAllToDo() {
  render(todos);
}

function markAsDone(id) {
  todos.forEach(todo => {
    if (todo.id == id) {
      todo.status = "done"
    }
  });
  localStorage.setItem('todos', JSON.stringify(todos));
  render(todos);
}
function sumbitToDo() {
  let input = document.querySelector(".main-input ");
  if (input.value == "") {
    return;
  }
  let newTodo = { title: input.value, id: getID(), status: 'pending', priority: "low", isChecked: false };
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  render(todos);
}

function editToDo(id) {
  todos.forEach(todo => {
    if (todo.id === id) {
      todo.status = "editing";
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  render(todos);
}
function filterinprogres(id) {
  todos.forEach(todo => {
    if (todo.id == id) {
      todo.status = "inprogress"
    }
  })
  render(todos);
}

function sortTodos() {
  todos.sort((a, b) => a.title.localeCompare(b.title))
  render(todos)

}


function saveTodo(id, title) {
  todos.forEach(todo => {
    if (todo.id == id) {
      todo.status = "pending"
      todo.title = title
    }
  })
  localStorage.setItem('todos', JSON.stringify(todos));
  render(todos);
}

function filterbyInProgress() {
  let newtodosByProgress = todos.filter(todo => todo.status === "inprogress")
  render(newtodosByProgress)
}
function checkTodo() {
  todos = todos.filter(todo => !todo.isChecked);
  localStorage.setItem('todos', JSON.stringify(todos));
  render(todos);
}

function checkTodo() {
  todos = todos.filter(todo => !todo.isChecked);

  localStorage.setItem('todos', JSON.stringify(todos));
  render(todos);
}



function deleteToDo(id) {
  todos.forEach(todo => {
    if (todo.id == id) {
      todo.isArchived = true;
    }
  });

  todos = todos.filter(todo => todo.id != id);
  localStorage.setItem('todos', JSON.stringify(todos));
  render(todos);
}





let deleteButtons = document.querySelector(".delete-all")
deleteButtons.addEventListener("click", checkTodo)
let filterbyInProgresshtml = document.querySelector(".filterbyinProgress");
filterbyInProgresshtml.addEventListener("click", filterbyInProgress)

let resetFilter = document.querySelector(".Allfilters")
resetFilter.addEventListener("click", filterAllToDo)

let Sortbutton = document.querySelector(".sortButton");
Sortbutton.addEventListener("click", sortTodos)

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
