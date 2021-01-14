"use strict";

let taskInput  = document.getElementById("todo-entry");
let taskSubmit = document.getElementById("todo-submit");

let taskList = document.getElementById("todos");
let taskListCompleted = document.getElementById("todos-completed");

let taskAdd=function() {
    let newTask = taskInput.value;
    if(!newTask) return false;

    let listItem=taskCreate(newTask);
    taskList.appendChild(listItem);
    bindTaskEvents(listItem, taskMarkCompleted);

    taskInput.value="";
    return false; // Prevent Form Submit
}
let taskCreate = function(taskString) {

    let listItem=document.createElement("li");

    let checkBox=document.createElement("input");
    checkBox.type="checkbox";
    checkBox.className="task-checkbox";
    listItem.appendChild(checkBox);

    let label=document.createElement("label");
    label.innerText=taskString;
    label.className="task-label";
    listItem.appendChild(label);

    let editInput=document.createElement("input");
    editInput.type="text";
    editInput.className="task-textbox";
    listItem.appendChild(editInput);

    let editButton=document.createElement("button");
    editButton.innerText="Edit";
    editButton.className="task-edit";
    listItem.appendChild(editButton);

    let deleteButton=document.createElement("button");
    deleteButton.innerText="Delete";
    deleteButton.className="task-delete";
    listItem.appendChild(deleteButton);

    return listItem;
}



//Edit an existing task.

let taskEdit=function() {
    let listItem=this.parentNode;

    let editButton=listItem.querySelector('button');
    editButton.innerText=(editButton.innerText==='Edit')?"Update":"Edit";

    let editInput=listItem.querySelector('input[type=text]');

    let label=listItem.querySelector("label");

    listItem.classList.contains("editable")?
        label.innerText=editInput.value:
        editInput.value=label.innerText;

    listItem.classList.toggle("editable");
}

//Delete task.
let taskDelete=function(){
    console.log("Delete Task...");
    let confirmation = confirm("Delete task?");
    if(confirmation){
        let listItem=this.parentNode;
        let ul=listItem.parentNode;
        ul.removeChild(listItem);
    }
}


//Mark a task as done
let taskMarkCompleted=function(){
    let listItem=this.parentNode;
    taskListCompleted.appendChild(listItem);
    bindTaskEvents(listItem, taskMarkIncomplete);
}

//Undo `mark as done`
let taskMarkIncomplete=function(){
    let listItem=this.parentNode;
    taskList.appendChild(listItem);
    bindTaskEvents(listItem,taskMarkCompleted);
}

//Set the click handler to the taskAdd function.
taskSubmit.onclick=taskAdd;
taskSubmit.addEventListener("click", function() {
    // Additional code to be executed
});


let bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    let checkBox=taskListItem.querySelector("input[type=checkbox]");
    let editButton=taskListItem.querySelector("button.task-edit");
    let deleteButton=taskListItem.querySelector("button.task-delete");
    editButton.onclick=taskEdit;
    deleteButton.onclick=taskDelete;
    checkBox.onchange=checkBoxEventHandler;
}

for(let i=0; i<taskList.children.length;i++) {
    bindTaskEvents(taskList.children[i],taskMarkCompleted);
}
for(let i=0; i<taskListCompleted.children.length;i++) {
    bindTaskEvents(taskListCompleted.children[i],taskMarkIncomplete);
}


// HELPER FUNCTIONS
// Generate an 8 digit random number for UID
function generateUID() {
    return String(~~(Math.random()*Math.pow(10,8)))
}
