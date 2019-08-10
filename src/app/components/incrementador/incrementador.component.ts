import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', { static: false }) txtProgress: ElementRef;

  @Input('nombre') public leyenda: string = 'Leyenda';
  @Input() public progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges( newValue: number ): void {

    // const elementHTML1: any = document.getElementsByName('progreso')[0];
    // const elementHTML2: any = document.getElementsByName('progreso')[1];

    if (newValue >= 100) {
      this.progreso = 100;

    } else if (newValue <= 0) {
      this.progreso = 0;

    } else {
      this.progreso = newValue;
    }

    // elementHTML1.value = this.progreso;
    // elementHTML2.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor( valor: number): void {

    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;

    } else if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;

    } else {
      this.progreso += valor;
    }
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

}
