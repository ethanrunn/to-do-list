// to create a webpage that helps user set tasks to be done

// after creating the ui on html,
// in js, we target all the elements we are goin to work with and assigned them to a var

let btn1 = document.querySelector(".add-task");
let taskInput = document.querySelector(".task-input");
let taskList = document.querySelector(".collection");
let btn2 = document.querySelector(".clear-tasks");
let filter = document.querySelector(".filter-task");

// console.log(btn2);
// console.log(filter);
// then create a function to loadEventListeners when called thus
loadEventListeners();

// to create the above function then, we do

function loadEventListeners() {
  // this means inside this function is where we will create our individual event listeners such that when the above function is called all event listeners inside it gets loaded
  // so now we add our first event listener to the input that submits the form (which is jus an input with type=form)
  
  // 1.0
  btn1.addEventListener("click", addTask);
  // having added the event listener above to the form, we need to create the function (addTask) that will run when the event happens, this is depicted on 1.0 below

  // 1.1
  // in the event listener of 1.0, we also created a function to store the tasks to local storage

  // 1.2
  // having saved our tasks to local storage in 1.1, the tasks (we create/enter to tasklist) will be in local storage everytime, even on reload, but wldnt appear on the ui on refresh, so we need to set the content of the local storage to show up on the ui whenever reload is done
  // to do this, we add an event listener to the (whole) doc
  document.addEventListener("DOMContentLoaded", getTasks);
  // from the above event listener, the getTasks function will run when the dom content is loaded

  // 2.0
  // now we also want to be able to clear task. so we add an event listener to the task list (ul) and use event delegation to achieve this
  taskList.addEventListener("click", clearTask);
  // the clearTask function in 2.0 below will run when the event above happens

  // 3.0
  // we now want to add an event listener to the 2nd button (clear-task)in order to clear the whole tasks when clicked
  btn2.addEventListener("click", clearAllTasks);
  // the clearAllTasks function is declared in 3.0 below

  // 4.0
  // now we want to add an EL to the filter-task input so that we can filter task in the task list by entering letters/words in the filter task input
  filter.addEventListener("keyup", filterTasks);
}

// 1.0
function addTask(e) {
  if (taskInput.value === "") {
    // (which is the value/string/text written into the input of the form)
    // i.e the input is empty - user doesn't put anything)
    // alert("Add a task");
    taskInput.setAttribute("placeholder", "My friend, enter a task");
    btn1.style.backgroundColor = "red";
    btn1.style.color = "white";
  } // (if user enters a task)
  else {
    // create an li element
    let li = document.createElement("li");
    // add a class to it
    li.className = "collection-item";
    // we want the taskInput.value to be appended as a child (esp a textnode) of the li
    li.appendChild(document.createTextNode(taskInput.value));
    // haven completed the above, we also need to attach the remove(x) icon as a child of the li also
    // so we create the a element first
    link = document.createElement("a");
    // // then we give it a class name
    link.className = "delete-item secondary content";
    // // he then added an i element inside the a element (link)
    // link.innerHTML = '<i class="fa fa-remove"></i>';
    // but me i'll add an image instead
    link.innerHTML = '<img src="./sma_logo.jpg">';
    // // so now we need to append the link as a child of the li
    li.appendChild(link);
    // // and finally append the li as a child of the ul
    taskList.appendChild(li);
    // all the above will run and add the users input value into our ul
    
    // 1.1 we then call a function to store the task that has been created to LS
    storeTaskInLocalStorage(taskInput.value);
    // we create the function later in 1.1 below

    // when done with the above, we then clear the taskInput i.e. set taskInput.value to null/empty string
    taskInput.value = "";
    btn1.style.backgroundColor = "green";
    taskInput.setAttribute("placeholder", "Enter a task");
    btn1.style.color = "white";
  }
  e.preventDefault();
}

// 1.1
// haven called the function up, we have to create the function and add what it wll do to that our param inside
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 1.2
// here we create the getTasks function to get the tasks in the LS and show them on the ui
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // the above will get the tasks in the LS and save them to the var tasks, so below, we now use a forEach loop to create the li element for each of the content (task) of the tasks var, its this li that will be in the ui

tasks.forEach(function(task){
      let li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(task));
      link = document.createElement("a");
      link.className = "delete-item secondary content";
      link.innerHTML = '<img src="./sma_logo.jpg">';
      li.appendChild(link);
      taskList.appendChild(li);
});
}

// 2.0
function clearTask(e) {
    if (
      e.target.parentElement.parentElement.classList.contains("collection-item")
    )
      if (confirm("Sure about clearing that task??")) {
        e.target.parentElement.parentElement.remove();
      }
    
    // the above will delete the task from the ui, but we also want the task to be deleted from the Ls when this function is called,so we add another function, inside this function, which would delete the task from the LS when the above function happens
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    e.preventDefault();
}

// so we create the remove task from lcal storage function now
function removeTaskFromLocalStorage(taskItem){
    let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}
// from the above, we have gotten the tasks in the LS and saved them to the var tasks
// we then want to loop thru the tasks var to find/select the exact task we want to clear
tasks.forEach(function(task, index){
    if (taskItem.textContent === task) {
        tasks.splice(index, 1);
    }
}); // the above means, for each task (and each index) in the tasks array, if the textcontent
// of what we have targeted on the doc = that particular task that the for each loop has
// gotten to, then splice (remove) that current task from the tasks array. Index means that
// particular index the forEach loop has gotten too and the 1 means splice/remove jus that
// one index (deletecount)

// after splicing, we then set the tasks var (which is where our tasks are stored in LS) to
// the new value(s) i.e. without the removed task
localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 3.0
function clearAllTasks(e) {
    // now there are two ways to do it
    // 1st
    // we cld jus set the innerhtml of the tasklist to be empty when btn2 is clicked, but we shld also add a confirmation alert too, thus
    if (confirm("All tasks will be cleared. Confirm??"))
    {
        taskList.innerHTML = '';
    }
    // 2nd
    // while (taskList.firstChild) {
    //   // if (confirm("All tasks will be cleared. Confirm??"))
    //   taskList.removeChild(taskList.firstChild);
    // }
    // the explanation of the above is that using a while loop, the system checks that the condition is true and the condition in this case is to check if taskList has a firstchild, so if there's a firstchild, remove it and the loop keeps checking and removing all firstchilds until there's no more firstchild. MAD!!!!!

    // note that we didn't add our confirm alert, this is because if we have more than one list items, in this 2nd method, for everytime the system wants to remove a first child, the system will have to confirm from the user first if they really want to remove it, this sucks cos if there are 6 list items the confirm message will come up six times before the tasks are finally cleared

    // according to him, the system run time (the time it takes for the system/browser to execute a cmd or program) for this 2nd method was shorter than the first which means that the 2nd method carried out the program/cmd faster than the first. MAD OOO!!!

    // also for this clear all task function too, we want the tasks to also be cleared from the LS when we clear all tasks
    // so we call a function to do so here, and then create the function later
    clearAllTasksFromLocalStorage();

    e.preventDefault(0);
}

// so we now create the function
function clearAllTasksFromLocalStorage(){
    localStorage.clear(); // and we jus set it to clear
}

  // 4.0
  function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task){
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    });
  }
  // add event listener to btn2
  // btn2.addEventListener('click', clearTasks);

  // list = document.querySelectorAll('.collection-item');

  // console.log(list);
  // function clearTasks(e) {
  //     list.remove();
  //     e.preventDefault();
  // }
