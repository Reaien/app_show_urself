import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomePage } from './home.page';
import { CompHomeComponent } from 'src/app/components/comp-home/comp-home.component'
import { CompUserComponent } from 'src/app/components/comp-user/comp-user.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomePage, CompHomeComponent,CompUserComponent]
})
export class HomePageModule {}
