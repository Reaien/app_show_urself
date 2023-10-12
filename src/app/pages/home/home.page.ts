import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {




  constructor(private activateRoute: ActivatedRoute, private router: Router) { 

  }

  ngOnInit() {}

  segmentChanged($event:any){
    let direccion=$event.detail.value;
    this.router.navigate(['home/'+direccion])
  }


}

