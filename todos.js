var listElement = document.querySelector('#app ul')
var inputElement = document.querySelector('#app input')
var buttonElement = document.querySelector('#app button')

var todos = JSON.parse(localStorage.getItem('list_todos')) || []
//se nao retornar nada do json.parse, todos recebe array vazio

function renderTodos(){
    listElement.innerHTML = '' //para nao repetir
    for (todo of todos){
        var todoElement = document.createElement('li')
        var todoText = document.createTextNode(todo)
        var paragraph = document.createElement('p')
        paragraph.appendChild(todoText)

        var checkElement = document.createElement('div')
        checkElement.setAttribute('class', 'check')
        
        var pos = todos.indexOf(todo)
        checkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')')

        todoElement.appendChild(checkElement)
        todoElement.appendChild(paragraph)
        listElement.appendChild(todoElement)
        
    }
}

renderTodos()

function addTodo(){
    var todoText = inputElement.value

    todos.push(todoText)
    inputElement.value = ''
    renderTodos()
    saveToStorage()
}

buttonElement.onclick = () => { 
    if (inputElement.value != "")
        addTodo()
}

inputElement.addEventListener("keyup", function(event) { //da enter no input
    if (event.keyCode === 13 && inputElement.value != "")
        addTodo()
});    

function deleteTodo(pos) {
    todos.splice(pos, 1) //remove 1 item do array baseado na posicao
    renderTodos()
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('list_todos', JSON.stringify(todos))
}
