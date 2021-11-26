import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router : ActivatedRoute) { } // import from @angular/router
  name =''

  ngOnInit(): void {
    this.name  = this.router.snapshot.params['user'];
  }

}
