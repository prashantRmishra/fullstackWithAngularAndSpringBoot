import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {


executeWelcomeDataService():Observable<Object>{
    return this.http.get('http://localhost:8080/hello-world',{responseType:'text'})
  }

  constructor(private http:HttpClient) { }
}
