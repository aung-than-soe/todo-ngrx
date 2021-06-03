import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as TodoActions from './todo.actions';
import { Todo } from 'src/app/models/todo.model';

export const todoFeatureKey = 'todo';

export interface TodoState extends EntityState<Todo> {
  error: { statusCode: number, statusText: string } | null;
}

const selectTodoId = (a: Todo): number => a.id;

const sortById = (a: Todo, b: Todo): number => {
 if(a.id < b.id) return -1;
 if(a.id > b.id) return 1;
 return 0;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: selectTodoId,
  sortComparer: sortById,
});

export const initialState: TodoState =  adapter.getInitialState({
  entities: [],
  error: null,
  ids: []
})

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodosSuccess, (state, {data}) => adapter.setAll(data, state)),
  on(TodoActions.loadTodosFailure, (state, {error }) => ({...state, error })),
  on(TodoActions.addTodo, (state, {data}) => adapter.addOne(data, state)),
  on(TodoActions.updateTodo, (state, {data}) => adapter.upsertOne(data, state)),
  on(TodoActions.deleteTodo, (state, {id}) => adapter.removeOne(id, state))
);
