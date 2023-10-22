import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Video } from 'src/app/models/video.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-listas-video',
  templateUrl: './listas-video.component.html',
  styleUrls: ['./listas-video.component.scss'],
})
export class ListasVideoComponent  implements OnInit {

  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  videos: Video[] = [];

  
  usuario(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter(){
    this.getVideos();
    
  }


  //obtener videos
  getVideos(){
    let path = `users/${this.usuario().uid}/videos`;

    let sub = this.apiFireBase.getCollectionData(path).subscribe({
      next: (res:any) => {
        console.log(res);
        this.videos = res;
        sub.unsubscribe();
      }
    })
  }

  ngOnInit() {}

}
