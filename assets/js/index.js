var listKeys = {
  todoList: 'todo'
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
};

var todoElements = document.querySelector('.js-list-todo');

function randomId() {
  var id = Math.random();
  return id;
}
function addTodo() {
  
  var inputTodoElm = document.getElementById('js-input');
  var getContent = inputTodoElm.value;
  var todo = getStorage(listKeys.todoList) || [];
  var todoItem = {
    id: randomId(),
    text: getContent,
  };
  if (todo) {
    todo.push(todoItem);
  }
  setStorage(listKeys.todoList,todo);
  renderTodo(todoItem);
  inputTodoElm.value = '';
}
function renderTodo(element) {
  var todoItem = document.createElement('li');
  todoItem.classList.add('js-list-item');
  todoItem.id = element.id;
  
  var divContent = document.createElement('div');
  divContent.className = 'input-container';
  divContent.addEventListener('click', function(e) { 
    activeTodo(element.id);
  })

  var spanContent = document.createElement('input');
  spanContent.type = 'text';
  spanContent.disabled = true;
  spanContent.classList.add('js-content');
  spanContent.placeholder = element.text;
  spanContent.id = `js-edit-${element.id}`;
  spanContent.setAttribute('js-input',element.id);
  
  var buttonRemove = document.createElement('button');
  buttonRemove.classList.add('btn', 'js-btn-remove', 'btn-secondary');
  buttonRemove.setAttribute('js-remove-id',element.id);
  buttonRemove.innerHTML = '<i class="fas fa-backspace"></i>';
  buttonRemove.addEventListener('click',function(e) {
    removeTodo(element.id);
  });
  var buttonEdit = document.createElement('button');
  buttonEdit.classList.add('btn', 'js-btn-edit', 'btn-secondary');
  buttonEdit.setAttribute('js-edit-id', element.id);
  buttonEdit.innerHTML = '<i class="fas fa-edit"></i>'
  buttonEdit.addEventListener('click', function(e) {
    editTodo(element.id)
  })

  todoItem.appendChild(divContent);
  todoItem.appendChild(buttonEdit);
  todoItem.appendChild(buttonRemove);
  divContent.appendChild(spanContent);
  todoElements.appendChild(todoItem);
}

function renderListTodo() {
  var todo = getStorage(listKeys.todoList) || [];
  if(todo) {
    todo.forEach(function(element) {
      renderTodo(element);
    })
  }
}

function removeTodo(id) {
  var todo = getStorage(listKeys.todoList) || {};
  var index = todo.findIndex(function(element) {
    return element.id === id;
  })
  todo.splice(index,1)
  setStorage(listKeys.todoList,todo);
  var removeElement = document.getElementById(id);
  if (removeElement) {
    removeElement.remove();
  }
}

var buttonForm = document.getElementById('js-button');
  buttonForm.addEventListener('click', function (e){
  e.preventDefault();
  addTodo();
});


function editTodo(id) {
  var todo = getStorage(listKeys.todoList) || {};
  var ideElm = document.getElementById(`js-edit-${id}`);
  if (ideElm.disabled === true) {
    ideElm.disabled = !ideElm.disabled;
  }
  else {
    ideElm.disabled = !ideElm.disabled;
    var index = todo.findIndex(function(element) {
      return element.id === id;
    })
    if(ideElm.value) {

      var todoItem = {
        id: id,
        text: ideElm.value,
      };
      if (todo) {
        todo[index] = todoItem;
      }
    }
  }
  setStorage(listKeys.todoList,todo);
}

function activeTodo(id) {
  var todo = getStorage(listKeys.todoList) || {};
  var inputElements = document.querySelectorAll('.js-list-item');
  var index = todo.findIndex(function(element) {
    return element.id === id;
  })
  if(inputElements[index].classList.contains('js-text')){
    inputElements[index].classList.remove('js-text')
  }
  else {
    inputElements[index].classList.add('js-text');
  }
 
}


renderListTodo();
