import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  template: `
    <!-- Gọi đến từng todo-item component -->
    <!-- Truyền giá trị của todo vào component <app-todo-item> -->
    <!-- Đăng ký sự kiện changeStatus cho component <app-todo-item> -->
    <!-- Đăng ký sự kiện editTodo cho component <app-todo-item> -->
    <!-- Đăng ký sự kiện deleteTodo cho component <app-todo-item>. -->
    <app-todo-item
      *ngFor="let todo of todos$ | async"
      [todo]="todo"
      (changeStatus)="onChangeTodoStatus($event)"
      (editTodo)="onEditTodo($event)"
      (deleteTodo)="onDeleteTodo($event)"
    >
    </app-todo-item>
  `
})
export class TodoListComponent implements OnInit {
  public todos$!: Observable<Todo[]>;

  constructor(private todoService: TodoService){}

  // todo$ =  todo$ ở ToDoService
  ngOnInit(): void {
      this.todos$ = this.todoService.todo$;
  }

  // Nhận sự kiện changeStatus thực hiện hàm onChangeTodoStatus()
  // Nhận vào todo mới là $event = todo ở bên todo-item
  // Sau đó thực hiện changeTodoStatus ở TodoService
  onChangeTodoStatus(todo: Todo){
    // Truyền vào tham số id, isCompleted
    this.todoService.changeTodoStatus(todo.id, todo.isCompleted);
  }

  // Nhận sự kiện editTodo thực hiện hàm onEditTodo
  // Truyền vào todo
  onEditTodo(todo: Todo){
    // Thực hiện hàm editTodo của TodoService
    // Truyền vào id, content
    this.todoService.editTodo(todo.id, todo.content);
  }

  // Nhận sự kiện deleteTodo thực hiện hàm onDeleteTodo
  onDeleteTodo(todo: Todo){
    // Thưc hiện hàm deleteTodo của TodoService
    // Truyền vào id
    this.todoService.deleteTodo(todo.id);
  }
}
