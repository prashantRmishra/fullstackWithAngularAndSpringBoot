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