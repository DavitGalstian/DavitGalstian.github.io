function removeToDo(e) {
  e.target.parentNode.remove();
}

function changeTextColor(e) {
  let newText = e.target.parentNode.querySelector("p");
  let parent = e.target.parentNode;
  newText.style.color = "green";
  newText.classList.add("newText");
  parent.classList.add("doneToDo");
  iftrue = true;
}
function editToDo(e) {
  let paragraph = e.target.parentNode.querySelector("p");
  let newinput = document.createElement("input");
  console.log(paragraph);
  newinput.value = paragraph.textContent;
  paragraph.remove();

  e.target.parentNode.appendChild(newinput);
  let saveTodo = document.createElement("button");
  saveTodo.textContent = "Save";
  saveTodo.classList.add("toDoListbuttons");
  e.target.parentNode.appendChild(saveTodo);
  saveTodo.addEventListener("click", saveToDo);
}

function saveToDo(e) {
  let input = e.target.parentNode.querySelector("input");
  let updatedParagraph = document.createElement("p");
  updatedParagraph.classList.add("saveParagraph");
  updatedParagraph.textContent = input.value;
  e.target.parentNode.appendChild(updatedParagraph);
  if(iftrue==true){
    updatedParagraph.style.color="green"
  }
  input.remove();
  e.target.remove();

}


function submitForm() {
  let input = document.querySelector(".a");
  if (!input.value) {
    return;
  }
  let display = document.querySelector(".display");

  let newtext = document.createElement("p");
  let newdiv = document.createElement("div");
  newdiv.classList.add("toDoListDiv");
  newtext.classList.add("toDoListP");
  let deletebutton = document.createElement("button");
  deletebutton.textContent = "Delete";
  deletebutton.classList.add("toDoListbuttons");
  newtext.textContent = input.value;
  input.value = "";
  let greenbutton = document.createElement("button");
  greenbutton.textContent = "Mark as done";
  greenbutton.classList.add("toDoListbuttons");
  let editbutton = document.createElement("button");
  editbutton.textContent = "Edit";
  editbutton.classList.add("toDoListbuttons");


  newdiv.appendChild(newtext);
  newdiv.appendChild(deletebutton);
  newdiv.appendChild(greenbutton);
  newdiv.appendChild(editbutton);


  display.appendChild(newdiv);
  deletebutton.addEventListener("click", removeToDo);
  greenbutton.addEventListener("click", changeTextColor);
  editbutton.addEventListener("click", editToDo);

}


function submitToDo() {
  let submitButton = document.querySelector(".submit");
  submitButton.addEventListener("click", submitForm);
}

function filterCompletedToDo() {

  let display = document.querySelector(".display");
  for (let i = 0; i < display.children.length; i++) {
    if (!display.children[i].classList.contains("doneToDo")) {
      display.children[i].style.display = "none"
    }
  }
}

function filterPendingOnlyToDo() {
  let display = document.querySelector(".display");
  for (let i = 0; i < display.children.length; i++) {
    if (display.children[i].classList.contains("doneToDo")) {
      display.children[i].style.display = "none"
    }else{
   
      display.children[i].style.display = "flex"
    
    }
  }

}
function resetFilter() {
  let display = document.querySelector(".display");
  for (let i = 0; i < display.children.length; i++) {
    display.children[i].style.display = "flex";
  }
}


let filterToDo = document.querySelector(".filterToDo");
filterToDo.addEventListener("click", filterCompletedToDo);
let filterByPending = document.querySelector(".filterByPending");
filterByPending.addEventListener("click", filterPendingOnlyToDo);


let allfilterss = document.querySelector(".Allfilters");
allfilterss.addEventListener("click", resetFilter);

submitToDo();
