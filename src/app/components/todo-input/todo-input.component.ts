import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent {
  // [(ngModel)]="todoContent" nhận giá trị nhập
  todoContent = '';

  constructor(private todoService: TodoService){}
  
  onSubmit(){
    // Nếu nhập chuỗi khác rỗng thì thực hiện addTodo từ TodoService
    if(this.todoContent.trim() !== ''){
      // Truyền vào tham số this.todoContent
      this.todoService.addTodo(this.todoContent);
      // Sau khi add khởi tạo todoContent = ''
      this.todoContent = '';
    }
  }
}
