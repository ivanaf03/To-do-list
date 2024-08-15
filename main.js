userInput.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask();
    updateStats();
});

list.addEventListener("click", (event) => {
    if (event.srcElement.nodeName == 'INPUT') {
        updateStats();
    } else if(event.srcElement.nodeName == 'IMG') {
        deleteTask(event.srcElement.parentNode.parentNode.id);
    }
});


// Adding tasks
let cnt = 1;
const titleInput = document.getElementById("inputTitle");
const bodyInput = document.getElementById("inputBody");

let addTask = () => {
    // Save the current state of checkboxes
    let checkboxes = [];
    list.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkboxes.push({ id: checkbox.id, checked: checkbox.checked });
    });

    // Add new task to the list
    list.innerHTML += 
    `
    <div class="taskContainer" id="${cnt}">
            <input type="checkbox" id="check${cnt}">
            <label for="check${cnt}"></label>
            <div class="separator">
                <span id="taskTitle">${titleInput.value}</span>
                <img src="trash.png" class="delete">
            </div>
            <p id="taskBody">${bodyInput.value}</p>
    </div>`;

    // Restore the previous state of checkboxes
    checkboxes.forEach(checkboxState => {
        let checkbox = document.getElementById(checkboxState.id);
        if (checkbox) {
            checkbox.checked = checkboxState.checked;
        }
    });

    cnt++;
    titleInput.value = "";
    bodyInput.value = "";
};


// Update stats
let stats = document.getElementById("stats");

let updateStats = () => {
    let numTasks = list.querySelectorAll('input[type="checkbox"]:not(:checked)');
    let checked = list.querySelectorAll('input[type="checkbox"]:checked');

    stats.innerHTML = `
        <p>Pending tasks: ${numTasks.length}</p>
        <p>Completed tasks: ${checked.length}</p>`;
};


// Deleting tasks
let deleteTask = (taskId) => {
    let task = document.getElementById(taskId);
    list.removeChild(task);
    updateStats();
};