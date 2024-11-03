const storedTasks = JSON.parse(localStorage.getItem("myTasks") || "[]");
let myTasks = storedTasks;
const statuses = ["Open", "In Progress", "Done"];

const filterTasksStatuses = (status) =>
  myTasks.filter((task) => task.status === status);

const statusColors = {
  Open: "bg-red-100 text-xs w-max p-1 rounded mr-2 text-gray-700",
  "In Progress": "bg-yellow-100 text-xs w-max p-1 rounded mr-2 text-gray-700",
  Done: "bg-green-100 text-xs w-max p-1 rounded mr-2 text-gray-700",
};

const createTaskElement = (task) => {
  const statusColor = statusColors[task.status];
  return `
    <div class="grid py-2 grid-rows-1 gap-2">
      <div class="p-2 rounded shadow-sm border-gray-100 border-2">
        <h3 class="text-sm mb-3 text-gray-700">${task.summary}</h3>
        <select onchange="transitionate(this.value, this.id)" id="taskId-${task.id}" class="${statusColor}"></select>
        <div class="flex flex-row items-center mt-2">
          <h4 class="text-sm mb-3 text-gray-400">${task.description}</h4>
        </div>
      </div>
    </div>
  `;
};

const createOptionElement = (task, status) => {
  const selected = task.status === status ? "selected" : "";
  return `<option id="optionId-${task.id}-${status}" value="${status}" ${selected}>${status}</option>`;
};

const renderTasks = () => {
  statuses.forEach((status) => {
    const tasks = filterTasksStatuses(status);
    const taskElements = tasks.map(createTaskElement).join("");
    document.getElementById(status).innerHTML = taskElements;
  });
};

const renderOptions = () => {
  myTasks.forEach((task) => {
    const optionElements = statuses
      .map((status) => createOptionElement(task, status))
      .join("");
    document.getElementById(`taskId-${task.id}`).innerHTML = optionElements;
  });
};

const transitionate = (chosen, name) => {
  const id = Number(name.match(/\d+/g));
  myTasks[id - 1].status = chosen;
  localStorage.setItem("myTasks", JSON.stringify(myTasks));
  location.reload();
};

const createTask = () => {
  const currentDateTime = new Date().toISOString();
  const inputSummary = document.getElementById("summary").value;
  const inputDescription = document.getElementById("description").value;

  const newTask = {
    id: myTasks.length + 1,
    summary: inputSummary,
    status: "Open",
    description: inputDescription,
    creationDateTime: currentDateTime,
    updateDateTime: currentDateTime,
  };
  myTasks.push(newTask);
  localStorage.setItem("myTasks", JSON.stringify(myTasks));
};

const modal = document.getElementById("new-task-modal");
const buttons = document.querySelectorAll(".create-task-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.toggle("hidden");
  });
});

renderTasks();
renderOptions();
