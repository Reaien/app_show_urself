import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //librerias importadas para crear formulario, controlar y validar registros
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
    titulo: new FormControl("",[Validators.required]), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
    descripcion: new FormControl("",[Validators.required]),
    autor: new FormControl("",[Validators.required]),
    video: new FormControl("",[Validators.required]),
  })

  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User;



  ngOnInit() {

    this.user = this.utilsSvc.getFromLocalStorage('user');
  }

  async obtenerImagen(){
    const dataUrl = (await this.utilsSvc.takePicture('Imagen del video')).dataUrl;
    this.form.controls.video.setValue(dataUrl);
  }

  async subirVideo(){
    if (this.form.valid) {

      let path = `users/${this.user.uid}/videos`;

      //subir la imagen/video y obtener la url
      let dataUrl = this.form.value.video; 
      let videoPath = `${this.user.uid}/${Date.now()}`;
      let videoUrl = await this.apiFireBase.imagenSubida(videoPath, dataUrl);
      this.form.controls.video.setValue(videoUrl);

      delete this.form.value.id;

      this.apiFireBase.addDocument(path, this.form.value).then(async res => {

        this.utilsSvc.cerrarModal({success: true});

        this.utilsSvc.presentToast({
          message: 'Video subido correctamente',
          duration: 2000,
          position: 'middle',
          color: 'warning',
          icon: 'alert-circle-outline'
        })

        console.log(res)
      }).catch(error =>{
        console.log(error)
        this.utilsSvc.presentToast({
          message: `Error en la subida del video ${error.message}`,
          duration: 3000,
          position: 'middle',
          color: 'warning',
          icon: 'alert-circle-outline'
        })
      })
    }
  }


}
