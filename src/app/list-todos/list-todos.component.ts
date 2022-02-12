import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from '../service/data/to-do.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  constructor(private todoService: ToDoService,
    private router:Router) { }

  todos : Todo[]=[]
  message ="";
  ngOnInit(): void {
   this.refreashContent();
  }
  refreashContent(){
    this.todoService.getAllTodos("prashant").subscribe(todo=>{
      for(let e of todo){
        console.log(e)
      this.todos.push(e);
      }
     })
  }

  deleteTodo(id:number){
    this.todoService.deleteTodoById("prashant",id).subscribe(e=>{
      this.todos.length=0;
      this.refreashContent();
      this.message = `Row ${id} has been deleted `
    });
  }
  updateTodoById(id:number){
    this.router.navigate(["todo",id]);
  }
  addTodo(){
    this.router.navigate(['todo',-1])
  }
}
export class Todo {
  constructor(
    public id:number,
    public description:string,
    public isDone:boolean,
    public tagetDate:Date
  ){

  }
 
}
