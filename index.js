let todoArray = [
  {
    id: 1,
    name: "Learn Javascript",
    status: true,
  },
  {
    id: 2,
    name: "Code a todo List",
    status: false,
  },
];

// save data to local storage
const setItemLocalStorage = (item) =>
  localStorage.setItem("todo-list", JSON.stringify(item));

// get data from local storage
const getItemLocalStorage = () => {
  todoArray = JSON.parse(localStorage.getItem("todo-list"));
};

window.addEventListener("load", (event) => {
  if (localStorage.getItem("todo-list") === null) {
    setItemLocalStorage(todoArray);
  } else {
    getItemLocalStorage();
  }
  //render todolist
  todoArray.forEach((todo) => renderTask(todo));
});

//set status of task
const setStatusTodoList = (id, status) => {
  todoArray.forEach((todo) => {
    if (todo.id === +id) todo.status = status;
  });
  setItemLocalStorage(todoArray);
};

// remove task from todo-list array
const removeTaskFromTodoList = (id) => {
  todoArray = todoArray.filter((todo) => todo.id !== +id);
  setItemLocalStorage(todoArray);
};

// add task to todo-list array
const addTaskToTodoList = (taskObj) => {
  todoArray.push(taskObj);
  setItemLocalStorage(todoArray);
};

//get element
const getELe = (element) => document.querySelector(element);

//Select DOM
const taskInput = getELe("#newitem");
const form = getELe(".form");
const todoList = getELe(".task-list");
const filterOption = getELe("#filter");

//Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskLabel = taskInput.value.trim();
  if (taskLabel) {
    const taskObj = {
      id: Date.now(),
      name: taskLabel,
      status: false,
    };

    addTask(taskObj);
    taskInput.value = "";
  }
});

todoList.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList[1] === "btn-action-done") {
    markDone(element.parentNode.parentNode);
  } else if (element.classList[1] === "btn-action-delete") {
    removeTask(element.parentNode.parentNode);
  }
});

filterOption.addEventListener("click", (e) => {
  filterTasks(e.target.checked);
});

function addTask(taskObj) {
  addTaskToTodoList(taskObj);

  //render task
  renderTask(taskObj);
}

function renderTask(item) {
  // Create list element
  const todoLi = document.createElement("li");

  // set id for li
  todoLi.dataset.id = item.id;

  // Create label span
  const labelSpan = document.createElement("span");
  labelSpan.className = "label";
  labelSpan.textContent = item.name;
  todoLi.appendChild(labelSpan);

  // Create actions buttons
  const divActions = document.createElement("div");
  divActions.className = "actions";
  divActions.innerHTML = `<input class="btn-action btn-action-done" type="checkbox" />
      <button class="btn-action btn-action-delete">✖</button>`;
  todoLi.appendChild(divActions);

  //attach final Todo
  todoList.appendChild(todoLi);

  // set markdown
  if (item.status) {
    todoLi.classList.add("done");
    const buttonDone = divActions.childNodes[0];
    buttonDone.checked = true;
  }
}

function markDone(todoLi) {
  const isTaskDone = todoLi.classList.contains("done");
  setStatusTodoList(todoLi.dataset.id, !isTaskDone);
  todoLi.classList.toggle("done");
}

function removeTask(todoLi) {
  todoLi.classList.add("fall");
  todoLi.addEventListener("transitionend", () => todoLi.remove());
  removeTaskFromTodoList(todoLi.dataset.id);
}

function filterTasks(hideCompletedTasks) {
  todoList.querySelectorAll("li").forEach((todoLi) => {
    if (todoLi.classList.contains("done")) {
      todoLi.style.display = hideCompletedTasks ? "none" : "flex";
    }
  });
}
