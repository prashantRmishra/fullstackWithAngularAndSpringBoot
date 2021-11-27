
# Full stack app with Angular and SpringBoot

----
[ Udemy Course link that I used ](https://github.com/in28minutes/full-stack-with-angular-and-spring-boot)

----

Using bootstrap for styling 
---

Search for 'unpkg bootstrap 4' in browser then go to any of the links and then copy the url of bootstrap.min.css which was in my case 'https://unpkg.com/browse/bootstrap@4.1.0/dist/css/bootstrap.min.css'

import in your ``style.css``. @import url(https://unpkg.com/browse/bootstrap@4.1.0/dist/css/bootstrap.min.css)

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





