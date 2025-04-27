const task=JSON.parse(localStorage.getItem("tasks")) ||[]
const taskManagercontainer=document.querySelector(".taskManager");
const confirmE1=document.querySelector(".confirm");
const confiremedBtn=document.querySelector(".confirmed");
const cancelBtn=document.querySelector(".cancel");

document.getElementById("taskForm").addEventListener("submit",handleFormSubmit);

//fun handle the form submit event

function handleFormSubmit(event){
    event.preventDefault(); //default behaviour without using refresh
    const taskInput =document.getElementById("taskInput");
    const taskValue = taskInput.value.trim();
 if(taskValue!==""){
    const newTask ={
        text:taskValue,
        completed:false
    };
    tasks.push(newTask);
    saveTasks();
    taskInput.value="";
    renderTasks();
 }
}
// function to save task 
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
//function to render the task
function renderTasks() {
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';
  
    tasks.forEach((task, index) => {
      const taskCard = document.createElement('div');
      taskCard.classList.add('taskCard');
      let classVal = "pending";
      let textVal = "Pending"
      if (task.completed) {
        classVal = "completed";
        textVal = "Completed";
      }
      taskCard.classList.add(classVal);
  
      const taskText = document.createElement('p');
      taskText.innerText = task.text;
  
      const taskStatus = document.createElement('p');
      taskStatus.classList.add('status');
      taskStatus.innerText = textVal;
  
      const toggleButton = document.createElement('button');
      toggleButton.classList.add("button-box");
      const btnContentEl = document.createElement("span");
      btnContentEl.classList.add("green");
      btnContentEl.innerText = task.completed ? 'Mark as Pending' : 'Mark as Completed';
      toggleButton.appendChild(btnContentEl);
      toggleButton.addEventListener('click', () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add("button-box");
      const delBtnContentEl = document.createElement("span");
      delBtnContentEl.classList.add("red");
      delBtnContentEl.innerText = 'Delete';
      deleteButton.appendChild(delBtnContentEl);
      deleteButton.addEventListener('click', () => {
        indexToBeDeleted = index
        confirmEl.style.display = "block";
        taskManagerContainer.classList.add("overlay");
      });
  
      taskCard.appendChild(taskText);
      taskCard.appendChild(taskStatus);
      taskCard.appendChild(toggleButton);
      taskCard.appendChild(deleteButton);
  
      taskContainer.appendChild(taskCard);
    });
  }
  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
  
  confirmedBtn.addEventListener("click", () => {
    confirmEl.style.display = "none";
    taskManagerContainer.classList.remove("overlay");
    deleteTask(indexToBeDeleted)
  });
  
  cancelledBtn.addEventListener("click", () => {
    confirmEl.style.display = "none";
    taskManagerContainer.classList.remove("overlay");
  });