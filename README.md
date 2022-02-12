
# Full stack app with Angular and SpringBoot

----
[ Udemy Course link that I used ](https://github.com/in28minutes/full-stack-with-angular-and-spring-boot)

----

Using bootstrap for styling 
---

run ``npm install bootstrap --save``
Add following to your ``angular.json`` 

```json
            "styles": [
              "src/styles.css",
              "node_modules/bootstrap/dist/css/bootstrap.min.css"
            ],
            "scripts": [
              "node_modules/bootstrap/dist/js/bootstrap.min.js"
            ]
```
Kill your application and do ``ng serve`` again to see the effect of bootstrap classes if you have used any :)

## Angular Part 

**``angular.json``** 

``angular.json`` is application level configuration. <br>

**``package.json``** 

 ``package.json``  is library installed configuration. So all the packages specified in ``package.json`` are downloded when you run ``npm install``. Cosider it as maven dependency management. <br>

 **``src/environment``**

 All the configuration related to different environment go into this folder. Example dev, production, local, QA, test etc. <br>

 **``tsconfig.json``**

 As browser run javascript so typescript must be converted into javascript which is specified as part of ``tsconfig.json`` <br>

 **``node_modules``** 

 All the packages and libraries are downloaded here.

 **``index.html``** and  **``main.ts``**
 Used for bootstraping the angular application <br>

 **``polyfills.ts``**

 Same javascript code may not work in different browser so ``polyfills.js`` insures that javascript on different browser. <br>

 **``test.ts``**

 Starting or entry point for running ``ng test``.

 **Note : Modern javascript does not have the concept of interface , interfaces are part of typescript** 

 ```ts
 // export is nothing but public keyword like used in java 
 export class WelcomeComponent implements OnInit {

 }
 ```
 **Bootstraping in angular**
 ----
 If you see ``main.ts`` you will see ``app.module.ts`` getting bootstapped. 

 ```typescript

 platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

 ```
 Then in ``app.module.ts`` ``AppComponent`` is getting bootstrapped.
 ```typescript
  bootstrap: [AppComponent]
 ```
 So basically once ``AppModule`` is intialized ``AppComponent`` is also intialized.
 Then finally ``<app-root></app-root>`` mentined in ``index.html`` is rendered as view source from ``app.component.html`` 

 ----

**Data Bindings**

----

**``Data Interpolation``**
Syntax : ``Username : {{username}}``

**``Event Binding``**
Syntax : ``(click) = "handleLogin()"``

**``ngModel``** 
For two way data binding. Import ``FormsModule`` in ``app.module.ts``
Syntax : ``[(ngModel)]="username"``
 
----

**Directives in Angular**

----
``ngIf``
Example for toggle of error message

```javascript
<small *ngIf='invalidLogin'>{{errorMessage}}</small>
```
<br>

``ngFor``
```html
<tr *ngFor = 'let todo of todos'>
            <td>{{todo.id}}</td>
            <td>{{todo.description}}</td>
        </tr>

```

``ngModel`` 
For two way data binding. Import ``FormsModule`` in ``app.module.ts``
Syntax : ``[(ngModel)]="username"``

----

**Routing**

----
1. Routing from ``app.routing.module.ts``
```javascript
const routes: Routes = [
  {
    path:'',component:LoginComponent
  }
  ```
  Put only ``router-outlet`` in the ``app.component.html``
  ```html
  <router-outlet></router-outlet>
```
2. Routing from one component to another component example from ``LoginComponent`` to ``WelcomeComponent``

``import {Router} from '@angular/router'`` in ``LoginComponent`` <br>
Write following in the ``LoginComponent``

```javascript
//This is called Dependency Injection 
  constructor(private router : Router) { }

  handleLogin(){
    console.log(this.username)
    this.router.navigate(['welcome'])

  }

```
Accepting parameters from routing 
example : accepting ``prashant`` from ``welcome/prashant``

update ``LoginComponent`` as

```javascript
 this.router.navigate(['welcome',this.username]) //url with parameter
```
Add following to your ``WelcomeComponent`` 

```javascript
  constructor(private router : ActivatedRoute) { } // import from @angular/router

  ngOnInit(): void {
    console.log(this.router.snapshot.params['user']);
  }

```
3. ``routerLink``

```html
Go to your <a routerLink ="/todos">todo's</a> List.
```
It will take you to todos page upon click

----

**Validation in angular**

1. Using ``ngSubmit`` event.

```html
 <form (ngSubmit)=" !todoForm.invalid &&  updateTodoDetails()" #todoForm="ngForm"> <!--#todoForm is the name of the ngForm template-->
 <!--.invalid is the built in function of angular to check validity of the form-->
    <fieldset class="form-group">
        <label for="description">Description</label>
        <input type="text" [(ngModel)]="todo.description" name="description" class="form-control" required="required">
    </fieldset>
    <fieldset class="form-group">
        <label for="date">Date</label>
        <input type="date" [ngModel] = "todo.tagetDate | date : 'yyyy-MM-dd'" name="tagetDate"
        (ngModelChange)="todo.tagetDate  = $event" class="form-control" required="required">
    </fieldset>

        <button class="btn btn-success" type="submit">Save</button>
</form>
```
2. Using ``FormBuilder``

Refer ``login-component.ts`` and ``login-component.html``.

Implementing RouteGuard for making sure that all the pages or the links are accesible only when the user has already logged in.
----

Create Service ``routeGuard`` in service folder and implement an interface called ``CanActivate`` from ``@angular/router``

Then implement ``canActivate`` method and write your logic to check if the user has logged in or not.

