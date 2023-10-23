import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { reload } from 'firebase/auth';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  router = inject(Router)

  doRefresh(event) {
    console.log('Begin async operation');
    
    setTimeout(() => {
      location.reload();
      event.target.complete();
    }, 2000);
  }


  

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('/pagina-de-destino');
    }, 1000); // 5000 milisegundos = 5 segundos
  }

}
