import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'prashant'
  password =''


  //This is called Dependency Injection 
  constructor(private router : Router) { }

  handleLogin(){

    this.router.navigate(['welcome',this.username])

  }

  ngOnInit(): void {
  }

}
