import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //librerias importadas para crear formulario, controlar y validar registros
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-pass-recover',
  templateUrl: './pass-recover.page.html',
  styleUrls: ['./pass-recover.page.scss'],
})
export class PassRecoverPage implements OnInit {

  form = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email]), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
  })

  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  //contructor publico que se crea a partir del FormBuilder, se le dan parametros que se quieren aplicar en el formlario

  ngOnInit() {
  }

  resetear(){

    //obtiene el user comparandolo con el id
    this.apiFireBase.recuperarPass(this.form.value.email).then(res =>{

      this.utilsSvc.presentToast({
        message: 'Hemos enviado un link de restauración a tu email',
        duration: 3000,
        color: 'warning',
        position: 'middle',
        icon: 'alert-circle-outline'});

      this.utilsSvc.routerLink('/login');
      this.form.reset();

    }).catch(error =>{
        console.log(error)
        this.utilsSvc.presentToast({
          message: 'Error en el inicio de sesión, comprueba tu email o contraseña',
          duration: 3000,
          color: 'warning',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
    })
  }
}
