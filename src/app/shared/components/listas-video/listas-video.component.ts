import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Video } from 'src/app/models/video.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AgregarActualizadVideoComponent } from '../agregar-actualizad-video/agregar-actualizad-video.component';

@Component({
  selector: 'app-listas-video',
  templateUrl: './listas-video.component.html',
  styleUrls: ['./listas-video.component.scss'],
})
export class ListasVideoComponent  implements OnInit {

  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  videos: Video[] = [];

  loading: boolean = false;


  usuario(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.getVideos();
  }


  //obtener videos
  getVideos(){
    let path = `users/${this.usuario().uid}/videos`;

    this.loading = true;

    let sub = this.apiFireBase.getCollectionData(path).subscribe({
      next: (res:any) => {
        console.log(res);
        this.videos = res;

        this.loading = false;

        sub.unsubscribe();
      }
    })
  }

 //editarVideo
  UpdateVideo(video?: Video){
    console.log("hola")
    this.utilsSvc.mostrarModal({
      component: AgregarActualizadVideoComponent,
      componentProps: { video }
    })
    
  }


  //borrar video y su imagen
  async borrarrVideo(video: Video){
    

    let path = `users/${this.usuario().uid}/videos/${video.id}`;

    let videoPath = await this.apiFireBase.obtenerUrlImagen(video.video);
    await this.apiFireBase.borrarArchivo(videoPath);

    this.apiFireBase.deleteDocument(path).then(async res => {

      this.videos = this.videos.filter(video => video.id !== video.id);

      this.utilsSvc.presentToast({
        message: 'Video eliminado correctamente',
        duration: 2000,
        position: 'middle',
        color: 'warning',
        icon: 'alert-circle-outline'
      })

      //volver al perfil
      this.utilsSvc.routerLink('/profile');

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
