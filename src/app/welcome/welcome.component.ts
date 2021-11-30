import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router : ActivatedRoute,
              private welcomeDataService : WelcomeDataService
              ) 
              { 

              } // import from @angular/router
  name =''

  ngOnInit(): void {
    this.name  = this.router.snapshot.params['user'];
  }
  getWelcomeMessage(){
   console.log( this.welcomeDataService.executeWelcomeDataService().subscribe(res=>{
     console.log(res)
   }))
  }

}
