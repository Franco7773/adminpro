import { Component, OnInit } from '@angular/core';
import { Clinica } from '../../models/clinica.model';
import { Medico } from '../../models/medico.model';
import { ClinicaService, MedicoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  public clinicas: Clinica[] = [];
  public medico: Medico = new Medico( '', '', '', { _id: '', nombre: '', img: '' }, '' );
  public clinica: Clinica = new Clinica('');

  constructor( private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private modalUploadService: ModalUploadService,
               private clinicaService: ClinicaService) {

    this.activatedRoute.params.subscribe( params => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico( id );
      }
    });
  }


  ngOnInit() {

    this.clinicaService.cargarClinicasArray( 0, 777 ).subscribe( (resp: Clinica[]) => this.clinicas = resp);

    this.modalUploadService.notificacion.subscribe( (resp: any) => {
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico( id: string ) {

    this.medicoService.cargarUnMedico( id ).subscribe( (resp: Medico) => {
      console.log(resp);

      this.medico = resp;
      // this.medico.clinica._id = resp.clinica._id;
      this.cambioClinica( this.medico.clinica._id );
    });
  }

  guardarMedico( forma: NgForm ) {

    if (forma.invalid) { return; }

    this.medicoService.guardarMedico( this.medico ).subscribe( medico => {
      this.medico._id = medico._id;

      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioClinica( id: string ) {

    if (id === null) { return; }

    this.clinicaService.obtenerClinica( id ).subscribe( (resp: Clinica) => this.clinica = resp);
  }

  cambiarFoto() {

    this.modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }
}
