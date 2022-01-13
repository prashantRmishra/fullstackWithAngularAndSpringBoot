package com.prashant.restwebservicese.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class HardCodedTodoService {

	private static List<Todo> list = new ArrayList<>();
	private static int toDoCounter =0;
	
	static {
		list.add(new Todo(++toDoCounter,"sandeep mishra","Learn fullstack development ",new Date(),true));
		list.add(new Todo(++toDoCounter,"prashant mishra","Learn microservices ",new Date(),false));
		list.add(new Todo(++toDoCounter,"prashant mishra","Learn javascript and node.js",new Date(),false));
	}
	public List<Todo> findAllTodos(){
		return list;
	} 
	public Todo deleteTodoById(long id) {
		Todo todo  = findTodoById(id);
		if(todo==null) return null;
		else {
			list.remove(todo);
		}
		return todo;
	}
	public Todo findTodoById(long id) {
		
		for(Todo todo : list) {
			if(todo.getId()==id) {
				return todo;
			}
		}
		return null;
	}
	public Todo save(Todo todo) {
		if(todo.getId()==-1 || todo.getId()==0) { //-1 means save operation
			todo.setId(++toDoCounter);
			list.add(todo);
		}
		else {
			deleteTodoById(todo.getId());
			list.add(todo);
		}
		return todo;
	}
}
