const app = {

    categoryList : [],

    init: function () {
        let taskList = document.querySelectorAll(
        ".task.task--todo, .task.task--complete"
        );

        for (taskIndex = 0; taskIndex < taskList.length; taskIndex++) {
            let task = taskList[taskIndex];

            app.addTaskEventListeners(task);
        }

        let addTaskForm = document.querySelector(".task.task--add");
        addTaskForm.addEventListener("submit", app.handleAddTaskForSubmit);

        app.loadCategories();

        app.loadTaskList();
    },

    displayEditForm: function (event) {
        let taskName = event.currentTarget;
        let task = taskName.closest(".task");

        task.classList.add("task--edit");
    },

    editTask: function (event) {
        if (event.type === "keydown" && event.keyCode !== 13) {
            return;
        }

        let editInput = event.currentTarget;
        let modifiedTaskName = editInput.value;
        let taskName = editInput.nextElementSibling;

        taskName.textContent = modifiedTaskName;

        let task = taskName.closest(".task");

        task.classList.remove("task--edit");
    },

    completeTask: function (event) {
        let completeButton = event.currentTarget;
        let task = completeButton.closest(".task");

        task.classList.replace("task--todo", "task--complete");
    },

    addTaskEventListeners: function (task) {
        let taskName = task.querySelector(".task__content__name");
        taskName.addEventListener("click", app.displayEditForm);

        let editButton = task.querySelector(".task__content__button__modify");
        editButton.addEventListener("click", app.displayEditForm);

        let editInput = task.querySelector('input[name="name"]');
        editInput.addEventListener("blur", app.editTask);
        editInput.addEventListener("keydown", app.editTask);

        let completeButton = task.querySelector(".task__content__button__validate");
        completeButton.addEventListener("click", app.completeTask);
    },

    handleAddTaskForSubmit: function (event) {
        event.preventDefault();

        let addTaskForm = event.currentTarget;
        let addTaskFormData = new FormData(addTaskForm);

        let newTaskName = addTaskFormData.get("name");
        let newTaskCategory = addTaskFormData.get("category");
        
        app.addTaskElement(newTaskName, newTaskCategory);

    },

    loadCategories : function(){
        fetch('https://benoclock.github.io/S07-todolist/categories.json')
        .then(
            function(response){
            return response.json();
        })
        .then(function(categoryList){

            for(category of categoryList){
                app.categoryList[category.id] = category;
            }
            return categoryList;

        })
        .then(function(categoryList){

            let selectElement = document.createElement('select');

            /**
             * Ajout d'un placeholder
             */
            // let selectPlaceholderElement = document.createElement('option');
            // selectPlaceholderElement.selected = true;
            // selectPlaceholderElement.disabled = true;
            // selectPlaceholderElement.style.display = 'none';
            // selectPlaceholderElement.textContent = 'Selectionner une catégorie';

            // selectElement.appendChild(selectPlaceholderElement);


            for (let categoryIndex = 0; categoryIndex < categoryList.length; categoryIndex++){
                
                let category = categoryList[categoryIndex];

                let optionElement = document.createElement('option');
                optionElement.textContent = category.name;
                optionElement.value = category.id;
                
                selectElement.appendChild(optionElement);
            }

            let filterBarElement = document.querySelector('.filters-bar__element.select');
            filterBarElement.appendChild(selectElement);

            let addTaskFromCategorySelectElement = selectElement.cloneNode(true);
            addTaskFromCategorySelectElement.name = 'category';

            let addTaskFromCategorySelectParent = document.querySelector('.task__content__category .select');
            addTaskFromCategorySelectParent.appendChild(addTaskFromCategorySelectElement);

        })
        .then(app.loadTaskList );
    },

    loadTaskList : function(){

        fetch('https://benoclock.github.io/S07-todolist/tasks.json')
        .then(function(response){
            return response.json();
        })
        .then(function(taskList){

            for(taskIndex = 0 ; taskIndex < taskList.length; taskIndex++){

                let task = taskList[taskIndex];
                
                app.addTaskElement(task.title, task.category_id, task.status);

            }; 

        })
    },

    addTaskElement : function(name, categoryId, status = 1){

        let emptyTaskTemplate = document.querySelector("#empty-task");
        let newTask = emptyTaskTemplate.content
        .querySelector(".task")
        .cloneNode(true);

        status = parseInt(status);
        if(status === 1){
            newTask.classList.add('task--todo');
        }else if(status === 2){
            newTask.classList.add('task--complete');
        }
      
        let newTaskNameElement = newTask.querySelector(".task__content__name p");
        newTaskNameElement.textContent = name;
      
        let newTaskEditInputElement = newTask.querySelector(
        '.task__content__name input[name="name"]'
        );
        newTaskEditInputElement.value = name;

        let category = app.categoryList[categoryId];
      
        let newTaskCategoryElement = newTask.querySelector(
        ".task__content__category p"
        );
        newTaskCategoryElement.textContent = category.name;
      
        app.addTaskEventListeners(newTask);

        let tasksContainer = document.querySelector("#tasks-container");
        tasksContainer.prepend(newTask);
      
      },
};

document.addEventListener("DOMContentLoaded", app.init);
