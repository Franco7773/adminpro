import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      msj => console.log('Termino ', msj),
      // () => console.log('Error')
    )
    .catch( err => console.error('Error ', err));
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {

    return new Promise<boolean>( (resolve, reject) => {

      let contador = 0;

      const intervalo = setInterval(() => {
        contador++;

        if ( contador === 3) {
          resolve(true);
          // reject('Paso algo malo');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
