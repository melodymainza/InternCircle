
let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));

        updateTasksList();
        updateStats();
    }
});


const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({
            text: text,
            completed: false
        });

        taskInput.value = '';

        updateTasksList();
        updateStats();
        saveTasks();
    }
};


const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;

    updateTasksList();
    updateStats();
    saveTasks();
};

// Delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);

    updateTasksList();
    updateStats();
    saveTasks();
};

// Edit a task
const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');

    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);

    updateTasksList();
    updateStats();
    saveTasks();

    taskInput.focus();
};

//Update progress statistics
const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    const progress = totalTasks === 0
        ? 0
        : (completeTasks / totalTasks) * 100;

    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText =
        `${completeTasks} / ${totalTasks}`;

    if (tasks.length > 0 && completeTasks === totalTasks) {
        blastConfetti();
    }
};

//Display tasks on the page
const updateTasksList = () => {
    const taskList = document.querySelector('.task-list');

    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem">

                <div class="task ${task.completed ? 'complete' : ''}">

                    <input
                        type="checkbox"
                        class="checkbox"
                        ${task.completed ? 'checked' : ''}
                    />

                    <p></p>

                    <div class="icons">

                        <button class="edit-btn" type="button">
                            Edit
                        </button>

                        <button class="delete-btn" type="button">
                            Delete
                        </button>

                    </div>

                </div>

            </div>
        `;

        listItem.querySelector('p').textContent = task.text;

        
        listItem.querySelector('.checkbox').addEventListener(
            'change',
            () => toggleTaskComplete(index)
        );

        
        listItem.querySelector('.edit-btn').addEventListener(
            'click',
            () => editTask(index)
        );

        listItem.querySelector('.delete-btn').addEventListener(
            'click',
            () => deleteTask(index)
        );

        taskList.append(listItem);
    });
};

document.getElementById('newTask').addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

const blastConfetti = () => {
    if (window.tsParticles) {
        tsParticles.confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
};
