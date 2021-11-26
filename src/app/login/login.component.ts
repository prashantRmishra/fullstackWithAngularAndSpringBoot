import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'prashant'
  password =''
  constructor() { }
  handleLogin(){
    console.log(this.username)

  }

  ngOnInit(): void {
  }

}
