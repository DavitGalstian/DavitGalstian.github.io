function removebuttonfn(e) {
  e.target.parentNode.remove();
}

function changeTextColor(e) {
  let newText = e.target.parentNode.querySelector("p");
  newText.style.color = "green";
  newText.classList.add("newText");
}

function editbtn(e) {
  let paragraph = e.target.parentNode.querySelector("p");
  let newinput = document.createElement("input");
  console.log(paragraph);
  newinput.value = paragraph.textContent;
  paragraph.remove();
  e.target.parentNode.appendChild(newinput);
  let saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.classList.add("toDoListbuttons");
  e.target.parentNode.appendChild(saveButton);
  saveButton.addEventListener("click", savebutton);
}

function savebutton(e) {
  let input = e.target.parentNode.querySelector("input");
  let newparagraph = document.createElement("p");
  newparagraph.textContent = input.value;
  e.target.parentNode.appendChild(newparagraph);
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
  deletebutton.addEventListener("click", removebuttonfn);
  greenbutton.addEventListener("click", changeTextColor);
  editbutton.addEventListener("click", editbtn);

}

function submitButtonfn() {
  let submitButton = document.querySelector(".submit");
  submitButton.addEventListener("click", submitForm);
}

submitButtonfn();
