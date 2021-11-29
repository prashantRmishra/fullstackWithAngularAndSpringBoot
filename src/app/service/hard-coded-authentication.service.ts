import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HardCodedAuthenticationService {

  constructor() { }


  authentication(username:string,password:string){
    if(username==="prashant" && password==="prashant"){
      sessionStorage.setItem('username',username)
      sessionStorage.setItem('password',password)
      return true
    }
      return false ;
  }

  isUserLoggedIn(){
    let user =sessionStorage.getItem('username')
    return !(user===null)
  }

  logOutUser(){
    sessionStorage.removeItem('username')
  }
}
