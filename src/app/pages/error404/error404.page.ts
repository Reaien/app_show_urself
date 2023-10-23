import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page{

  utilsSvc = inject(UtilsService);
  router = inject(Router);

  ionViewDidEnter() {

    setTimeout(() => {
      this.router.navigateByUrl('/inicio');
    }, 5000); // 5000 milisegundos = 5 segundos

    this.utilsSvc.presentToast({
      message: 'Error 404 no se encuentra la pagina',
      duration: 5000,
      position: 'middle',
      color: 'danger',
      cssClass: 'osito404'
    })
    // Usamos ionViewDidEnter en lugar de ngOnInit para asegurarnos de que la vista esté completamente cargada.

  }



}
