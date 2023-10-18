import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  toastController = inject(ToastController)
  router = inject(Router)

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }


  //=====router =====
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }


  //=====guardar un elemento en localstorage=====
  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

//=====obtener un elemento en localstorage=====
  getFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }

}
