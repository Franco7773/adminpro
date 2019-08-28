import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert';
import { UploadFileService } from '../uploads/upload-file.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario = null;
  public token: string = '';
  public menu: any[] = [];

  constructor( public http: HttpClient, private router: Router, private uploadFileService: UploadFileService ) {

    // this.cargarStorage();
  }

  loginGoogle( tokenGG: string ) {

    const url = `${ URL_SERVICIOS }/login/google`;
    return this.http.post( url, { tokenGG }).pipe( map( (resp: any) => {
      // console.log(resp);
      this.guardarSession( resp );
      console.log('token de google: ' + resp.token);
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
    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => this.guardarSession( resp )),
      catchError( err => {
        console.error('HTTP Error', err.status);
        Swal(err.error.msg, 'Verifica que hayas colocado el correo y la contraseña correctamente', 'error');
        throw err;
    }));
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
      Swal('Usuario creado exitosamente', usuario.email, 'success');
      return resp.usuario;
    }),
    catchError( err => {
      console.error('HTTP Error', err.status);
      Swal(err.error.msg, err.error.errors.message, 'error');
      throw err;
  }));
  }

  loginGuard() {
    return ( this.token.length > 7 ) ? true : false;
  }

  guardarSession( resp ) {
    sessionStorage.setItem( 'id', resp.ID );
    sessionStorage.setItem( 'token', resp.token );
    sessionStorage.setItem( 'usuario', JSON.stringify( resp.usuario ));
    sessionStorage.setItem( 'menu', JSON.stringify( resp.menu ));

    this.usuario = resp.usuario;
    this.token = resp.token;
    this.menu = resp.menu;
  }
  // cargarStorage() {
  //   if ( sessionStorage.getItem('token')) {
  //     this.token = sessionStorage.getItem('token');
  //     this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
  //     this.menu = JSON.parse(sessionStorage.getItem('menu'));
  //   } else {
  //     this.token = '';
  //     this.usuario = null;
  //     this.menu = [];
  //   }
  // }
  actualizarUsuario( usuario: Usuario ) {
    console.log(usuario);
    const url = `${ URL_SERVICIOS }/usuario/${ usuario._id }?token=${ this.token }`;

    return this.http.put( url, usuario ).pipe( map( (resp: any) => {

      if ( usuario._id === this.usuario._id ) {
        // this.guardarSession( resp.usuario );
        sessionStorage.setItem( 'usuario', JSON.stringify( resp.usuario ));
      }
      Swal('Usuario actualizado', usuario.nombre, 'success');
      return true;
    }),
    catchError( err => {
      console.error('HTTP Error', err.status);
      Swal(err.error.msg, err.error.errors.message, 'error');
      throw err;
  }));
  }

  cambiarImagen( file: File, id: string ) {

    this.uploadFileService.subirArchivo( file, 'usuarios', id ).then( (resp: any) => {

      this.usuario.img = resp.usuario.img;
      // this.guardarSession( this.usuario );
      sessionStorage.setItem( 'usuario', JSON.stringify( this.usuario ));
      Swal(resp.msg, resp.usuario.nombre, 'success');

    }). catch( err => console.log('error al cambiar de imagen: ', err));
  }

  cargarUsuarios( desde: number = 0 ) {

    const url = `${ URL_SERVICIOS }/usuario?desde=${ desde }`;

    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {

    const url = `${ URL_SERVICIOS }/busqueda/coleccion/usuarios/${ termino }`;

    return this.http.get( url ).pipe( map( resp => (resp as any).usuarios));
  }

  borrarUsuario( idBorrar: string ) {

    const url = `${ URL_SERVICIOS }/usuario/${ idBorrar }?token=${ this.token }`;

    return this.http.delete( url ).pipe( map( () => {
      Swal( 'Listo', 'El usuario a sido eliminado exitosamente', 'success' );
      return true;
    }));
  }
}
