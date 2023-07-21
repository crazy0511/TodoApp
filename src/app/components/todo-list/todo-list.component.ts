import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
  
})
export class TodoListComponent implements OnInit {
  // Sử dụng todo$ từ todo$ của TodoService
  public todos$!: Observable<Todo[]>;

  constructor(private todoService: TodoService){}

  // todo$ =  todo$ ở ToDoService
  ngOnInit(): void {
      this.todos$ = this.todoService.todo$;
  }

  // Nhận sự kiện changeStatus thực hiện hàm onChangeTodoStatus()
  // Nhận vào todo mới là $event = newTodo ở bên todo-item
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
