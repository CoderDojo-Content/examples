function toggleToDoItemState (listItem){
  listItem.classList.toggle("completed")
}

// This function creates a new to-do list item
function newToDoItem(itemText, completed) {
  var newItem = {
    "text": itemText,
    "completed": completed
  }
  var toDoList = document.getElementById("todo")
  var itemHTML = getToDoItemHTML(newItem)
  toDoList.append(itemHTML)
}

// This function adds an item to the to-do list
function addToDoItem() {
  var itemText = document.getElementById("new-todo").value
  newToDoItem(itemText, false)
}

// This function cleans up all the completed to-do items
function clearCompletedToDoItems() {
  
  var items = document.getElementsByClassName("completed")
  
  while(items.length > 0) {
    items[0].remove()
  }
}

// This function resets the to-do list to blank
function emptyList() {
  alert("Emptying list!")
  document.getElementById("todo").innerHTML = ""
}

// This function loads the to-do list when the page loads
function loadList() {
  newToDoItem("Buy milk", true)
  newToDoItem("Do dishes", false)
  newToDoItem("Feed Tito", true)
}

// This funciton gets the HTML code to display a to-do item
function getToDoItemHTML(toDoItem) {
  var listItem = document.createElement("li")
  var itemText = document.createTextNode(toDoItem.text)
  listItem.appendChild(itemText)
  
  if(toDoItem.completed === true){
    listItem.classList.add("completed")
  }
  
  return listItem
}

// Things to do when the page loads
function runWhenPageLoads(){
  // Your code here!
    document.getElementById("add-button").addEventListener("click", addToDoItem)
    document.getElementById("clear-button").addEventListener("click", clearCompletedToDoItems)
    document.getElementById("empty-button").addEventListener("click", emptyList)
    document.getElementById("todo").addEventListener("dblclick", function(event) {
      if(event.target && event.target.matches("li")){
        toggleToDoItemState(event.target)
      }
    })
    loadList()
  
}

runWhenPageLoads()