import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos, renderPending } from './useCases';
import { Filters } from '../store/todo.store';


const ElementIDs = {
    clearCompleted: '.clear-completed',
    NewTodoInput:  '#new-todo-input', 
    PendingCountLabel: '#pending-count',
    TodoFilters: '.filtro',
    todoList: '.todo-list', 
}

/**
 * 
 * @param {Number} elementId 
 */
export const App = (  elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.todoList, todos );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending( ElementIDs.PendingCountLabel );
    }

    //Cuando la función App() se llama se ejecuta esta función.
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();

    // Referencias HTML
    const NewDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUl = document.querySelector( ElementIDs.todoList );
    const clearCompletedButton = document.querySelector( ElementIDs.clearCompleted );
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );

    // Listeners
    NewDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    })

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })

    todoListUl.addEventListener('click', (event) => {
        const isDestroyEleent = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if ( !element || !isDestroyEleent ) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
        
    })

    clearCompletedButton.addEventListener('click', (event) => {
        const isDestroyAllElement = event.target.className === 'clear-completed';
        if ( !isDestroyAllElement ) return;

        todoStore.deleteCompleted();
        displayTodos();
        
    })

    filtersLIs.forEach(element => {

        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch ( element.target.text ) {
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                    break
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                    break
            }

            displayTodos();
        });
    });
}