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
  welcomeMessage =''

  ngOnInit(): void {
    this.name  = this.router.snapshot.params['user'];
  }
  getWelcomeMessage(){
  this.welcomeDataService.executeWelcomeDataService().subscribe(res=>{
     this.welcomeMessage = res.toString()
   },
   err=>{
     console.log(err.error.message);
   })
  }

}
