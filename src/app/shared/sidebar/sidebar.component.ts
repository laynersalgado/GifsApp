import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'

})
export class SidebarComponent {

  get historial(){
    return this.gitService.historial;
  }

  constructor(private gitService: GifsService) { }

  buscar (termino: string){
    this.gitService.buscarGifs(termino);
  }
}
