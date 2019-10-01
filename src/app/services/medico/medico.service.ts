import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public totalMedicos: number = 0;
  public token: string = '';

  constructor( private http: HttpClient ) { }

  cargarMedicos() {

    const url: string = `${ URL_SERVICIOS }/medico`;

    return this.http.get( url ).pipe( map( (resp: any) => {
      this.totalMedicos = resp.total;

      return resp.medicos;
    }));
  }

  cargarUnMedico( id: string ) {

    const url = `${ URL_SERVICIOS }/medico/${ id }`;

    return this.http.get( url ).pipe( map( (resp: any) => resp.medico));
  }

  buscarMedicos( termino: string ) {
    console.log(termino + ' AL FIN');
    const url: string = `${ URL_SERVICIOS }/busqueda/coleccion/medicos/${ termino }`;

    return this.http.get( url ).pipe( map( (resp: any) => resp.medicos));
  }

  borrarMedico( id: string ) {

    const url: string = `${ URL_SERVICIOS }/medico/${ id }?token=${ this.token }`;

    return this.http.delete( url ).pipe( map( (resp: any) => {
      Swal('Listo', 'El médico ' + resp.medico.nombre + ' a sido eliminada', 'success');
      return resp;
    }));
  }

  guardarMedico( medico: Medico ) {

    let url: string = `${ URL_SERVICIOS }/medico`;

    if (medico._id) {
      // Actualizando
      url += `/${ medico._id }?token=${ this.token }`;

      return this.http.put( url, medico ).pipe( map( (resp: any) => {
        Swal('Listo', 'El médico ' + resp.medico.nombre + ' a sido Actualizado', 'success');
        return resp.medico;
      }));
    } else {
      // Creando
      url += `?token=${ this.token }`;

      return this.http.post( url, medico ).pipe( map( (resp: any) => {
        Swal('Listo', 'El médico ' + resp.medico.nombre + ' a sido creado', 'success');
        return resp.medico;
      }));
    }
  }
}
