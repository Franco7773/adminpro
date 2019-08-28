import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Clinica } from '../../models/clinica.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public clinicas: Clinica[] = [];

  constructor( public activatedRoute: ActivatedRoute, private http: HttpClient ) {

    this.activatedRoute.params.subscribe( params => {
      // tslint:disable-next-line: no-string-literal
      const termino = params['termino'];
      this.buscar( termino );
    });
  }

  ngOnInit() {
  }

  buscar( termino: string ) {

    const url = `${ URL_SERVICIOS }/busqueda/todo/${ termino }`;

    this.http.get( url ).subscribe( (resp: any ) => {
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.clinicas = resp.clinicas;
    });
  }
}
