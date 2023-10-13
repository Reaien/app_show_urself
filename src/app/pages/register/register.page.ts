import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //librerias importadas para crear formulario, controlar y validar registros
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, ToastController, ToastOptions } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  user={
    email:"",
    password:"",
    name: ""
  }

  form = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email]), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
    password: new FormControl("",[Validators.required]),
    name: new FormControl("",[Validators.required, Validators.minLength(4)])
  })

  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)
  toastController = inject(ToastController)

  //contructor publico que se crea a partir del FormBuilder, se le dan parametros que se quieren aplicar en el formlario

  ngOnInit() {
  }

  registrar(){
    if (this.form.valid) {
      this.firebaseSvc.registro(this.form.value as User).then(async res => {
        await this.firebaseSvc.actualizarUsuario(this.form.value.name)
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
