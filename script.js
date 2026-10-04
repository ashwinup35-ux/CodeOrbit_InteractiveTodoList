const STORAGE_KEY = "focusflow-tasks";


/* ---------- DOM Elements ---------- */

const taskForm = document.getElementById("taskForm");

const taskInput = document.getElementById("taskInput");

const taskList = document.getElementById("taskList");

const emptyState = document.getElementById("emptyState");

const emptyTitle = document.getElementById("emptyTitle");

const emptyMessage = document.getElementById("emptyMessage");

const clearCompletedButton =
    document.getElementById("clearCompleted");

const currentDate =
    document.getElementById("currentDate");


const totalCount =
    document.getElementById("totalCount");

const activeCount =
    document.getElementById("activeCount");

const completedCount =
    document.getElementById("completedCount");

const taskSummary =
    document.getElementById("taskSummary");

const filterButtons =
    document.querySelectorAll(".filter-btn");


/* ---------- Application State ---------- */

let tasks = loadTasks();

let currentFilter = "all";


/* ---------- Local Storage ---------- */

// Load previously saved tasks from the browser.
function loadTasks() {

    try {

        const savedTasks =
            JSON.parse(
                localStorage.getItem(STORAGE_KEY)
            );

        return Array.isArray(savedTasks)
            ? savedTasks
            : [];

    } catch (error) {

        return [];
    }
}


// Save the current task list.
function saveTasks() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );
}


/* ---------- Utility Functions ---------- */

function createId() {

    return `${Date.now()}-${Math.random()
        .toString(16)
        .slice(2)}`;
}


function formatDate() {

    const today = new Date();

    return today.toLocaleDateString(
        "en-IN",
        {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


/* ---------- Filtering ---------- */

function getFilteredTasks() {

    if (currentFilter === "active") {

        return tasks.filter(
            task => !task.completed
        );
    }


    if (currentFilter === "completed") {

        return tasks.filter(
            task => task.completed
        );
    }


    return tasks;
}


/* ---------- Statistics ---------- */

function updateStats() {

    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const active =
        tasks.length - completed;


    totalCount.textContent =
        tasks.length;


    activeCount.textContent =
        active;


    completedCount.textContent =
        completed;


    taskSummary.textContent =
        `${tasks.length} ${
            tasks.length === 1
                ? "task"
                : "tasks"
        }`;
}


/* ---------- Empty State ---------- */

function updateEmptyState(filteredTasks) {

    if (filteredTasks.length > 0) {

        emptyState.hidden = true;

        return;
    }


    emptyState.hidden = false;


    if (tasks.length === 0) {

        emptyTitle.textContent =
            "Your list is clear";

        emptyMessage.textContent =
            "Add your first task and start making progress.";

        return;
    }


    if (currentFilter === "active") {

        emptyTitle.textContent =
            "Nothing active";

        emptyMessage.textContent =
            "You've completed everything on your list.";

        return;
    }


    if (currentFilter === "completed") {

        emptyTitle.textContent =
            "No completed tasks";

        emptyMessage.textContent =
            "Completed tasks will appear here.";

        return;
    }


    emptyTitle.textContent =
        "Your list is clear";

    emptyMessage.textContent =
        "Add your first task and start making progress.";
}


/* ---------- Render Tasks ---------- */

function renderTasks() {

    const filteredTasks =
        getFilteredTasks();


    // Rebuild the visible task list using DOM manipulation.
    taskList.innerHTML = "";


    filteredTasks.forEach(task => {

        const item =
            document.createElement("li");

        item.className =
            `task-item${
                task.completed
                    ? " completed"
                    : ""
            }`;

        item.dataset.id = task.id;


        const checkButton =
            document.createElement("button");

        checkButton.type = "button";

        checkButton.className =
            "check-btn";

        checkButton.dataset.action =
            "toggle";

        checkButton.setAttribute(
            "aria-label",
            task.completed
                ? `Mark "${task.text}" as active`
                : `Mark "${task.text}" as complete`
        );

        checkButton.textContent =
            task.completed ? "✓" : "";


        const text =
            document.createElement("span");

        text.className =
            "task-text";

        text.textContent =
            task.text;


        const deleteButton =
            document.createElement("button");

        deleteButton.type = "button";

        deleteButton.className =
            "delete-btn";

        deleteButton.dataset.action =
            "delete";

        deleteButton.setAttribute(
            "aria-label",
            `Delete "${task.text}"`
        );

        deleteButton.textContent = "×";


        item.append(
            checkButton,
            text,
            deleteButton
        );


        taskList.appendChild(item);
    });


    updateStats();

    updateEmptyState(filteredTasks);
}


/* ---------- Add Task ---------- */

function addTask(text) {

    const cleanText =
        text.trim();


    if (!cleanText) {
        return;
    }


    const newTask = {

        id: createId(),

        text: cleanText,

        completed: false
    };


    tasks.unshift(newTask);


    saveTasks();

    renderTasks();
}


/* ---------- Toggle Task ---------- */

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };
        }


        return task;
    });


    saveTasks();

    renderTasks();
}


/* ---------- Delete Task ---------- */

function deleteTask(id) {

    tasks =
        tasks.filter(
            task => task.id !== id
        );


    saveTasks();

    renderTasks();
}


/* ---------- Clear Completed ---------- */

function clearCompleted() {

    tasks =
        tasks.filter(
            task => !task.completed
        );


    saveTasks();

    renderTasks();
}


/* ---------- Event Listeners ---------- */

// Handle adding a new task.
taskForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        addTask(taskInput.value);

        taskInput.value = "";

        taskInput.focus();
    }
);


// Use event delegation for task buttons.
taskList.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest("button");


        if (!button) {
            return;
        }


        const taskItem =
            button.closest(".task-item");


        if (!taskItem) {
            return;
        }


        const { id } =
            taskItem.dataset;


        if (button.dataset.action === "toggle") {

            toggleTask(id);
        }


        if (button.dataset.action === "delete") {

            deleteTask(id);
        }
    }
);


// Change the current task filter.
filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            currentFilter =
                button.dataset.filter;


            filterButtons.forEach(
                filterButton => {

                    filterButton.classList.toggle(
                        "active",
                        filterButton === button
                    );
                }
            );


            renderTasks();
        }
    );
});


clearCompletedButton.addEventListener(
    "click",
    clearCompleted
);


/* ---------- Initialization ---------- */

currentDate.textContent =
    formatDate();


renderTasks();
