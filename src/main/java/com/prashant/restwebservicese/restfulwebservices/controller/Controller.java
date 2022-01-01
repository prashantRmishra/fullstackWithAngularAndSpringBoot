package com.prashant.restwebservicese.restfulwebservices.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Controller {

	
	@GetMapping("/hello-world")
	public String getMethod() {
		return "Welcome to the todo page !!";
	}
}
