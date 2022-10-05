const tasks = []; // Every task is include here
let time = 0; //For the countdown time
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector("#time #taskName");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value != "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTasks();
  }
});

const createTask = (value) => {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };
  tasks.unshift(newTask);
};

const renderTasks = () => {
  const html = tasks.map((task) => {
    return `
            <div class="task">
                <div class="completed">${
                  task.completed
                    ? `<span class="done">Done</span>`
                    : `<button class="start-button" data-id="${task.id}">Start</button>`
                }</div>
                <div class="title">${task.title}</div>
            </div>
        `;
  });

  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll(".task .start-button");
  startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (!timer) {
        const id = button.getAttribute("data-id"); // Extract id
        startButtonHandler(id);
        button.textContent = "In Progress ...";
      }
    });
  });
};

const startButtonHandler = (id) => {
  time = 25 * 60;
  current = id;
  const taskId = tasks.findIndex((task) => task.id === id);
  taskName.textContent = tasks[taskId].title;

  timer = setInterval(() => {
    timeHandler(id);
  }, 1000);
};

const timeHandler = (id) => {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timer);
    markCompleted(id);
    timer = null;
    renderTasks();
    startBreak();
  }
};

const startBreak = () => {
  time = 5 * 60;
  taskName.textContent = "Break";
  timerBreak = setInterval(() => {
    timerBreakHandler();
  }, 1000);
};

const timerBreakHandler = () => {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    timerBreak = null;
    taskName.textContent = "";
    renderTasks();
  }
};

const renderTime = () => {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);
  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds} `;
};

const markCompleted = (id) => {
  const taskId = tasks.findIndex((task) => task.id === id);
  tasks[taskId].completed = true;
};

function firstRender() {
  renderTime();
  renderTasks();
}
firstRender();
