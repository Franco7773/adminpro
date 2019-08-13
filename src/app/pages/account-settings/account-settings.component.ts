import { Component, OnInit, Inject, ElementRef } from '@angular/core';
// import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public settings: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarTema( color: string, link: any ): void {

    this.aplicarCheck( link );

    this.settings.aplicarTema( color );

  }

  aplicarCheck( link: any ): void {

    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores) {

      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {

    const selectores: any = document.getElementsByClassName('selector');
    const tema: string = this.settings.ajustes.tema;

    for (const ref of selectores) {

      if ( ref.getAttribute('data-theme') === tema) {

        ref.classList.add('working');
        break;
      }
    }
  }


}
