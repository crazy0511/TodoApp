import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Biến hasTodo$ để kiểm tra xem có todo không?
  public hasTodo$!: Observable<boolean>;

  constructor(private todoService: TodoService){}

  // Khởi tạo giá trị hasTodo$
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
