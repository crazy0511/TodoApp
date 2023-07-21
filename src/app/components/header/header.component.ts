import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
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
