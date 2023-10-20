import {Component, OnInit, inject } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  swiperModules = [IonicSlides];

  utilsSvc = inject(UtilsService)

  slides: any[] = [];
  genreSlides: any[] = [];

  user: any;



  ngOnInit(): void {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    
    this.slides = [
        {banner: '../../../assets/img/artista1.png'},
        {banner: '../../../assets/img/artista2.jpg'},
        {banner: '../../../assets/img/artista3.jpg'},
        {banner: '../../../assets/img/artista4.jpg'},
        {banner: '../../../assets/img/artista5.jpg'},
        {banner: '../../../assets/img/artista6.png'},
      ]
    this.genreSlides = [
      {genre: '../../../assets/img/icon-genero1.jpg'},
      {genre: '../../../assets/img/icon-genero2.jpg'},
      {genre: '../../../assets/img/icon-genero3.jpg'},
      {genre: '../../../assets/img/icon-genero4.jpg'},
      {genre: '../../../assets/img/icon-genero5.jpg'},
      {genre: '../../../assets/img/icon-genero6.jpg'},
      {genre: '../../../assets/img/icon-genero7.jpg'},
      {genre: '../../../assets/img/icon-genero8.jpg'},
    ]   
  }





  







  


}

