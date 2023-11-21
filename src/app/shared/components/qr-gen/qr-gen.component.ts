import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-qr-gen',
  templateUrl: './qr-gen.component.html',
  styleUrls: ['./qr-gen.component.scss'],
})
export class QrGenComponent  implements OnInit {

  link: any;

  user: any;
  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  usuario(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    
  }

}