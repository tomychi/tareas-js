import { Todo } from "../classes";

import { todoList } from '../index'

// referencias en el HTML
const d = document,
    $divTodoList    = d.querySelector('.todo-list'),
    $txtInput       = d.querySelector('.new-todo'),
    $btnBorrar      = d.querySelector('.clear-completed'),
    $ulfiltros      = d.querySelector('.filters'),
    $anchorFiltros  = d.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
        <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' } />
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template" />
        </li>`;
    const $div = d.createElement('div');
    $div.innerHTML = htmlTodo;

    $divTodoList.append( $div.firstElementChild); // pone al div como primer hijo del <li>(abajo de el)</li>
    return $div.firstElementChild;
}

// Eventos
$txtInput.addEventListener('keyup', (e) =>{
    if(e.keyCode === 13 && $txtInput.value.length > 0 ) {
        const nuevoTodo = new Todo( $txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml(nuevoTodo);
        $txtInput.value = '';
    }
});

$divTodoList.addEventListener('click', e => {
    // console.log(e.target.localName)
    const $nombreElemento = e.target.localName, //input, label, button
        $todoElemento = e.target.parentElement.parentElement, //hacemos referencia al <li></li>
        todoId = $todoElemento.getAttribute('data-id');

    if ($nombreElemento.includes('input')){ // click en el check

        todoList.marcarCompletado(todoId);
        $todoElemento.classList.toggle('completed');

    }else if ($nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        $divTodoList.removeChild( $todoElemento );
    }
});


$btnBorrar.addEventListener('click', ()=>{
    todoList.eliminarCompletados();
    // empiezo en la ultimaposicion de la lista
    for (let i = $divTodoList.children.length - 1; i >= 0; i--) {
        const $elemento = $divTodoList.children[i]; // recupero todos <li></li>
        if ($elemento.classList.contains('completed')){
            $divTodoList.removeChild($elemento);
        }
    }
});

$ulfiltros.addEventListener('click', e => {
    const filtro = e.target.text;
    if(!filtro) { return; }

    $anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    e.target.classList.add('selected');


    for (const elem of $divTodoList.children) {
        // remueve por defecto
        elem.classList.remove('hidden');
        const completado = elem.classList.contains('completed');

        switch(filtro) {
            case 'Pendientes':
                if(completado) {
                    elem.classList.add('hidden');
                }
            break;
        
            case 'Completados':
                if(!completado) {
                    elem.classList.add('hidden');
                }
            break;
        }
    }
});



