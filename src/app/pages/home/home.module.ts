import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module'
import { CompHomeComponent } from 'src/app/shared/components/comp-home/comp-home.component';
import { CompUserComponent } from 'src/app/shared/components/comp-user/comp-user.component';
import { AgregarActualizadVideoComponent } from 'src/app/shared/components/agregar-actualizad-video/agregar-actualizad-video.component';


@NgModule({
  imports: [
    SharedModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomePage, CompHomeComponent,CompUserComponent]
})
export class HomePageModule {}
