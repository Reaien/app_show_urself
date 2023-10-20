import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AgregarActualizadVideoComponent } from 'src/app/shared/components/agregar-actualizad-video/agregar-actualizad-video.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  user: any;
  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {

    this.user = this.utilsSvc.getFromLocalStorage('user');
  }

  cerrarSesion(){
    localStorage.removeItem('user');
    localStorage.removeItem('ingresado');
    this.utilsSvc.routerLink("/inicio");
  }

  //agregar o actualizar video
  addUpdateVideo(){
    this.utilsSvc.mostrarModal({
      component: AgregarActualizadVideoComponent
    })
    
  }


}
