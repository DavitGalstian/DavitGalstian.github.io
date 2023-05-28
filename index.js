function removebutton(e){ 

e.target.parentNode.remove() 
} 

function done(e){ 

let newtext=e.target.parentNode.querySelector("p") 
newtext.style.color="green" 

} 
function  editbtn(e){

let paragraph=e.target.parentNode.querySelector("p");
  let newinput=document.createElement("input")
  console.log(paragraph);
  newinput.value=paragraph.textContent;
  paragraph.remove();
  e.target.parentNode.appendChild(newinput); 

}

function savebtn(e){
let input = e.target.parentNode.querySelector("input");
let newparagraph = document.createElement("p");     
newparagraph.textContent = input.value;
      e.target.parentNode.appendChild(newparagraph); 
input.remove();
}
function submitForm() {  
let input = document.querySelector(".a");  
if (!input.value) {
  return;
}
let display = document.querySelector(".display");  
let newtext = document.createElement("p"); 
let newdiv=document.createElement("div") ;
newdiv.classList.add("box_P_div")
newtext.classList.add("box_P")

let deletebutton=document.createElement("button")  
    deletebutton.textContent = "Delete"; 
    deletebutton.classList.add("box_buttons");
newtext.textContent=input.value;  
input.value=""; 
let greenbutton=document.createElement("button") 
greenbutton.textContent = "Mark as done"; 
greenbutton.classList.add("box_buttons")
let editbutton=document.createElement("button")
editbutton.textContent="Edit";
editbutton.classList.add("box_buttons")

 let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("box_buttons")
    newdiv.appendChild(newtext); 
    newdiv.appendChild(deletebutton); 
 newdiv.appendChild(greenbutton); 
newdiv.appendChild(editbutton)
newdiv.appendChild(saveButton)
display.appendChild(newdiv); 
 deletebutton.addEventListener("click", removebutton); 
greenbutton.addEventListener("click", done); 
editbutton.addEventListener("click", editbtn); 
saveButton.addEventListener("click", savebtn);
}  

function numbitbtnfn() {  
let submitButton = document.querySelector(".submit");  
submitButton.addEventListener("click", submitForm);  

}  

numbitbtnfn()                      