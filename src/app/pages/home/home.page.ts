import {Component, OnInit, inject } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { Video } from 'src/app/models/video.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { QrGenComponent } from 'src/app/shared/components/qr-gen/qr-gen.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  swiperModules = [IonicSlides];

  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  slides: Video[] = [];
  genreSlides: any[] = [];

  user: any;

  usuario(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter(){
    this.getVideos();
    
    
  }


  //obtener videos
  getVideos(){
    let path = `users/${this.usuario().uid}/videos`;

    let sub = this.apiFireBase.getCollectionData(path).subscribe({
      next: (res:any) => {
        console.log(res);
        this.slides = res;
        sub.unsubscribe();
      }
    })
  }

  compartirQR(){
    this.utilsSvc.mostrarModal({
      component: QrGenComponent,
      cssClass: 'cardQR'
    })
  }


  ngOnInit(): void {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    
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

