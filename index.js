"use strict"
let target = document.getElementById("target");
let addBtn = document.getElementById("add_btn");
let list = document.getElementById("list");
let all = document.getElementById("all")
let deleteAll = document.getElementById("deleteAll");
let active = document.querySelectorAll(".task_tab>p")

  let todos  = JSON.parse(localStorage.getItem("todos_list"));
  

   /** displaying items*/
 function showTodos(filters){
   list.innerHTML= ""
   todos.forEach((todo,id)=>{
     let isCompleted = todo.status == "completed" ? "checked":"";
  if(filters == todo.status || filters == "all"){

 let  li   = `<li class="list_items"><label id="items" ><input onclick="update(this)"  id="${id}" type="checkbox" ${isCompleted}><span class="${isCompleted}">${todo.name}</span></label><i onclick="remove(${id})"   class= "fa-solid fa-trash"></i></li>`

list.innerHTML += li
}
   })
if(list.innerHTML === ""){
  list.innerHTML = '<span>you do not have any task yet!!</span>'
  }
  }
  /*** remove or delee from todos*/
  function remove(id){
   todos.splice(id,1)
localStorage.setItem("todos_list",JSON.stringify(todos))
showTodos("all")
if(list.innerHTML === ""){
  list.innerHTML = '<span>you do not have any task yet!!</span>'
  }
  }
  /*** updatimg on click*/
  function update(selectedItem){
 console.log(selectedItem.id)
  let taskName = selectedItem.parentElement.lastElementChild;
  if(selectedItem.checked == true){
    taskName.classList.add("checked")
    todos[selectedItem.id].status = "completed"
  }else{
    todos[selectedItem.id].status = "pending"
    taskName.classList.remove("checked")
  }
   localStorage.setItem("todos_list",JSON.stringify(todos))
  }
  deleteAll.addEventListener("click",()=>{
    
   todos.splice(0,todos.length)
    localStorage.setItem("todos_list",JSON.stringify(todos))
  console.log(todos)
  showTodos("all")

  })
  /*grabbing and storage in localStorage*/
addBtn.addEventListener('click',()=>{
let userTask = target.value.trim()
   if(userTask){
  let taskInfo ={
    name: userTask,
    status: "pending"
  }
  if(!todos){
   todos = []
  }
  console.log(list.innerHTML)
    todos.push(taskInfo)
   }
  localStorage.setItem("todos_list",JSON.stringify(todos))
  showTodos("all")
  target.value =""
  /****removing the active clas from filters ad adding t to the all"*/
 active.forEach(item=>item.classList.remove("active"))
  all.classList.add("active")
})

  /**** the filters*/
   function activeTab(){
active.forEach((item)=>{item.classList.remove("active")
});
this.classList.add("active")
showTodos(this.id)
   }
   active.forEach((item)=>item.addEventListener("click",activeTab))
   
 showTodos("all")