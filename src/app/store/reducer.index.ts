import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromTodo from './todo/todo.reducer';


export interface AppState {
  todo: fromTodo.TodoState
}

export const reducers: ActionReducerMap<AppState> = {
  todo: fromTodo.todoReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
