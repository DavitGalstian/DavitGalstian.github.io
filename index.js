function generateId() {
  let id = 0;
  return function() {
    return id++;
  };
}

let getid = generateId();
let toDo = [{ title: 'sad', id: getid(), status: 'PENDING' }];
function render(toDo) {
  let display = document.querySelector(".display");

  for (let i = 0; i < toDo.length; i++) {
    let newDiv = document.createElement("div");

    let newText = document.createElement("p");
    newDiv.appendChild(newText);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    newDiv.appendChild(deleteButton);

    let doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    newDiv.appendChild(doneButton);

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    newDiv.appendChild(editButton);

    display.appendChild(newDiv);
  }
}


render(toDo);



 