
# Full stack app with Angular and SpringBoot

----
[ Udemy Course link that I used ](https://github.com/in28minutes/full-stack-with-angular-and-spring-boot)
----

----

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
 





