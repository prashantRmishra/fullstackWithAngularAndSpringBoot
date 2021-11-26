import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  constructor() { }

  todos = [
   new Todo(1,'learn to dance',false,new Date()),
   new Todo(2,'visit the entire universe',false,new Date())
  ]
  ngOnInit(): void {
  }

}
export class Todo {
  constructor(
    public id:number,
    public description:string,
    public done:boolean,
    public targetDate:Date
  ){

  }
}
