import { Component, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  data: any;

  utilsSvc = inject(UtilsService)

  
  ngOnInit() {
    setTimeout(() => {
      this.utilsSvc.routerLink('/home');
    }, 4000);
  }




}
