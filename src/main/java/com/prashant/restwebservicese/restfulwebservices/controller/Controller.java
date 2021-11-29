package com.prashant.restwebservicese.restfulwebservices.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

	
	@GetMapping("/hello-world")
	public String getMethod() {
		return "Hello world";
	}
}
