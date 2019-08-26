import { Injectable } from '@angular/core';
import { Clinica } from '../../models/clinica.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert';

@Injectable()
export class ClinicaService {

  public token: string = '';
  public desde: number;

  constructor( private http: HttpClient ) { }

  cargarClinicas( desde: number ) {

    const url: string = `${ URL_SERVICIOS }/clinica?desde=${ desde }`;

    return this.http.get( url ).pipe( map( resp => resp));
  }
  cargarClinicasArray( desde: number, hasta: number ) {

    const url: string = `${ URL_SERVICIOS }/clinica?desde=${ desde }?hasta=${ hasta }`;

    return this.http.get( url ).pipe( map( (resp: any) => resp.clinicas));
  }

  obtenerClinica( id: string ) {

    const url: string = `${ URL_SERVICIOS }/clinica/${ id }?token=${ this.token }`;

    return this.http.get( url ).pipe( map( (resp: any) => resp.clinica));
  }

  borrarClinica( id: string ) {

    const url: string = `${ URL_SERVICIOS }/clinica/${ id }?token=${ this.token }`;

    return this.http.delete( url ).pipe( map( (resp: any) => {
      Swal('Listo', 'la clinica ' + resp.clinica.nombre + ' a sido eliminada exitosamente', 'success');
    }));
  }

  crearClinica( nombre: string ) {

    const url: string = `${ URL_SERVICIOS }/clinica?token=${ this.token }`;

    return this.http.post(url, { nombre }).pipe( map( (resp: any) => resp.clinica ));
  }

  buscarClinica( termino: string = '') {

    const url = `${ URL_SERVICIOS }/busqueda/coleccion/clinicas/${ termino }`;

    return this.http.get( url ).pipe( map( (resp: any) => resp.clinicas));
  }

  actualizarClinica( clinica: Clinica ) {

    const url: string = `${ URL_SERVICIOS }/clinica/${ clinica._id }?token=${ this.token }`;
    const nombre = clinica.nombre;
    console.log(nombre);

    return this.http.put( url, clinica ).pipe( map( (resp: any) => resp.clinica));
  }
}
