import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UtilsService } from './services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class UnloggedGuard implements CanActivate {
  

  utilsSvc = inject(UtilsService)

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('ingresado')) {
        this.utilsSvc.routerLink('/home'); //caso contrario al guard de logger aquí si está logueado retornara un false para no dejar acceder a las paginas y redireccionar al home
        return false;
      }else{
        return true;
      }
  }
  
}
