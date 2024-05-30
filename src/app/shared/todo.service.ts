import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  firestore: Firestore = inject(Firestore);
  todoCollection = collection(this.firestore, 'todos');

  constructor() {}

  // Add a new todo item
  addTodo(title: string) {
    const newTodo = {
      title,
      completed: false,
    };
    addDoc(this.todoCollection, newTodo);
  }

  // Get all todos as an Observable
  getTodos(): Observable<any[]> {
    return collectionData(this.todoCollection, { idField: 'id' }) as Observable<
      any[]
    >;
  }

  // Update the status of a todo item
  updateTodoStatus(id: string, newStatus: boolean): Promise<void> {
    const todoRef = doc(this.firestore, 'todos', id);
    return updateDoc(todoRef, { completed: newStatus });
  }

  // Delete a todo item
  deleteTodo(id: string): Promise<void> {
    const todoRef = doc(this.firestore, 'todos', id);
    return deleteDoc(todoRef);
  }
}
