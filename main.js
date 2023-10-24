const addBtn = document.querySelector('#add-btn');
const newTaskInput = document.querySelector('#wrapper input');
const taskContainer = document.querySelector('#tasks');
const error = document.getElementById('error');
const countValue = document.querySelector('.count-value');
let taskValue = 0;

const displayCount = (taskValue) => {
    countValue.innerText = taskValue;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";

    if(!taskName) {
    setTimeout(() => {
        error.style.display = "block";
    }, 200);
    return;
    }

    const task = `<div class="task">
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskName}</span>
    <button class="edit">
    <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
    <i class="fa-solid fa-trash"></i>
    </button>
    </div>`;

    taskContainer.insertAdjacentHTML("beforeend", task);
     
   const deleteBtn = document.querySelectorAll('.delete');
   deleteBtn.forEach(button => {
    button.onclick = () => {
        button.parentNode.remove();
        taskValue -= 1;
        displayCount(taskValue);
    };
   });

   const editBtn = document.querySelectorAll('.edit');
   editBtn.forEach((editButtons) => {
    editButtons.onclick = (e) => {
        let targetElement = e.target;
        if(!(e.target.className == "edit")) {
            targetElement = e.target.parentElement;
        }
    
      newTaskInput.value = targetElement.previousElementSibling?.innerText;
      targetElement.parentNode.remove();
      taskValue -= 1;
      displayCount(taskValue);
    };
   });
   const taskCheck = document.querySelectorAll('.task-check');
   taskCheck.forEach((checkbox) => {
    checkbox.onchange = () => {
        checkbox.nextElementSibling.classList.toggle('completed');
     if(checkbox.checked) {
        taskValue -= 1;
     } else {
        taskValue += 1;
     }
     displayCount(taskValue);
    };
   });
   taskValue += 1;
   displayCount(taskValue);
   newTaskInput.value = "";
};

addBtn.addEventListener('click', addTask)

newTaskInput.addEventListener("keypress", function(event){
    if(event.key === "Enter") {
        addTask(); 
    }
});


window.onload = () => {
    taskValue = 0;
   displayCount(taskValue);
   newTaskInput.value = "";
};