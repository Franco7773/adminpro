import { Component, OnInit } from '@angular/core';
import { Clinica } from '../../models/clinica.model';
import { ClinicaService, ModalUploadService } from '../../services/service.index';
import Swal from 'sweetalert';

@Component({
  selector: 'app-clinica',
  templateUrl: './clinicas.component.html',
  styles: []
})
export class ClinicasComponent implements OnInit {

  public cargando: boolean = true;
  public clinicas: Clinica[] = [];
  public totalRegistros: number = 0;
  private desde: number = 0;

  constructor( private clinicaService: ClinicaService, private modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.clinicaService.token = sessionStorage.getItem('token');

    this.modalUploadService.notificacion.subscribe( () => this.cargarClinicas());

    this.cargarClinicas();
  }

  cargarClinicas() {
    this.cargando = true;

    this.clinicaService.cargarClinicas( this.desde ).subscribe( (resp: any) => {
      this.clinicas = resp.clinicas;
      this.totalRegistros = resp.total;

      this.cargando = false;
    });
  }

  buscarClinica( termino: string ) {

    if (termino.length <= 0) {
      this.cargarClinicas();
      return;
    }
    this.clinicaService.buscarClinica( termino ).subscribe( (clinicasDB: Clinica[]) => this.clinicas = clinicasDB);
  }

  crearClinica() {

    (Swal as any)({
      title: '¿Cuál será el nombre de la Clínica?',
      content: 'input',
      buttons: true,
      dangerMode: true
    }).then( nombre => {
      console.log(nombre);
      if (nombre.length >= 3 && nombre.length <= 50) {
        this.clinicaService.crearClinica( nombre ).subscribe( () => this.cargarClinicas());
        Swal('Clinica creada exitosamente', nombre, 'success');
      }
    });
  }

  guardarClinica( clinica: Clinica ) {

    this.clinicaService.actualizarClinica( clinica ).subscribe( resp => {
      Swal('Listo', 'la clinica ' + resp.nombre + ' a sido actualizada', 'success');

      this.cargarClinicas();
    });
  }

  borrarClinica( clinica: Clinica ) {

    (Swal as any)({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar la clinica: ${ clinica.nombre }`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if (borrar) {
        this.clinicaService.borrarClinica( clinica._id ).subscribe( () => this.cargarClinicas());
      }
    });
  }

  beforeAndNext( valor: number) {
    const desde = this.desde + valor;

    if (desde < 0 || desde >= this.totalRegistros) {
      return;
    } else {
      this.desde += valor;
      this.cargarClinicas();
    }
  }

  mostrarModal( id: string ) {
    this.modalUploadService.mostrarModal( 'clinicas', id );
  }
}
