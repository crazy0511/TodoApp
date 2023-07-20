import { Injectable, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable, ObservableLike } from 'rxjs';
import { Filter } from '../models/filter.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService{

  // Lấy ra các key trong LocalStorage
  // Được sử dụng để lưu trữ tên key để truy cập dữ liệu "to-do" trong localStorage
  private static readonly TodoStorageKey = "todos";

  private todos!: Todo[];
  // Mảng filterTodos
  private filterTodos!: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  // currentFilter = Filter.All
  private currentFilter!: Filter;

  // asObservable chỉ dùng để xem
  // todo$ = displayTodosSubject
  public todo$: Observable<Todo[]> = this.displayTodosSubject.asObservable();
  // length$ = lengthSubject
  public length$: Observable<number> = this.lengthSubject.asObservable();

  // Cập nhật dữ liệu Todo[] và length
  private updateTodosData(){
    // Phát ra một sự kiện (event) để thông báo rằng 
    // Danh sách các "todo" đã được cập nhật
    this.displayTodosSubject.next(this.filterTodos);
    // Số lượng "to-do" đã thay đổi
    this.lengthSubject.next(this.todos.length);
  }

  constructor(private storageService: LocalStorageService) {  }

  // Lấy tất cả todo từ LocalStorage
  fetchFromLocalStorage(){
    // Lấy Todo[] từ localStorage
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
    console.log(this.todos);

    // filterTodos = todos
    // thay đổi giá trị của mảng this.todos thì mảng this.filterTodos sẽ cập nhật theo
    this.filterTodos = [...this.todos];
    this.updateTodosData();
  }

  // Toggle all todos
  toggleAll(){
    // duyệt tất cả các todo có trong todos
    this.todos = this.todos.map(todo =>{
      return {
        ...todo,
        // Nếu tất cả đều đúng thì isCompleted = false
        // Nếu tất cả đểu sai thì isCompeted = true
        // Nếu 1 vài đúng thì isCompleted = true;
        isCompleted: !this.todos.every(t => t.isCompleted)
      }
    });
    console.log('Toggle all', this.todos);
    this.updateToLocalStorage();
  }

  // Add data
  addTodo(content: string){
    // Khởi tại id từ date
    const date = new Date(Date.now()).getTime();
    // Tạo newTodo 
    const newTodo = new Todo(date, content);
    // push newTodo vào todos
    this.todos.push(newTodo);
    // thực update data trong local storage
    console.log('add',this.todos);
    this.updateToLocalStorage();
  }

  // Update data
  updateToLocalStorage(){
    // Gọi hàm setObject từ LocalStorageService
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
    
    // Gọi hàm filterTodo truyền vào 
    // filter = this.currentFilter, isFiltering = false;
    this.filterTodo(this.currentFilter, false);

    // Cập nhật dữ liệu Todo[] và length
    this.updateTodosData();
  }

  // truyền vào filter = type
  filterTodo(filter: Filter, isFiltering: boolean = true){
    this.currentFilter = filter;
    console.log('Filter gần đây nhất', this.currentFilter);
    switch(filter){
      // TH1: filter = Filter.Active
      case Filter.Active:
        // filterTodos gồm todo thỏa mãn isComplelted = false
        this.filterTodos = this.todos.filter(todo => !todo.isCompleted);
        break;

      // TH2: filter = Filter.Completed
      case Filter.Completed:
        // filterTodos gồm todo thỏa mãn isComplelted = true
        this.filterTodos = this.todos.filter(todo => todo.isCompleted);
        break;

      // TH2: filter = Filter.All
      case Filter.All:
        this.filterTodos = [...this.todos];
        break;
    }
    console.log('currentFilter',this.currentFilter);

    // Nếu isFiltering = true thì Cập nhật dữ liệu Todo[] và length
    if(isFiltering){
      this.updateTodosData();
    }
    console.log('isFiltering', isFiltering);
  }

  // Thay đổi trang thái 
  changeTodoStatus(id: number, isCompleted: boolean){
    // Tìm todo có id tương ứng
    const index = this.todos.findIndex(t => t.id === id);
    console.log('index', index);

    // gọi todo có index cần tìm
    const todo = this.todos[index];
    console.log('todo cần tìm', todo);

    // gán lại isComppleted cho todo
    todo.isCompleted = isCompleted;
    // index: vị trí bắt đầu thêm phần tử
    // 1: 1 phần tử bị xóa từ vị trí index
    // todo: phần tử được thêm vào mảng
    // Xóa todo cũ thêm vào todo mới tại đúng vị trí đó
    this.todos.splice(index, 1, todo);
    // Thực hiện update Local Storage
    this.updateToLocalStorage();
  }

  // Thay đổi Todo
  editTodo(id: number, content: string){
    // Tìm index có id cần tìm
    const index = this.todos.findIndex(t => t.id === id);
    // Tìm todo có index tương ứng
    const todo = this.todos[index];
    // Tháy đổi content
    todo.content = content;
    // Tại vị trí thứ index 
    // Xóa 1 phần tử bắt đầu từ index
    // Thêm todo vào đó
    this.todos.splice(index, 1, todo);
    // update đến LocalStorage
    this.updateToLocalStorage();
  }

  // Xóa todo
  deleteTodo(id: number){
    // Tìm index có id đã cho
    const index = this.todos.findIndex(t => t.id === id);
    // Xóa đi todo tại vị trí index
    this.todos.splice(index, 1);
    this.updateToLocalStorage();
  }

  //Xóa todo item đã completed
  clearCompleted(){
    // Tìm todo thỏa mãn isComleted = false 
    this.todos = this.todos.filter(todo => !todo.isCompleted);
    this.updateToLocalStorage();
  }
}
