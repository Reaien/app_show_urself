import { Component, Input, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() isModal!: boolean;

  utilSrvc = inject(UtilsService);

  ngOnInit() {}

  cerrarModal(){
    this.utilSrvc.cerrarModal();
  }

}
