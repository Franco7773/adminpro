import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public usuario: Usuario;
  public imagenTemporal: any;
  public imagenSubir: File;

  constructor( private usuarioService: UsuarioService ) {

    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {

    if (!this.usuario.google ) {

      this.usuario.email = usuario.email;
    } else if ( usuario.nombre.length > 3 && usuario.email.length > 7) {

      this.usuario.nombre = usuario.nombre;
      this.usuarioService.actualizarUsuario( this.usuario ).subscribe();
    }
  }

  seleccionImagen( archivo: File ) {

    if (!archivo) {

      this.imagenSubir = null;
      return;
    } else if (archivo.type.indexOf('image') < 0) {
      Swal('Sólo se aceptan imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemporal = reader.result;
  }

  cambiarImagen() {
    this.usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }
}
