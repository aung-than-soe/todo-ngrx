import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TodoActions from './store/todo/todo.actions';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Todo } from './models/todo.model';
import { AppState } from './store/reducer.index';
import { selectAllTodos } from './store/todo/todo.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todos$!: Observable<Todo[]>;

  @ViewChild('input') inputEle!: ElementRef<HTMLInputElement>;

  @ViewChild('edit')
  editInputEle!: ElementRef<HTMLInputElement>;

  editId: number = 0;
  editOrSave: boolean = true;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.todos$ = this.store.select(selectAllTodos).pipe(distinctUntilChanged());
  }

  trackById(index: number | string, todo: Todo) {
    return todo.id
  }

  onAdd(val: string) {
    if (!val) {
      return;
    }
    this.store.dispatch(
      TodoActions.onAddTodo({
        data: { userId: 1, title: val, completed: false },
      })
    );
    this.inputEle.nativeElement.value = '';
  }

  onEditOrSave(todo: Todo): void {

    if (this.editOrSave) {
      this.editId = todo.id;
      this.editInputEle.nativeElement.value = todo.title;
    } else {
      this.editId = 0;
      this.store.dispatch(TodoActions.onUpdateTodo({data: {...todo, title: this.editInputEle.nativeElement.value}}))
    }
    this.editOrSave = !this.editOrSave;

  }

  onCheck(event: any, t: Todo): void {
    this.store.dispatch(TodoActions.onUpdateTodo({data: {...t, completed: event.target.checked}}))
  }

  onCancel() {
    this.editId = 0;
  }

  onDelete(id: number) {
    this.store.dispatch(TodoActions.onDeleteTodo({id}));
  }
}
