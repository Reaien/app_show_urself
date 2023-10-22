import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  toastController = inject(ToastController)
  router = inject(Router)
  modalCtrl = inject(ModalController)

  

  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, //formato dataurl es el que servirá para las imagenes
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Toma una foto'
    });
  };

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

  //=====Modal controller=====
  async mostrarModal(opts: ModalOptions){
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) return data;
  }

  cerrarModal(data?: any){
    return this.modalCtrl.dismiss(data);
  }

}
