Tips
---
1. If we are not using ``ResponseEntity<>`` in return type of our controller methods then the default return status is success.
Hence in the ``@GetMapping`` of ``getToDoList()`` method you can see we have not specified the ``ResponseEntity`` as the default return status is ``200`` which is success. 
<br>
As we can see the delete method from the ``TodoResource.java`` class

**Important**

```java
	@DeleteMapping("user/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodoById(@PathVariable long id) {
		Todo todo = todoService.deleteTodoById(id);
		if(todo!=null) return ResponseEntity.noContent().build();
		
		//in case if todo is empty or null means the resource is not present then return notfound status
		return ResponseEntity.notFound().build();
	}
```
2. To send some bean or object back to the front end you have to use ``new ResponseEntity<TypeOfObject>(object,HttpStatus.OK)``.
But if you just want to send the status code back to the frontend you can directly use the static method of the ``ResponseEntity`` like :

```java
ResponseEntity.noContent().build(); //200 success
ResponseEntity.created().build(); //201 created
ResponseEntity.notFound().build(); //404 not found
```

3. Best practices for designing REST web services <br>

	1.Consumer First
	2.Make best use of HTTP methods
	3.Use proper response status like
		200:Success
		400:Bad request
		404:Resource not found
		201:Created
		401:Unauthorized
		500:Internal server error
	4.Do not send secure information in the URI
	5.Use nouns for creating resources like Account, User, Candidate, etc.
	
4.Implementing SpringSecurity
---

To protect the direct access of the of the webservices it is required to secure them.
<br>
Add following dependencies to your ``pom.xml``

```xml
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>
```
Default user name is '**user**' and password is present in the console<br>
Basically a **session** is created on the server side and **cookies** are stored in the browser, and that cookie is sent along with every request.
<br>
You can change the username and password to your liking by adding following in your ``applications.properties``

```.properties
spring.security.user.name=prashant
spring.security.user.password=prashant


```

