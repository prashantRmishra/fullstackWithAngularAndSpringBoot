package com.prashant.restwebservicese.restfulwebservices.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TodoResource {

	@Autowired
	private HardCodedTodoService todoService;
	
	@GetMapping("user/{username}/todos")
	public List<Todo> getToDoList(@PathVariable String username){
		return todoService.findAllTodos();
	}
	
	@GetMapping("user/{username}/todos/{id}")
	public Todo getTodoById(@PathVariable String username, @PathVariable long id) {
		return todoService.findTodoById(id);
	}
	
	@DeleteMapping("user/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodoById(@PathVariable long id) {
		Todo todo = todoService.deleteTodoById(id);
		if(todo!=null) return ResponseEntity.noContent().build();
		
		//in case if todo is empty or null means the resource is not present then return notfound status
		return ResponseEntity.notFound().build();
	}
}
