import { Todo } from "./todo.class";


export class TodoList {

    constructor() {

        // this.todos = []; xq si no existe lo crea el cargarLocalStorage
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ) {
        this.todos = this.todos.filter( todo => todo.id != id ) // excluye los id q son iguale
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {
        for(const todo of this.todos) {

            if(todo.id == id ) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break; // como no hay iguales id se sale
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado ); // todos los q no estan completados 
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify( this.todos )); // convimos en json
    }

    cargarLocalStorage() {
        this.todos = (localStorage.getItem('todo')) 
                    ?  JSON.parse(localStorage.getItem('todo')) 
                    :  [];
        // mapear el arreglo  y mutarlos
        this.todos = this.todos.map( Todo.fromJson);
    }
}

