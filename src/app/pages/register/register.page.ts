import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //librerias importadas para crear formulario, controlar y validar registros
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {



  form = new FormGroup({
    uid: new FormControl(""),
    email: new FormControl("",[Validators.required, Validators.email]), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
    password: new FormControl("",[Validators.required, Validators.minLength(6)]),
    name: new FormControl("",[Validators.required, Validators.minLength(4)]),
    profilePic: new FormControl("",[Validators.required]),
  })

  router = inject(Router);
  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)
  toastController = inject(ToastController)

  //contructor publico que se crea a partir del FormBuilder, se le dan parametros que se quieren aplicar en el formlario

  ngOnInit() {
  }

  async obtenerImagen(){
    const dataUrl = (await this.utilsSvc.takePicture('Imagen de perfil')).dataUrl;
    this.form.controls.profilePic.setValue(dataUrl);
  }

  async registrar(){
    if (this.form.valid) {
      this.apiFireBase.registro(this.form.value as User).then(async res => {
        await this.apiFireBase.actualizarUsuario(this.form.value.name)




        let uid = res.user.uid;

        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid);

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

  async setUserInfo(uid: string){
    if (this.form.valid) {

      let path = `users/${uid}`;
      delete this.form.value.password;

      this.apiFireBase.setDocument(path, this.form.value).then(async res => {

        this.utilsSvc.saveInLocalStorage('user', this.form.value);

        this.utilsSvc.routerLink('/inicio')

        this.form.reset();

        

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
