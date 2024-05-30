import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styles: [],
})
export class TodoComponent implements OnInit {
  todos$: Observable<any[]> | undefined;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService
      .getTodos()
      .pipe(map((todos) => todos.sort((a, b) => a.completed - b.completed)));
  }

  onClick(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.todoService.addTodo(titleInput.value);
      titleInput.value = '';
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }

  onDelete(id: string) {
    this.todoService.deleteTodo(id);
  }
}
