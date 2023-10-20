import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //librerias importadas para crear formulario, controlar y validar registros
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-agregar-actualizad-video',
  templateUrl: './agregar-actualizad-video.component.html',
  styleUrls: ['./agregar-actualizad-video.component.scss'],
})
export class AgregarActualizadVideoComponent  implements OnInit {

  


  form = new FormGroup({
    id: new FormControl(""),
    titulo: new FormControl("",[Validators.required, Validators.email]), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
    descripcion: new FormControl("",[Validators.required]),
    video: new FormControl("",[Validators.required]),
    autor: new FormControl("",[Validators.required]),
  })

  router = inject(Router);
  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)
  toastController = inject(ToastController)

  //contructor publico que se crea a partir del FormBuilder, se le dan parametros que se quieren aplicar en el formlario

  ngOnInit() {
  }

  async registrar(){
    if (this.form.valid) {
      this.apiFireBase.registro(this.form.value as User).then(async res => {
        await this.apiFireBase.actualizarUsuario(this.form.value.titulo)

        let uid = res.user.uid;

        console.log(res)
      }).catch(error =>{
        console.log(error)
        this.utilsSvc.presentToast({
          message: 'Error en el inicio de sesión, comprueba tu email o contraseña',
          duration: 3000,
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      })
    }
    
  }


}
