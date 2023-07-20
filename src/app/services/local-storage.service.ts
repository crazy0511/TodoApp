import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // Khai báo localStorge
  storage: Storage;
  constructor() {
    this.storage = window.localStorage; 
  }

  // Dùng để lấy tất cả các giá trị có trong localStorage
  // Nhận vào tham số key: string 
  // Sử dụng phương thức JSON.parse() để chuyển đổi giá trị được lấy từ localStorage thành một object JavaScript
  // Trả về 1 obj kiểu T -> Todo[]
  getValue<T>(key:string): T{
    const obj = JSON.parse(this.storage[key] || null);
    return <T>obj;
  }

  // Tạo Object mới
  setObject(key:string, value:Todo[]): void{
    if(!value){
      return;
    }
    // Phương thức này sử dụng phương thức JSON.stringify() 
    // để chuyển đổi đối tượng thành một chuỗi JSON trước khi lưu trữ
    this.storage[key] = JSON.stringify(value);
  }

  set(key:string, value: string): void{
    this.storage[key] = value;
  }

  get(key:string, value: any): void{
    return this.storage[key] || false;
  }

  // Dùng
  getObject(key:string): any{
    return JSON.parse(this.storage[key] || '{}');
  }

  remove(key: string): any{
    this.storage.removeItem(key);
  }

  clear(){
    this.storage.clear();
  }

  get length(): number{
    return this.storage.length;
  }

  get isStorageEmpty(): boolean{
    return this.storage.length === 0; 
  }
}
