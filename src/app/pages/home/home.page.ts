import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  swiperModules = [IonicSlides];

  slides: any[] = [];
  data: any;


  constructor(private activateRoute: ActivatedRoute, private router: Router) { 
    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data = this.router.getCurrentNavigation()?.extras.state?.['user'];
        console.log(this.data);
      }else{
        this.router.navigate(["/inicio"]);
      }
    });
  }

  ngOnInit():  void{

    this.slides = [
      {banner: '../../../assets/img/artista1.png'},
      {banner: '../../../assets/img/artista2.jpg'},
      {banner: '../../../assets/img/artista3.jpg'},
      {banner: '../../../assets/img/artista4.jpg'},
      {banner: '../../../assets/img/artista5.jpg'},
      {banner: '../../../assets/img/artista6.png'},
    ]

  }

  


}
