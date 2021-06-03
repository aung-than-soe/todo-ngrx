import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromTodo from './todo.reducer';

export const selectTodoState = createFeatureSelector<fromTodo.TodoState>(fromTodo.todoFeatureKey);


// ngrx/entity built-in functions
const {
  selectAll,
  selectIds,
  selectTotal,
  selectEntities
} = fromTodo.adapter.getSelectors();

// select the array of todo ids
export const selectTodoIds = createSelector(selectTodoState, selectIds);

// select the dictionary of todo entities
export const selectTodoEntities = createSelector(selectTodoState, selectEntities);

// select the array of todos
export const selectAllTodos = createSelector(selectTodoState, selectAll);

// select the total todo count
export const selectTodoTotal = createSelector(selectTodoState, selectTotal);

export const selectTodoById = (id: number) => createSelector(selectTodoEntities, entities => entities[id]);
