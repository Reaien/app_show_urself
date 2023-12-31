import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module'
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomePage]
})
export class HomePageModule {}
