import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario = null;
  public token: string = '';

  constructor( public http: HttpClient, private router: Router ) {

    // this.cargarStorage();
  }

  loginGoogle( tokenGG: string ) {

    const url = `${ URL_SERVICIOS }/login/google`;
    return this.http.post( url, { tokenGG }).pipe( map( (resp: any) => {
      // console.log(resp);
      this.guardarSession( resp );
      return true;
    }));
  }

  login( usuario: Usuario, recordar: boolean ) {

    if (recordar) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }

    const url = `${ URL_SERVICIOS }/login`;
    return this.http.post( url, usuario ).pipe( map( (resp: any) => this.guardarSession( resp )));
  }
  logout() {
    this.usuario = null;
    this.token = '';
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }

  crearUser( usuario: Usuario ) {

    const url = `${ URL_SERVICIOS }/usuario`;

    return this.http.post(url, usuario).pipe( map( (resp: any) => {
      swal('Usuario creado exitosamente', usuario.email, 'success');
      return resp.usuario;
    }));
  }

  loginGuard() {
    return ( this.token.length > 7 ) ? true : false;
  }

  guardarSession( resp ) {
    sessionStorage.setItem( 'id', resp.ID );
    sessionStorage.setItem( 'token', resp.token );
    sessionStorage.setItem( 'usuario', JSON.stringify( resp.usuario ));

    this.usuario = resp.usuario;
    this.token = resp.token;
  }
  // cargarStorage() {
  //   if ( sessionStorage.getItem('token')) {
  //     this.token = sessionStorage.getItem('token');
  //     this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
  //   } else {
  //     this.token = '';
  //     this.usuario = null;
  //   }
  // }
}

