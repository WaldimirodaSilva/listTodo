// Seleção de elementos...
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const edit=document.querySelector("#edit")
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");//apagar
const filterBtn = document.querySelector("#filter-select");
const desc=document.querySelector("#todo-desc");
const menu=document.querySelectorAll(".todo-container div ul li");
const formTodo=document.querySelector("#control-edit");
const toolbar=document.querySelector("#toolbar");
const footerTodo=document.querySelector(".todoHeader");
const statusTudo=document.querySelectorAll(".status_todoList small")
let oldInputValue;
let oldDescValue;
let totNaoInicializado=0;
let totInicializado=0;
totOnProcess=0;
 
 
// Funções
  function activeMenu(){
    menu.forEach((li)=>
        li.classList.remove("active"));
        this.classList.add("active");
        if(this.classList.contains("seachTodo")){
          
            toolbar.classList.toggle("active");
           formTodo.classList.toggle("active");
        }
       if(this.classList.contains("addTodo")){
          footerTodo.classList.toggle("close");
          todoForm.classList.toggle("active");
          formTodo.classList.toggle("active");

          
       }
       
 }
 const saveTodo=(text,todoDesc="",status=0,save=1)=>{
   const todoHeader=document.createElement("div");
    todoHeader.classList.add("header")
   const todo=document.createElement("div")
     todo.classList.add("todo");
     
     const todoTitle=document.createElement("h3")
     todoTitle.innerText=text;
     todo.appendChild(todoTitle)
           
         
    
     const doneBtn=document.createElement("button");
     doneBtn.classList.add("finish-todo")
     doneBtn.innerHTML='<i class="bi bi-check2"></i>';
      todo.appendChild(doneBtn) 
    const progrecBtn=document.createElement("button");
     progrecBtn.classList.add("process-todo");
       progrecBtn.innerHTML='<i class="bx bx-pin"></i>';
         todo.appendChild(progrecBtn);
    const editBtn=document.createElement("button");
     editBtn.classList.add("edit-todo");
     editBtn.innerHTML='<i class="bi bi-pencil"></i>';
      todo.appendChild(editBtn)

   const deleteBtn=document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML='<i class="bi bi-trash"></i>';
      todo.appendChild(deleteBtn);
   const d=document.createElement("p");
      d.innerText=todoDesc;
    console.log(status)
    if(status==1){
       todo.classList.remove();
        todo.classList.add("done");
    }
    if(status==2){
        todo.classList.remove();
        todo.classList.add("process");
    }

   if(save){
     saveTarefa(text,todoDesc);
  
     loadAll();
   }
      
      todoList.appendChild(todoHeader);
      todoHeader.appendChild(todo);
       todoHeader.appendChild(d)
      todoInput.value="";
      desc.value="";
    
}
const toggleForms=()=>{
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}
const updateTodo=(textNew,descNew)=>{
   //seleciono todas a tarefas para fazer a verificação
   const todoList=document.querySelectorAll(".todo");
      todoList.forEach((todo)=>{

       let title=todo.querySelector("h3")
        if(title.innerText===oldInputValue){
            title.innerText=textNew;
            todo.parentElement.childNodes[1].innerText=descNew;
            update(oldInputValue,descNew)
         }
     })

}
 function searchList(text)
 {
    const todoList=document.querySelectorAll(".todo")
    todoList.forEach((item)=>{
        let title=item.querySelector("h3").innerText.toLocaleLowerCase();
        const titleNormal=text.toLocaleLowerCase();
        item.parentElement.style.display="flex";
         if(!title.includes(titleNormal)){
            /*item.style.display="none";*/
            item.parentElement.style.display="none";
         }
    })
 }
 function filterTodo(filter){
    const todo=document.querySelectorAll(".header");
     todo.forEach((todoList)=>{
      let list=todoList.querySelector(".todo");
            switch(filter){
     case "all":
        todoList.style.display="flex";
      break;
     case "done":
         list.classList.contains("done")?
         todoList.style.display="flex" : 
         todoList.style.display="none"
      break;
    case "todo":
      list.classList.contains("process")?
      todoList.style.display="flex" : 
      todoList.style.display="none";
       break;
   
   
      default:
        break;
   }
     });
 }

 function clearList()
 {
   const todo=document.querySelectorAll(".header");
    todo.forEach((item)=>{
        item.remove();
    })
 }
// Eventos


