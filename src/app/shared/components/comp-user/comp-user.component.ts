import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AgregarActualizadVideoComponent } from '../agregar-actualizad-video/agregar-actualizad-video.component';

@Component({
  selector: 'app-comp-user',
  templateUrl: './comp-user.component.html',
  styleUrls: ['./comp-user.component.scss'],
})
export class CompUserComponent  implements OnInit {

  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {}

  cerrarSesion(){
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
