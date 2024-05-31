import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styles: [],
})
export class TodoComponent implements OnInit {
  todos$: Observable<any[]> | undefined;
  todoList: any[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
    this.todos$.subscribe((data) => {
      this.todoList = data.sort((a: any, b: any) => {
        // Sort by completion status (true first, false last)
        if (a.completed === b.completed) {
          // If completion status is the same, sort alphabetically by title
          return a.title.localeCompare(b.title);
        }
        return a.completed ? -1 : 1; // Sort completed items first
      });
    });
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
