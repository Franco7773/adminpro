import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public subscription: Subscription;

  constructor() {

    this.subscription = this.regresarObservable().pipe( retry(2) ).subscribe(

      numero => console.log(numero),
      err => console.error('Error en el obs ', err),
      () => console.log('El Obs termino')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  regresarObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval(() => {

        contador++;

        const salida = {
          salida: contador
        };

        observer.next( salida );

        if ( contador >= 3) {
          clearInterval( intervalo );
          observer.complete();
        }//  else if ( contador === 2 ) {
        //   clearInterval( intervalo );
        //   observer.error('Auxilio!');
        // }
      }, 1000);
    }).pipe( map( resp => resp.valor), filter( (valor, index) => {
      if ((valor % 2) === 1) {
        return true;
      } else {
        return false;
      }
    }));
  }

}
