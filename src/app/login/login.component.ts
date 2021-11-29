import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'prashant'
  password =''
  errorMessage='Credentials are not valid !'
  validCredentials =true
  todo:FormGroup;


  //This is called Dependency Injection 
  constructor(private router : Router,
    private hardcodeAuthentication : HardCodedAuthenticationService,
    private builder : FormBuilder) {
      this.todo = this.builder.group({
        username:['',Validators.required],
        password:['',Validators.required]

      });
     }
    


  handleLogin(){
    this.validCredentials  = this.hardcodeAuthentication.authentication(this.todo.controls['username'].value, this.todo.controls['password'].value) === true ? true : false;
    if(this.validCredentials){
      this.router.navigate(['welcome',this.todo.controls['username'].value]);
    }
  }

  ngOnInit(): void {
  }

}
