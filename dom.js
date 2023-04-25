const tasks = [
    {
        id: '1138465078061',
        completed: true,
        text: 'Посмотреть новый урок по JavaScript',
    },
    {
        id: '1138465078062',
        completed: false,
        text: 'Выполнить тест после урока',
    },
    {
        id: '1138465078063',
        completed: false,
        text: 'Выполнить ДЗ после урока',
    },
];

const createTaskItem = (taskId, taskText, taskCompleted) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.taskId = taskId;
  
    const taskItemMainContainer = document.createElement("div");
    taskItemMainContainer.className = "task-item__main-container";
  
    const taskItemMainContent = document.createElement("div");
    taskItemMainContent.className = "task-item__main-content";
  
    taskItem.append(taskItemMainContainer);
    taskItemMainContainer.append(taskItemMainContent);
  
    const checkboxForm = document.createElement("form");
    checkboxForm.className = "checkbox-form";
  
  
    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.className = "checkbox-form__checkbox";
    const inputId = `tasks-${taskId}`;
    inputCheckbox.id = inputId;
    inputCheckbox.checked = taskCompleted;
  
    const labelCheckbox = document.createElement("label");
    labelCheckbox.htmlFor = inputId;
  
    const taskItemText = document.createElement("span");
    taskItemText.className = "task-item__text";
    taskItemText.innerText = taskText;
  
    const deleteButton = document.createElement("button");
    deleteButton.className =
      "task-item__delete-button default-button delete-button";
    deleteButton.innerText = "Удалить";
  
    taskItemMainContent.append(checkboxForm, taskItemText);
    checkboxForm.append(inputCheckbox, labelCheckbox);
    taskItemMainContainer.append(deleteButton);
  
    return taskItem;
  };
  const errorText = (message) => {

    const error = document.createElement("span");
    error.textContent = message;
  error.className = "error-message-block";
    return error}

  const tasksListContainer = document.querySelector(".tasks-list");
  const render =() =>{
    tasksListContainer.innerHTML =""
    tasks.forEach((task) => {
    const taskItem = createTaskItem(task.id, task.text, task.completed);
    tasksListContainer.append(taskItem)
  });
}
render();

const createForm = document.querySelector(`.create-task-block`);

createForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const textValue = event.target.taskName.value;
    
    const errorHTML = document.querySelector('.error-message-block')
    if(errorHTML) {
        errorHTML.remove();
    }
    if(textValue === "") {
       event.target.append(errorText('Название задачи не должно быть пустым'))
    }

    else if(tasks.some((task)=>task.text.toLowerCase() === textValue.toLowerCase())) {
        event.target.append(errorText('Название задачи не должно повторяться'))

} 
     else if (textValue) {
        tasks.push({id:Date.now(), completed: false, text: textValue });
        render()
     }
});

const modalHidden = document.createElement('div');
modalHidden.className = 'modal-overlay modal-overlay_hidden';
const bodyElement = document.querySelector(".tasks__wrapper")
bodyElement.append(modalHidden);
const deleteModal = document.createElement('div');
deleteModal.className = 'delete-modal';
modalHidden.append(deleteModal);
const deleteModalQ = document.createElement('h3');
deleteModalQ.className = 'delete-modal__question';
deleteModalQ.textContent = 
deleteModal.append(deleteModalQ);
const deleteModalButton = document.createElement('div');
deleteModalButton.className = 'delete-modal__buttons';
deleteModal.append(deleteModalButton);

const buttonNo = document.createElement('div');
buttonNo.className = 'delete-modal__button delete-modal__cancel-button';
buttonNo.textContent ='Отмена';
deleteModalButton.append(buttonNo);

const buttonYes = document.createElement('div');
buttonYes.className = 'delete-modal__button delete-modal__confirm-button';
buttonYes.textContent ='Удалить';
deleteModalButton.append(buttonYes);

const clickButton = document.querySelector(".tasks-list");
clickButton.addEventListener("click", (event) => {
    const idFind = event.target.closest('.task-item').dataset.taskId;
    modalHidden.className = 'modal-overlay';
    modalHidden.dataset.taskId = idFind;
    })

buttonNo.addEventListener("click", (event) => {
    modalHidden.className = 'modal-overlay modal-overlay_hidden';
    console.log('Отмена удаления')
})
buttonYes.addEventListener("click", (event) => {

    const element = event.target;
    console.log(element);
    const id = element.closest('.modal-overlay').dataset.taskId;
    console.log(id);
    const found = tasks.indexOf(tasks.find(task => task.id === id));
    const resultSplice = tasks.filter(task => task.id !== id);
    console.log(resultSplice);
    modalHidden.className = 'modal-overlay modal-overlay_hidden';
    const render =() =>{
        const tasksListContainer = document.querySelector(".tasks-list");
        tasksListContainer.innerHTML =""
        resultSplice.forEach((task) => {
        const taskItem = createTaskItem(resultSplice.id, resultSplice.text, resultSplice.completed);
        tasksListContainer.append(taskItem)
        console.log(taskItem)
      });}
      render();
        })
    
