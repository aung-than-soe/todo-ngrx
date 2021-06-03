import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ data: Todo[] }>());
export const loadTodosFailure = createAction('[Todo] Load Todos Failure', props<{ error: { statusCode: number, statusText: string } }>());

export const onAddTodo = createAction('[Todo] On adding Todo', props<{ data: { userId: number, title: string, completed: boolean } }>());
export const addTodo = createAction('[Todo] Add Todo', props<{ data: Todo }>());
// export const addTodoFailure = createAction('[Todo] Add Todo Failure', props<{error: { statusCode: number, statusText: string}}>());

export const onUpdateTodo = createAction('[Todo] On update Todo', props<{data: Todo}>());
export const updateTodo = createAction('[Todo] Update Todo', props<{ data: Todo }>());

export const onDeleteTodo = createAction('[Todo] On Delete Todo', props<{id: number}>());
export const deleteTodo = createAction('[Todo] Delete Todo', props<{id: number}>());
