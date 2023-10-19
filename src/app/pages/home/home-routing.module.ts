import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { CompHomeComponent } from 'src/app/shared/components/comp-home/comp-home.component';
import { CompUserComponent } from 'src/app/shared/components/comp-user/comp-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'main',
        component: CompHomeComponent
      },
      {
        path: 'user',
        component: CompUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
