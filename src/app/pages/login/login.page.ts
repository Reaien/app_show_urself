import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //librerias importadas para crear formulario, controlar y validar registros
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, ToastController, ToastOptions } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user={
    email:"",
    password:""
  }

  form = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email]), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
    password: new FormControl("",[Validators.required])
  })

  router = inject(Router);
  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)
  toastController = inject(ToastController)

  //contructor publico que se crea a partir del FormBuilder, se le dan parametros que se quieren aplicar en el formlario

  ngOnInit() {
  }

  ingresar(){
    if (this.form.valid) {
      this.apiFireBase.login(this.form.value as User).then(res => {
        console.log(res)
        localStorage.setItem('ingresado','true');
        let navigationExtras : NavigationExtras={
          state:{
            user: this.user.email
          }
        }
    
        this.router.navigate(['/splash'],navigationExtras);
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
