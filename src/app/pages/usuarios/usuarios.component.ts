import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, ModalUploadService } from '../../services/service.index';
import Swal from 'sweetalert';

// declare var Swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];
  private desde: number = 0;
  public totalRegistros: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService, public modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.modalUploadService.notificacion.subscribe( () => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;

    this.usuarioService.cargarUsuarios( this.desde ).subscribe( (resp: any) => {

      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  beforeAndNext( valor: number ) {

    const desde = this.desde + valor;

    if (desde >= this.totalRegistros || desde < 0) {
      return;
    } else {
      this.desde += valor;
      this.cargarUsuarios();
    }
  }

  buscarUsuario( termino ) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.usuarioService.buscarUsuarios( termino ).subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      // this.desde = 0;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario ) {

    if (usuario._id === this.usuarioService.usuario._id) {
      Swal('Imposible', 'No te puedes eliminar a ti mismo', 'error');
      return;
    }

    (Swal as any)({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar a ${ usuario.nombre }`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if (borrar) {
        this.usuarioService.borrarUsuario( usuario._id ).subscribe( (borrado: boolean) => this.cargarUsuarios());
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {
    this.usuarioService.actualizarUsuario( usuario ).subscribe();
  }

  mostrarModal( id: string ) {
    this.modalUploadService.mostrarModal( 'usuarios', id );
  }
}
