import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private documentHTML: Document ) {

    this.cargarAjustes();
  }

  guardarAjustes() {

    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
  cargarAjustes() {

    if ( localStorage.getItem('ajustes') ) {

      this.ajustes = JSON.parse( localStorage.getItem('ajustes'));

      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema( tema: string ) {

    const url: string = `assets/css/colors/${ tema }.css`;

    // tslint:disable-next-line: no-string-literal
    this.documentHTML.getElementById('tema')['href'] = url;

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
