import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public totalRegistros: number = 0;

  constructor( private medicoService: MedicoService ) { }

  ngOnInit() {
    this.cargarMedicos();
    this.totalRegistros = this.medicoService.totalMedicos;

    this.medicoService.token = sessionStorage.getItem('token');
  }

  cargarMedicos() {

    this.medicoService.cargarMedicos().subscribe( medicos => {
      this.medicos = medicos;
    });
  }

  buscarMedico( termino: string ) {

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.medicoService.buscarMedicos( termino ).subscribe( (medicosDB: Medico[]) => this.medicos = medicosDB);
  }

  borrarMedico( medico: Medico ) {

    this.medicoService.borrarMedico( medico._id ).subscribe( () => this.cargarMedicos());
  }
}
