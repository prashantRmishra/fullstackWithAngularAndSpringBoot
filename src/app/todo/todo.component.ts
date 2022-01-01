import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { ToDoService } from '../service/data/to-do.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(
    private router:ActivatedRoute,
    private todoService:ToDoService
  ) { }


  todo!: Todo;
  id!: number;
  
  ngOnInit(): void {
    this.id = this.router.snapshot.params["id"];
    this.todo = new Todo(1,"",false,new Date());
    this.todoService.getTodoById("prashant",this.id).subscribe(
      todo =>{
        this.todo=todo;
      }
    );
  }

}
