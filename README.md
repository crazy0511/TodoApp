1. models
- filter:
    + FilterButton: type, label, isActive
    + Filter: All, Completed, Active
- todo:
    + Todo: id, content, isCompleted

2. services
- local-storage: lấy dữ liệu từ local-storage
- todo: 
    + variable:
        + private: todos (Todo[]), filterTodos(Todo[]), lengthSubject(number), displayTodosSubject(Todo[]), currentFilter(Filter)
        + public: todo$ = displayTodosSubject, length$ = lengthSubject

3. app

4. components
- header: 
    + toggleAll
    + <app-todo-input>
- todo-input:
    + Khi ấn Enter: gọi hàm onSubmit()
- todo-list:
+ Gọi đến *ngFor <app-todo-item>
    + Nhận sự kiện changeStatus từ todo-item -> return Todo
    + Nhận sự kiện editTodo từ todo-item -> return Todo
    + Nhận sự kiện deleteTodo từ todo-item -> return Todo
- todo-item




