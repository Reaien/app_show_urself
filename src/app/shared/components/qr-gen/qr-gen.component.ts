import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import html2canvas from 'html2canvas';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';


@Component({
  selector: 'app-qr-gen',
  templateUrl: './qr-gen.component.html',
  styleUrls: ['./qr-gen.component.scss'],
})
export class QrGenComponent  implements OnInit {


  constructor(private emailComposer: EmailComposer){}

  
  link: any;

  user: any;
  apiFireBase = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  async capturarPantallaYEnviarEmail() {
    const elemento = document.getElementById('elementoCapturar');

    if (elemento) {
      // Captura de pantalla del elemento HTML usando html2canvas
      const canvas = await html2canvas(elemento);

      // Obtiene la URL de la imagen de la captura de pantalla
      const imageDataUrl = canvas.toDataURL('image/png');

      // Configura los detalles del correo electrónico
      const email = {
        to: '',
        subject: 'Hey ven a ShowURself !',
        body: 'No pierdas la oportunidad de ser parte de ShowURself',
        isHtml: true,
        attachments: [
          'base64:' + 'captura.png//' + imageDataUrl.split(',')[1],
        ],
      };

      // Abre el compositor de correo electrónico
      this.emailComposer.open(email);
    } else {
      console.error('No se pudo encontrar el elemento con el id "elementoCapturar".');
    }
  }

  usuario(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    
  }

}