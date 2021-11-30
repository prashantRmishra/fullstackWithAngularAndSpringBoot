
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

Access to XMLHttpRequest at 'http://localhost:8080/hello-world' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
<br>

Tips!
---
1. Use ``routerLink`` instead of ``href`` as ``href`` always reloads the page, angular is used to develop single page application. So, it is good to use ``routerLink`` as it will avoid reload of the page.





