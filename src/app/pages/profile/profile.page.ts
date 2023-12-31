import { Component, OnInit, inject } from '@angular/core';
import { Video } from 'src/app/models/video.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AgregarActualizadVideoComponent } from 'src/app/shared/components/agregar-actualizad-video/agregar-actualizad-video.component';
import { ListasVideoComponent } from 'src/app/shared/components/listas-video/listas-video.component';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner){}


  user: any;
  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)




  ngOnInit() {

    this.user = this.utilsSvc.getFromLocalStorage('user');
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
        this.openBrowser(barcodeData)
     }).catch(err => {
         console.log('Error', err);
     });
  }

  openBrowser(barcodeData: any){
    Browser.open({ url: barcodeData.text });
  }
  

  cerrarSesion(){
    localStorage.removeItem('user');
    localStorage.removeItem('ingresado');
    this.utilsSvc.routerLink("/inicio");
  }

  //agregar o actualizar video
  addUpdateVideo(video?: Video){
    this.utilsSvc.mostrarModal({
      component: AgregarActualizadVideoComponent,
      componentProps: { video }
    })

    
  }

  listarVideos(){
    this.utilsSvc.mostrarModal({
      component: ListasVideoComponent
    })
  }

 


}
