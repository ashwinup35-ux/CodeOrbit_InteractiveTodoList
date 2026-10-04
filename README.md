# FocusFlow — Interactive To-Do List

A modern and responsive **Interactive To-Do List application** built using HTML, CSS, and vanilla JavaScript.

The application allows users to create tasks, mark them as completed, delete tasks, filter tasks, and automatically save their tasks using the browser's `localStorage`.

---

## Features

* Add new tasks
* Mark tasks as completed
* Mark completed tasks as active again
* Delete individual tasks
* Filter tasks

  * All
  * Active
  * Completed
* Clear all completed tasks
* Display total task count
* Display active task count
* Display completed task count
* Persistent data using `localStorage`
* Responsive design for desktop and mobile
* Empty-state messages
* Smooth animations
* Accessible buttons and keyboard focus
* No external libraries or frameworks

---

## Project Structure

```text
interactive-todo-list/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the structure of the application, including:

* Application header
* Task input form
* Statistics
* Filter buttons
* Task list
* Empty state
* Footer

The CSS and JavaScript files are linked externally.

---

### `style.css`

Contains all visual styling for the application.

It includes:

* Dark modern theme
* Glass-style card
* Responsive layout
* Buttons
* Task styling
* Completed-task styling
* Hover effects
* Animations
* Mobile responsiveness
* Accessibility focus styles

---

### `script.js`

Contains the complete application logic.

It handles:

* Adding tasks
* Completing/uncompleting tasks
* Deleting tasks
* Filtering tasks
* Clearing completed tasks
* Updating statistics
* DOM manipulation
* `localStorage`

---

## How to Run

### Method 1 — Open Directly

1. Put all four files in the same folder.
2. Double-click `index.html`.
3. The application will open in your browser.

---

### Method 2 — Using VS Code

1. Open the project folder in VS Code.
2. Make sure the following files are in the same folder:

```text
index.html
style.css
script.js
README.md
```

3. Open `index.html`.
4. Run it using Live Server.

---

## How the Application Works

### 1. Adding a Task

The user enters a task in the input field and clicks **Add Task**.

JavaScript:

1. Reads the input.
2. Removes unnecessary spaces.
3. Creates a task object.
4. Adds the task to the task array.
5. Saves the task array to `localStorage`.
6. Updates the DOM.

Example task object:

```javascript
{
    id: "123456-abc",
    text: "Complete JavaScript assignment",
    completed: false
}
```

---

### 2. Completing a Task

When the circular check button is clicked, JavaScript changes:

```javascript
completed: false
```

to:

```javascript
completed: true
```

The completed task receives a CSS class:

```text
completed
```

This class changes the appearance of the task by adding:

* Strikethrough text
* Reduced opacity
* Completed check indicator

---

### 3. Deleting a Task

Clicking the `×` button removes the task from the JavaScript array.

The application then:

1. Updates the task array.
2. Saves the new array.
3. Re-renders the task list.

---

### 4. Filtering

The application provides three filters:

```text
All
Active
Completed
```

For example, selecting **Active** displays only tasks where:

```javascript
task.completed === false
```

Selecting **Completed** displays only:

```javascript
task.completed === true
```

---

## localStorage

The application uses the browser's built-in `localStorage`.

Tasks are stored using this key:

```text
focusflow-tasks
```

The JavaScript converts the task array into JSON before saving it:

```javascript
localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
);
```

When the application starts, the saved JSON is converted back into JavaScript data:

```javascript
JSON.parse(
    localStorage.getItem(STORAGE_KEY)
);
```

Because of this, tasks remain available after refreshing the page.

---

## Technologies Used

* HTML5
* CSS3
* JavaScript ES6+
* DOM Manipulation
* Browser localStorage

---

## Important Concepts Demonstrated

This project demonstrates several important frontend concepts:

### DOM Manipulation

JavaScript dynamically creates task elements using:

```javascript
document.createElement()
```

and inserts them into the page using:

```javascript
appendChild()
```

---

### Event Handling

The application uses JavaScript event listeners:

```javascript
addEventListener()
```

for forms, buttons, filters, and task actions.

---

### Array Methods

The project uses methods such as:

```javascript
map()
filter()
forEach()
```

to manage tasks.

---

### localStorage

Browser storage is used to keep tasks after page refreshes.

---

## Limitations

The application stores data only in the current browser.

Therefore:

* Tasks are not synchronized between devices.
* Tasks are not stored on a server.
* Clearing browser storage will remove the saved tasks.

---

## Future Improvements

Possible future features include:

* Edit existing tasks
* Task due dates
* Priority levels
* Search tasks
* Dark/light theme switch
* Drag-and-drop task ordering
* Categories
* Task notifications
* Backend/database support
* User accounts and cloud synchronization

---

## License

This project is free to use for learning and personal projects.

```
```
