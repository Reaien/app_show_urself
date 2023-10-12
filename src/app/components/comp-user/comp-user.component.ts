import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comp-user',
  templateUrl: './comp-user.component.html',
  styleUrls: ['./comp-user.component.scss'],
})
export class CompUserComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  cerrarSesion(){
    localStorage.removeItem('ingresado');
    this.router.navigate(["/inicio"]);
  }

}
