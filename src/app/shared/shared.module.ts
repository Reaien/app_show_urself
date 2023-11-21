import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { AgregarActualizadVideoComponent } from './components/agregar-actualizad-video/agregar-actualizad-video.component';
import { HeaderComponent } from './header/header.component';
import { ListasVideoComponent } from './components/listas-video/listas-video.component';
import { QrGenComponent } from './components/qr-gen/qr-gen.component';
import { QRCodeModule } from 'angularx-qrcode';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QRCodeModule
  ],
  declarations: [
    CustomInputComponent,
    AgregarActualizadVideoComponent,
    HeaderComponent,
    ListasVideoComponent,
    QrGenComponent
],
  exports: [
    CustomInputComponent,
    AgregarActualizadVideoComponent,
    HeaderComponent,
    ListasVideoComponent,
    QrGenComponent
  ]
})
export class SharedModule {}