For example I have created ``isUserLogggedIn()`` menthod in ``HardCodedAuthenticationService.ts`` service to check if user has logged in or not.
For that I have used ``sessionStorage`` to store ``username`` once the user has logged in.

```typescript
 isUserLoggedIn(){
    let user =sessionStorage.getItem('username')
    return !(user===null)
  }
```

**Note** : ``sessionStorage.setItem('username',username)`` is done during login of the user. Refer ``hardcode-authentication-service.ts`` and ``login-component.ts`` files for more information.

``route-guard-service.ts``

```javascript

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   
   if(this.hardcodedAuthentication.isUserLoggedIn())
    return true
    this.router.navigate(['login'])
    return false
  }
```
Once this is done we can guard all the routes from the ``app-routing.module``

```typescript
const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'welcome/:user',component:WelcomeComponent,canActivate:[RouteGuardService]
  },
  {
    path:'todos',component:ListTodosComponent,canActivate:[RouteGuardService]
  },
  {
    path:'logout',component:LogoutComponent,canActivate:[RouteGuardService]
  },
 
  //anything else 
  {
    path:'**',component:ErrorComponent
  }
];
```

Observable
---
It is one of the best way to implement asynchronous http request (because if we don't use asynchronous call then browser will hang till the response comes from the server)

Example in ``welcome-data-service.ts``

``import { Observable } from 'rxjs';``

```javascript

executeWelcomeDataService():Observable<Object>{
    return this.http.get('http://localhost:8080/hello-world')
  }
```
**Remember** ``Observable`` are not executed untill it is subscribed



What is called a WebService
----
We have to keep in mind three things 
1. There should be machine to machine communication 
2. The communication should be plateform independent
3. The service should be available over the internet.



CORS
---
You will get following error if you request form angular to springboot

`Access to XMLHttpRequest at 'http://localhost:8080/hello-world' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
<br>
Resolve the above error you will have to add `@crossOrigin` to the controller method where the requests are getting attached.

But if you have incorporated ``SpringSecurity` in your app in the backend then you will get error which is slightly different 

`Access to XMLHttpRequest at 'http://localhost:8080/hello-world' from origin 'http://localhost:4200' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.`

To resolve this you will have to provide header in you request that 
will have username and password that you have created in your `application.properties` file in Spring boot.

Following changes are needed in the agnular app
`welcome-data-service.ts` 

```typeScript
executeWelcomeDataService():Observable<Object>{
  let header = new HttpHeaders({
    Authorization:this.generateAuthenticationHttpHeader()
  })
    return this.http.get('http://localhost:8080/hello-world',{responseType:'text',headers:header})
  }

  constructor(private http:HttpClient) { }


  generateAuthenticationHttpHeader(){
    let username  = 'prashant';
    let password = 'prashant';
    let authentication = 'Basic'+' '+window.btoa(username+':'+password); //btoa is used for base 64 encoding in javascript
    return authentication;
  }
```
_You will have the replicate the same above changes in all the requesting services in your frontend application._

**But if we do that manually it would be hectic task as for every new sevice that we create we will have to add this header in that 
we don't want that hence instead we will use** `HttpInterceptor`.

Create a service `HttpInterceptorBasicAuthService` and `implement` `HttpInterceptor` 


```TypeScript
// HttpInterceptor acts as filter 
export class HtttpInterceptorBasicAuthService  implements HttpInterceptor{

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let username  = 'prashant';
    let password = 'prashant';
    let authentication = 'Basic'+' '+window.btoa(username+':'+password); //btoa is used for base 64 encoding in javascript
   // as this request is nothing but httpRequest that is sent out, we will add our header in request 
    request = request.clone({
        setHeaders: {
          Authorization: authentication
        }
      }); // we can not modify the request object hence we will clone it and then add our request header into it.
      // next.handle() will send the request to the next HttpRequest handler
      return next.handle(request);
    //throw new Error('Method not implemented.');
  }
```

We will have to configure the Interceptor in ``app.module.ts`` `providers[]` to make it work properly
--
```TypeScript

 providers: [
    {
      provide: HTTP_INTERCEPTORS,useClass: HtttpInterceptorBasicAuthService,multi: true
    }
  ],

```

____
And the changes that you need to do in your Spring boot app in mentioned in `README.md` file of Spring boot app.

Tips!
---
1. Use ``routerLink`` instead of ``href`` as ``href`` always reloads the page, angular is used to develop single page application. So, it is good to use ``routerLink`` as it will avoid reload of the page.

2. If you are sending ``json`` values form your backend to angular but the name of the property seems little different from what you have defined in your class file (java in my case). It is because the getProperty() (getter ) method that you have specified.
For example if the name of the property is 
```java
private boolean isDone;
public getDone(){  // get done
  return this.isDone;
}
```
In ``json`` the property will be ``done`` and not ``isDone``. This is because of the getter method has name as ``getDone()`` not ``getIsDone()``.
For better understanding you can refer to ``Todo.java`` fie in the backend project and ``list-todos-components.ts`` in angular app.

<br>

3.  ``[(ngModel)]`` we know that it is used for two way data binding , it can also be written as 
 
 ```javascript
  <input type="date" [ngModel] = "todo.tagetDate | date : 'yyyy-MM-dd'"
        (ngModelChange)="todo.tagetDate  = $event" class="form-control">
 ```
Which is same as writing 

```javascript
 <input type="date" [(ngModel)] = "todo.tagetDate" class="form-control">
 <!--pipes don't work with [(ngModel)] hence it is split as shown in the above statement-->
```

