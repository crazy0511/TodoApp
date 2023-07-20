import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-input',
  template: `
    <!-- two-way binding để kết nối todoContent ts <=> html -->
    <!-- Sử dụng sự kiện keyup.enter để bắt sự kiện khi người dùng bấm phím "Enter" trên bàn phím. -->
    <!-- Khi ấn Enter thực hiện hàm onSubmit()  -->
    <input
      type="text"
      [(ngModel)]="todoContent"
      (keyup.enter) = "onSubmit()"
      class="w-100 h-100"
      placeholder="What needs to be done?"
      required
    />
  `,
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
