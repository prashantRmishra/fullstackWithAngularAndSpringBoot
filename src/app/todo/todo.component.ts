import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private todoService:ToDoService,
    private route: Router
  ) { }


  todo!: Todo;
  id!: number;
  message:any="";
  ngOnInit(): void {
    this.id = this.router.snapshot.params["id"];
    this.todo = new Todo(this.id,"",false,new Date());
    if(this.id!=-1){
      this.todoService.getTodoById("prashant",this.id).subscribe(
        todo =>{
          this.todo=todo;
        }
      );
    }
  }
  updateTodoDetails(){
    if(this.id === -1){
      this.todoService.insertTodoById("prashant",this.todo).subscribe(response=>{
        console.log(response);
        this.route.navigate(['todos']);
  
      });
    }
    else{
      this.todoService.updateTodoById("prashant",this.id,this.todo).subscribe(response=>{
        console.log(response);
        this.route.navigate(['todos']);
  
      });
    }
  
  }
 

}
