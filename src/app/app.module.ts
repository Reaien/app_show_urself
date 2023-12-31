import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//FIREBASE
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';


//qr
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';






@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule ,AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig)], //colocar angular fire module
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },BarcodeScanner, EmailComposer],
  bootstrap: [AppComponent],
})
export class AppModule {}