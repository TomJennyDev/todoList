//Select DOM
const taskInput = document.querySelector("#newitem");
const form = document.querySelector(".form");
const todoList = document.querySelector(".task-list");
const filterOption = document.querySelector("#filter");

//Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskLabel = taskInput.value.trim();
  if (taskLabel) {
    addTask(taskLabel);
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

function addTask(label) {
  // Create list element
  const todoLi = document.createElement("li");

  // Create label span
  const labelSpan = document.createElement("span");
  labelSpan.className = "label";
  labelSpan.textContent = label;
  todoLi.appendChild(labelSpan);

  // Create actions buttons
  const divActions = document.createElement("div");
  divActions.className = "actions";
  divActions.innerHTML = `<input class="btn-action btn-action-done" type="checkbox" />
  <button class="btn-action btn-action-delete">✖</button>`;
  todoLi.appendChild(divActions);

  //attach final Todo
  todoList.appendChild(todoLi);
}

function markDone(todoLi) {
  todoLi.classList.toggle("done");
}

function removeTask(todoLi) {
  todoLi.classList.add("fall");
  todoLi.addEventListener("transitionend", () => todoLi.remove());
}

function filterTasks(hideCompletedTasks) {
  todoList.querySelectorAll("li").forEach((todoLi) => {
    if (todoLi.classList.contains("done")) {
      todoLi.style.display = hideCompletedTasks ? "none" : "flex";
    }
  });
}
