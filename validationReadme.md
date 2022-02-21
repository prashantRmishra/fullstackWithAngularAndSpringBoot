
Add following dependencies to your ``pom.xml`` file.

```xml
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
```

Let say you have bean called `User`.

```java
class User{
	private int id;
	@Size(min =2) // the minimum size should be 2 character for the name
	private String name;
	@Past // the birth date should be in the past not in the future
	private Date birthDate;
}
```
Now for add request you have to add ``@Valid`` annotation to the method parameter that gets 
``@ReuestBody`` of ``User`` for adding new user.

```java
@PostMapping("/add/user")
public ReponseEntity<?> addUser(@Valid @ResponseBody User user){
	// your logic here
}
```

Now if user tries to add a user with name length less than 2 he/she will get a **`400 bad request`** response.

For more precise approach we can override the ``handleMethodArgumentNotValid(MethodArgumentNotValid e, WebRequest request)`` method
from the `ResponseEntityExceptionHandler` in our global Exception handler and we can give custom message response.

And finally we can get the message of the exception as `e.getBindingResult().toString()` or we can create a custome message of our liking and we can send this as the response message.

Similarly we can add validation for whole lot of other things :)