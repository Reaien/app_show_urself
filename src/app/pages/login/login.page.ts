import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //librerias importadas para crear formulario, controlar y validar registros
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  form = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email]), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
    password: new FormControl("",[Validators.required])
  })

  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)


  ngOnInit() {
  }

  ingresar(){
    if (this.form.valid) {
      this.apiFireBase.login(this.form.value as User).then(res => {
        //obtiene el user comparandolo con el id
        this.getUserInfo(res.user.uid);

        
        this.utilsSvc.routerLink('/splash');

        localStorage.setItem('ingresado','true');
    

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

  getUserInfo(uid: string){
    if (this.form.valid) {

      let path = `users/${uid}`;

      this.apiFireBase.getDocument(path).then((user: User) => {

        this.utilsSvc.saveInLocalStorage('user', user);
        
        

        this.form.reset();


        this.utilsSvc.presentToast({
          message: `Sesión iniciada correctamente, Hola ${user.name}!`,
          duration: 3000,
          color: 'warning',
          position: 'middle',
          icon: 'person-circle-outline'          
        })

        

      }).catch(error =>{
        console.log(error)
        this.utilsSvc.presentToast({
          message: 'Error en el inicio de sesión, comprueba tu email o contraseña',
          duration: 3000,
          position: 'middle',
          icon: 'alert-circle-outline'
        }).finally(() =>{
          
        })
      })
    }
    
  }
}
