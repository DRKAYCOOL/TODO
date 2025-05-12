let form = document.getElementById("form");
let userInput = document.getElementById("input")
let button = document.getElementById("button")
let savedTasksContainer = document.getElementById("saved-tasks-container")


todoArray = []

form.addEventListener(`submit`, storeTask)


function storeTask(event){
    event.preventDefault()
    let task = userInput.value

    const dupliChecker = todoArray.some(function(item){
        return item.todo === task
    })

    if(!task.trim()){
        console.log("Enter a task!")
        alert(`Enter a task!`)
    }else if(dupliChecker){
        console.log("Task already exist!")
        alert(`Task already exist!`)
    }else{
        let taskObject = {
            todo : task,
            checked : false
        }
        todoArray.push(taskObject)
        form.reset()
        storeToLocalStorage()
        displayTasktoUI()
    }
}

function storeToLocalStorage(){
    localStorage.setItem("todo", JSON.stringify(todoArray))
}

function fetchFromStorage(){
    if(localStorage.getItem("todo")){
        todoArray = JSON.parse(localStorage.getItem("todo"))
        displayTasktoUI()
    }
}

fetchFromStorage()

function displayTasktoUI(){
    savedTasksContainer.innerHTML = ""

    todoArray.forEach(function(item, index){
        let todoItem = item.todo

        let todoContainer = document.createElement("div")
        todoContainer.classList.add("todo")
        todoContainer.setAttribute("id", `${index}`)

        let leftContainer = document.createElement("div")
        leftContainer.classList.add("left-container")
        leftContainer.setAttribute("id", "left-container")

        let uncheckedIcon = document.createElement("i")
        uncheckedIcon.classList.add("fa-regular", "fa-square", "unchecked")
        uncheckedIcon.setAttribute("id", "unchecked")
        uncheckedIcon.setAttribute("data-action", "check")

        let checkedIcon = document.createElement("i")
        checkedIcon.classList.add("fa-solid", "fa-square-check", "checked")
        checkedIcon.setAttribute("id", "checked")
        checkedIcon.setAttribute("data-action", "check")

        let todoText = document.createElement("p")
        todoText.classList.add("task")
        todoText.setAttribute("id", "task")
        todoText.textContent = todoItem
        todoText.setAttribute("data-action", "check")
    

        let rightContainer = document.createElement("div")
        rightContainer.classList.add("right-container")
        rightContainer.setAttribute("id", "right-container")

        let editIcon = document.createElement("i")
        editIcon.classList.add("fa-solid", "fa-pen-to-square")
        editIcon.setAttribute("id", "edit")
        editIcon.setAttribute("data-action", "edit")

        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa-solid", "fa-trash-can")
        deleteIcon.setAttribute("id", "delete")
        deleteIcon.setAttribute("data-action", "delete")

        if(!item.checked){
            leftContainer.append(uncheckedIcon, todoText)
            rightContainer.append(editIcon, deleteIcon)
            todoContainer.append(leftContainer, rightContainer)
            savedTasksContainer.append(todoContainer)
            

        }else{
            leftContainer.append(checkedIcon, todoText)
            rightContainer.append(editIcon, deleteIcon)
            todoContainer.append(leftContainer, rightContainer)
            savedTasksContainer.append(todoContainer)
        }    
        });
    }

savedTasksContainer.addEventListener("click", function(event){
    let userTarget = event.target
    let taskContainer = userTarget.parentElement.parentElement
    if(taskContainer.className !== "todo") return;
    let taskContainerFiltered = taskContainer

    let dataAction =userTarget.dataset.action
    let todoID = Number(taskContainer.id)
    
    if(dataAction === "check"){
        checkTodo(todoID)
    }else if(dataAction === "edit"){
        editTodo()
    }else if(dataAction === "delete"){
        deleteTodo()
    }
})

function checkTodo(idOfTodo){
    todoArray = todoArray.map(function(item, index){
        if(index === idOfTodo){
            return{
                todo : item.todo,
                checked : !item.checked
            }
        }else{
            return{
                todo : item.todo,
                checked : item.checked
            }
        }
})
displayTasktoUI()
}

