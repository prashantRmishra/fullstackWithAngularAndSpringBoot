import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  getAllTodos(username: any){
    return this.http.get<Todo[]>(`http://localhost:8080/user/${username}/todos`);
  }

  deleteTodoById(username:any,id:number){
    return this.http.delete<any>(`http://localhost:8080/user/${username}/todos/${id}`);
  }

  getTodoById(username:any,id:number){
    return this.http.get<Todo>(`http://localhost:8080/user/${username}/todos/${id}`);
  }
  updateTodoById(username:any,id:number,todos:Todo){
    return this.http.put<Todo>(`http://localhost:8080/user/${username}/todos/${id}`,todos);
  }
  insertTodoById(username:any,todos:Todo){
    return this.http.post<Todo>(`http://localhost:8080/user/${username}/todos`,todos);
  }
}
