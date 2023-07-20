import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-header',
  template: `
    <div class="d-flex align-items-center h-100">
      <!-- Tạo thẻ span: định danh 1 phần nhỏ -->
      <span class="icon-wrapper h-100 text-center">
          <!-- Event Binding hàm toggleAll() khi click -->
          <i class="eva eva-chevron-down" (click)="toggleAll()"></i>
      </span>
      <!-- Gọi đến TodoInputComponent -->
      <app-todo-input></app-todo-input>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private todoService: TodoService){
  }

  toggleAll(){
    // Gọi đến toggleAll() trong TodoService
    this.todoService.toggleAll();
  }
}
