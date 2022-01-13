package com.prashant.restwebservicese.restfulwebservices.todo;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
	
	@PutMapping("user/{username}/todos/{id}")
	public ResponseEntity<Todo> updateDetails(@PathVariable String username, @PathVariable long id,@RequestBody Todo todo) {
		todo.setUsername(username);
		Todo todo_updated = todoService.save(todo);
		return new ResponseEntity<Todo>(todo,HttpStatus.OK);
	}
	@PostMapping("user/{username}/todos")
	public ResponseEntity<Todo> saveDetails(@PathVariable String username,
			@RequestBody Todo todo){
		todo.setUsername(username);
		Todo todo_saved = todoService.save(todo);
		
		//We are sending back the resource location that has been created just now back to the user 
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(todo.getId())
		.toUri();
		return ResponseEntity.created(uri).build(); //Using static method to send back the status code 
	}
}
