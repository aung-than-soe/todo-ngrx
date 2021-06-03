import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  getAllTodo(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${environment.BASE_URL}/todos?_limit=50`);
  }

  addTodo(todo: {userId: number, title: string, completed: boolean }) {
    return this.httpClient.post<Todo>(`${environment.BASE_URL}/todos`, todo);
  }

  updateTodo(todo: Todo) {
    return this.httpClient.put<Todo>(`${environment.BASE_URL}/todos/${todo.id}`, todo);
  }

  deleteTodo(id: number) {
    return this.httpClient.delete(`${environment.BASE_URL}/todos/${id}`);
  }
}
