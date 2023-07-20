import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Filter, FilterButton } from 'src/app/models/filter.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy{
  public filterButtons: FilterButton[] = [
    {type: Filter.All, label: 'All', isActive: false},
    {type: Filter.Active, label: 'Active', isActive: false},
    {type: Filter.Completed, label: 'Completed', isActive: false},
  ]

  public length = 0; 
  public hasCompletes$!: Observable<boolean>;
  public destroy$: Subject<null> = new Subject<null>();

  constructor(private todoService: TodoService){}

  // Khởi tạo giá trị hasCompletes$ và length
  ngOnInit(){
    // map đến từng todo nếu có 1 công việc hoàn thành thì 
    // hasCompletes$ = true;
    // Được sử dụng để hủy bỏ subscription của this.hasCompletes$ 
    // khi observable this.destroy$ phát ra giá trị.
    this.hasCompletes$ = this.todoService.todo$.pipe(
      map(todo => todo.some(t => t.isCompleted)),
      takeUntil(this.destroy$)
    );

    // this.hasCompletes$.subscribe((hasCompletes: boolean) => {
    //   console.log('Giá trị của hasCompletes là: ', hasCompletes);
    // });
    

    // this.todoService.length$ phát ra giá trị mới,
    // subscriber sẽ được gọi và giá trị mới này sẽ 
    // được gán cho biến this.length.
    this.todoService.length$.pipe(takeUntil(this.destroy$))
      .subscribe(length => {
        this.length = length;
      })
  }

  // Tại mỗi button khi ta click thì sẽ thực hiện hàm filter
  // Truyền vào 1 type
  filter(type: Filter){
    // Thực hiện hàm setActiveFilterBtn
    // Truyền vào 1 type
    // Khi click vào button nào thì isActice = true
    this.setActiveFilterBtn(type);
    // thực hiện hàm filterTodo của TodoService
    this.todoService.filterTodo(type);
  }  

  // Set is Active cho các Filter Button
  private setActiveFilterBtn(type: Filter){
    console.log('-----------------');
    this.filterButtons.forEach(btn => {
      // for tất cả các filterButtons 
      // isActive = true nếu btn.type === type
      btn.isActive = btn.type === type;
      console.log('isActive', btn.type, btn.isActive);
    });
  }


  //Thực hiện hàm clearCompleted() trong ToDoService
  clearCompleted(){
    this.todoService.clearCompleted();
  }

  

  // Destroy khi không có Task nào
  ngOnDestroy(){
      this.destroy$.next;
      this.destroy$.complete();
  }
}

