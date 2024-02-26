const inputTaskField = document.querySelector('#input-tasks');
const submitBtn      = document.querySelector('#submit-task');
const toddoList      = document.querySelector('.todo-list');
const tasks = [];

const display = (tasks) => {
    inputTaskField.innerHTML = '';
    if (tasks.length === 0) {
        console.log('No todo found')
    } else {
        tasks.forEach((task, index) => {
            // create a div todoItems
            const todoItems = document.createElement('div');

            // create and add a description to todoItems
            const todoDescription = document.createElement('p');
            todoDescription.classList.add('task-description');
            todoDescription.textContent = task.title;
            todoItems.appendChild(todoDescription);

            // create and add a todoDeleteBtn to todoItem
            const todoDeleteBtn = document.createElement("button");
            todoDeleteBtn.classList.add('delete-task-btn');
            todoDeleteBtn.textContent = "Delete";
            todoDeleteBtn.addEventListener("click", ()=> deleteTask(task.id));
            todoItems.appendChild(todoDeleteBtn);

            toddoList.appendChild(todoItems);
        });
    };
};

// const addTodo = async () => {
//     try {
//         const { data } = await axios('https://jsonplaceholder.typicode.com/todos');
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// };

// adding todo
const addTodo = async () => {
    try {
        const res  = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await res.json();
        display(data);
    } catch (error) {
        console.log(error);
    }
};

// delete task
const deleteTask = (id) => {
    console.log(id);
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
};

// live clock
const showTime = () => {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();
addTodo();