## For responding to request of different language region altogether we need to make our code internationalized.

For every request the user makes while sitting in different country (say) will have request header as 

```json
{
	"Accept-language":"fr" //for french 
}
```

In you controller you will have to get this header as 

```java
@Autowired
MessageSource messageSource;

/*
WE WILL HAVE TO CREATE messages.properties file that will have message for respective language (say)
ie for french file name should be 'messages.fr.properties' and so on 
	messages.fr.properties will have:
		good.morning.message = bonjor
*/

public ResponseEntity<?> someControllerMethod(@RequestHeader(name = "Accept-Language",required =false)) Locale locale ){
	//your code here
	String response = messageSource.getMessage(good.morning.message,null,locale);
	return response;
	/*
	Instead of using @RequestHeader(name = "Accept-Language",required =false)) Locale locale  every time we can do it this way as well
	String response  = messageSource.getMessage(good.morning.message,null,LocaleContextHolder.getLocale());
	return response;
	*/
}
```