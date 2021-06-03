import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import * as TodoActions from './todo.actions';
import { TodoService } from '../../services/todo.service';

@Injectable()
export class TodoEffects {

  constructor(private actions$: Actions, private todoService: TodoService) {}

  onInit$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(_ => TodoActions.loadTodos())
  ), {useEffectsErrorHandler: false })


  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.loadTodos),
    mergeMap(_ => this.todoService.getAllTodo().pipe(
      map(todos => TodoActions.loadTodosSuccess({data: [...todos]})),
      catchError((error: HttpErrorResponse) => {
        const { status, statusText } = error;
        return of(TodoActions.loadTodosFailure({error: { statusCode: status, statusText}}))
      })
    )),
  ))

  onAddTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.onAddTodo),
    switchMap(({data}) => this.todoService.addTodo(data).pipe(
      map(res => TodoActions.addTodo({data: res})),
      catchError(err => throwError(err))
    ))
  ))

  onUpdateTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.onUpdateTodo),
    mergeMap(({data}) => this.todoService.updateTodo(data).pipe(
      map(res => TodoActions.updateTodo({data: res})),
      catchError(err => throwError(err))
    ))
  ))

  onDeleteTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.onDeleteTodo),
    switchMap(({id}) => this.todoService.deleteTodo(id).pipe(
      map(res =>TodoActions.deleteTodo({id})),
      catchError(err => throwError(err))
    ))
  ))

}
