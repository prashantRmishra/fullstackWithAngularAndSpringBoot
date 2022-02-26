##How to implement xml support for your rest api's

We know that JSON is used to represent the resource but we should also know how to represent the resource in the xml format.

**It is called content negotiation because there is a negotiation between user(client) and the server for the format in which the user wishes to see the data**
-

Add simple dependency in your `pom.xml` 

```xml
		<dependency>
			<groupId>com.fasterxml.jackson.dataformat</groupId>
			<artifactId>jackson-dataformat-xml</artifactId>
		</dependency>
```

That it . Now to get the response in xml format the user just has to specify the format in the request header as

```json
 "accept": "application/xml" 
 ```
 After that the use will be able to get the response in xml format.
 
 Similarly if the use gives 
 
 ```json
 "accept" : "application/json"
 ```
 
 And user will be able to get the response in json format.