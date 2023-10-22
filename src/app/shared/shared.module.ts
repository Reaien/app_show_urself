import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { AgregarActualizadVideoComponent } from './components/agregar-actualizad-video/agregar-actualizad-video.component';
import { HeaderComponent } from './header/header.component';
import { ListasVideoComponent } from './components/listas-video/listas-video.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  
  ],
  declarations: [
    CustomInputComponent,
    AgregarActualizadVideoComponent,
    HeaderComponent,
    ListasVideoComponent
],
  exports: [
    CustomInputComponent,
    AgregarActualizadVideoComponent,
    HeaderComponent,
    ListasVideoComponent
  ]
})
export class SharedModule {}