todoForm.addEventListener("click",(e)=>{
   e.preventDefault();
    const inputValue=todoInput.value;
    const descValue=desc.value;
    if(inputValue && descValue){
        saveTodo(inputValue,descValue);
    }
})
function reload(){
     todoList.replaceChildren([]);
}
//saber qual dos botões foi clicado
  document.addEventListener("click",(e)=>{
     const targetElement=e.target;
     const parentElement=targetElement.closest("div");
     const showTodo=parentElement.parentElement;
     let todoTitle;
     let desTodoList;
      //Pega a tarefa desejada..
     if(parentElement && parentElement.querySelector("h3")){
       todoTitle=parentElement.querySelector("h3").innerText;
       desTodoList=showTodo.childNodes[1].innerText;

   }
     
      if(targetElement.classList.contains("finish-todo")){
         parentElement.classList.add("done");
         updateStatus(todoTitle,1)
         loadAll();
         
      }
       if(targetElement.classList.contains("process-todo")){
         parentElement.classList.add("process");
          updateStatus(todoTitle,2)
          loadAll();
      }
      if(targetElement.classList.contains("remove-todo")){
         const m=parentElement.querySelector("h3").closest("div");
         m.parentElement.remove()
          deleteTarefa(todoTitle)
          loadAll();
          //deleTarefa(todoTitle);
         
      }
     
      if(targetElement.classList.contains("edit-todo")){
            toggleForms()
            todoForm.classList.toggle("hide");
            formTodo.classList.toggle("hide");
            editInput.value=todoTitle;
            oldInputValue=todoTitle;
            edit.value=desTodoList;
            oldDescValue=desTodoList;
      }
      if(targetElement.classList.contains("remove-all")){
           clearList()
           dropList()
           loadAll();
      }
     
     
  })
   
  editForm.addEventListener("submit",(e)=>{
     e.preventDefault();
      const ediInputValue=editInput.value;
      

       if(ediInputValue)
       {
         updateTodo(ediInputValue,edit.value)
         update(ediInputValue,edit.value)
       }      
       toggleForms()
  })

 

  cancelEditBtn.addEventListener("click",(e)=>{
     e.preventDefault();
     toggleForms()
  })

  searchInput.addEventListener("keyup",(e)=>{
     e.preventDefault();
      const search=e.target.value;
       searchList(search)
  })

  filterBtn.addEventListener("change",(e)=>{
     e.preventDefault();
      filterTodo(e.target.value)
  })
 
 menu.forEach((item)=>{
    item.addEventListener("click",activeMenu)
  })

 //LocalStorage
  function getTodo(){
       let listTarefa=[]
      if(localStorage.hasOwnProperty("tarefas")){
        listTarefa=JSON.parse(localStorage.getItem("tarefas"))
      }
     return listTarefa;
  }
  
  function loadAll(){
     reload();
      const all=getTodo();
      all.forEach((tarefas)=>{
        saveTodo(tarefas.tarefa,tarefas.desc,tarefas.status,save=0)
         switch(tarefas.status){
              case 1:
                  totInicializado=totInicializado+1;
                     break;
               case 2:
                     totOnProcess=totOnProcess+1;
                     break;
         }
        
      });
      //status do todo
      statusTudo[0].innerText=`Todos(${all.length})`;
      statusTudo[1].innerText=`Feitos(${totInicializado})`;
      statusTudo[2].innerText=`Em processo(${totOnProcess})`;
  }
  
 //save tarefas
   function saveTarefa(title,descTodo){

       const tarefas=getTodo();
       tarefas.push({tarefa:title,desc:descTodo,status:0});
       localStorage.setItem("tarefas",JSON.stringify(tarefas));
   } 
//delete All
   function dropList(){
      localStorage.clear();
   }
//delete item
   function deleteTarefa(titleTarefa){
      const list=getTodo();
      const filterList=list.filter((tarefas)=> tarefas.tarefa!=titleTarefa);
  localStorage.setItem("tarefas",JSON.stringify(filterList));

   }
//updateStatus
    function updateStatus(titleTodo,stat){
          const list=getTodo();
        
        list.map((tarefas)=>
         tarefas.tarefa===titleTodo && tarefas.status!=stat?tarefas.status=stat:tarefas.status=0
            );



      localStorage.setItem("tarefas",JSON.stringify(list));

    }
//update
     function update(titleTodo,descTodo){
         const list=getTodo();
   list.map((tarefas)=> tarefas.tarefa===oldInputValue
     ?(tarefas.tarefa=titleTodo,tarefas.desc=descTodo):null);
       localStorage.setItem("tarefas",JSON.stringify(list))
    }
   
loadAll();
