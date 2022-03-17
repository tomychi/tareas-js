export class Todo {
        // me permite recuperar los metodos q cree en la clase
    static fromJson( {id, tarea, completado, creado }) {
        // destructuracion
        const tempTodo = new Todo( tarea ); // crea una nueva instancia

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creaado = creado;

        return tempTodo;
    } 

    constructor(tarea){

        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }
}