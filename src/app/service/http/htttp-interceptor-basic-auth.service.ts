import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

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
}
