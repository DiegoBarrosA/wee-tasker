let storedTasks = JSON.parse(localStorage.getItem("myTasks") || "[]");
let myTasks = storedTasks;
const statuses = ["Open", "In Progress", "Done"];

let handyString = "";

let filterTasksStatuses = (x) =>
  myTasks.filter((obj) => {
    return obj.status == x;
  });

for (let i = 0; i < statuses.length; i++) {
  handyString += `<option>${statuses[i]}</option>`;
}

// document.getElementById("statuses").innerHTML = handyString;
handyString = "";
let statusColor = "badge";
for (let j = 0; j < statuses.length; j++) {
  for (let i = 0; i < filterTasksStatuses(statuses[j]).length; i++) {
    if (filterTasksStatuses(statuses[j])[i].status == "Open") {
      statusColor = "bg-red-100 text-xs w-max p-1 rounded mr-2 text-gray-700";
    } else if (filterTasksStatuses(statuses[j])[i].status == "In Progress") {
      statusColor = "bg-yellow-100 text-xs w-max p-1 rounded mr-2 text-gray-700";
    } else if (filterTasksStatuses(statuses[j])[i].status == "Done") {
      statusColor = "bg-green-100 text-xs w-max p-1 rounded mr-2 text-gray-700";
    }
handyString +=`<div class="grid py-2  grid-rows-1 gap-2">
                  <div class="p-2 rounded shadow-sm border-gray-100 border-2">
                    <h3 class="text-sm mb-3 text-gray-700">${filterTasksStatuses(statuses[j])[i].summary}</h3>
                      <select onchange='transitionate(this.options[this.selectedIndex].value,this.options[this.selectedIndex].id)' id='taskId-${filterTasksStatuses(statuses[j])[i].id}' class='${statusColor}'></select>
                      <div class="flex flex-row items-center mt-2">
                      <h4 class="text-sm mb-3 text-gray-400"> ${filterTasksStatuses(statuses[j])[i].description}</h4> 
                      </div>
                    </div>
                  </div>
                </div>`;
statusColor = "badge";
}

  document.getElementById(statuses[j]).innerHTML = handyString;
  handyString = "";
}


for (let j = 0; j < myTasks.length; j++) {
  for (let s = 0; s < statuses.length; s++) {
    handyString += `<option id='optionId-${j}-${statuses[s]}' value='${statuses[s]}'>${statuses[s]}</option>`;
    document.getElementById(`taskId-${j + 1}`).innerHTML = handyString;
  }
  for (let s = 0; s < statuses.length; s++) {
    if (
      document.getElementById("optionId-" + j + "-" + statuses[s]).value ===
      myTasks[j].status
    ) {
      document
        .getElementById("optionId-" + j + "-" + statuses[s])
        .setAttribute("selected", true);
    }

    
}
  handyString = "";
}
window.transitionate = transitionate;
function transitionate(chosen, name) {
  let idTrantionate = Number(name.match(/\d+/g));
  myTasks[idTrantionate].status = chosen;
  localStorage.setItem("myTasks", JSON.stringify(myTasks));
  location.reload();
}
window.createTask = createTask;
function createTask() {
  const currentDateTime = new Date().toISOString();
  let inputSummary = document.getElementById("summary").value;
  let inputDescription = document.getElementById("description").value;
  let newTask = {
    id: myTasks.length + 1,
    summary: inputSummary,
    status: "Open",
    description: inputDescription,
    creationDateTime: currentDateTime,
    updateDateTime: currentDateTime,
  };
  myTasks.push(newTask);
  localStorage.setItem("myTasks", JSON.stringify(myTasks));
}




const modal = document.getElementById('new-task-modal');

var buttons = document.querySelectorAll('.create-task-btn');

// Loop through the buttons and add an event listener to each one
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {

  modal.classList.toggle('hidden');
  });
}
