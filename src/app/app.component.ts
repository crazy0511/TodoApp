import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <!-- Thẻ HTML của AppComponent -->
    <!-- Khung làm việc -->
    <div class="wrapper d-flex flex-column align-items-center w-100">
      <!-- Dòng chữ TodoApp được CSS từ class: title -->
      <h1 class="title">TodoApp</h1>
      <!-- Main -->
      <div class="row justify-content-center w-100">
        <!-- Main được CSS bằng class: todo-wrapper -->
        <div class="todo-wrapper p-0 d-flex flex-column col-md-6 col-sm-8">
          <!-- Thẻ app-header được CSS từ .todo-wrapper app-header  -->
          <app-header></app-header>
          <app-todo-list></app-todo-list>
          <!-- async được sử dụng để đăng ký theo dõi sự thay đổi của biến hasTodo$ -->
          <!-- nếu hasTodo$ = true thì chạy <app-footer> -->
          <app-footer *ngIf="hasTodo$ | async"></app-footer>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Biến hasTodo$ để kiểm tra xem có todo không?
  hasTodo$!: Observable<boolean>;

  constructor(private todoService: TodoService){
  }

  ngOnInit(): void {

    // Gọi hàm fetchFromLocalStorage() từ TodoService
    // Có chức năng là lấy Todo[] từ localStorage, 
    // Gán filterTodos = todos
    // Cập nhật dữ liệu Todo[] và length
    this.todoService.fetchFromLocalStorage();
    // pipe length$ từ number thành boolean
    // Nếu leng > 0 -> true
    // this.todoService.length$.subscribe((data) => {
    //   console.log('length', data);
    // });
    this.hasTodo$ = this.todoService.length$.pipe(map(length => length > 0));
    // this.hasTodo$.subscribe((data) => {
    //   console.log('hasTodo', data);
    // })
  }
}
