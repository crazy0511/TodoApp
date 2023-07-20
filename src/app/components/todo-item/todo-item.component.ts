import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

// Hiệu ứng gạch chân khi completed
const fadeStrikeThroughAnimation = trigger('fadeStrikeThrough', [
  state('active', style({
    fontSize: '18px',
    color: 'black'
  })),
  state('completed', style({
    fontSize: '17px',
    color: 'lightgrey',
    textDecoration: 'line-through'
  })),
  transition('active <=> completed', [animate(250)])
])

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  animations: [fadeStrikeThroughAnimation]
})
export class TodoItemComponent{
  // Nhận giá trị todo từ todo-list component
  @Input() todo!: Todo;

  // Conponent con tạo sự kiện để component cha nhận
  // Phát ra sự kiện changeStatus
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  
  // Phát ra sự kiện editTodo
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  
   // Phát ra sự kiện deleteTodo
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  // isHovered là kiểm tra xem có hover không?
  isHovered = false;

  // isEditing là kiểm tra xem có cần edit không?
  isEditing = false;

  // Thay đổi trạng thái của todo sau khi tích checkbox
  changeTodoStatus(){
    // Phát ra todo với isComleted: true -> false, false -> true
    const newTodo = {...this.todo, isCompleted: !this.todo.isCompleted};
    console.log('Emitting todo:', newTodo);
    this.changeStatus.emit(newTodo);
  }

  // Khi người dùng nhả phím
  submitEdit(event: KeyboardEvent){
    // Gán keyCode = event.keyCode
    const {keyCode} = event;

    // Gọi phương thức preventDefault() để ngăn chặn 
    // hành vi mặc định của trình duyệt khi người dùng nhấn phím
    event.preventDefault();
    console.log('isEditing trước khi ấn Enter', this.isEditing);
    const enterKey = 13
    // Nếu keyCode là phím Enter
    if(keyCode === enterKey){
      // sự kiện editTodo phát ra todo
      this.editTodo.emit(this.todo);
      // tắt form sửa
      this.isEditing = false;
      console.log('isEditing sau khi ấn Enter', this.isEditing);
    }
  }

  // sự kiện deleTodo phát ra todo
  removeTodo(){
    this.deleteTodo.emit(this.todo);
  }
}
