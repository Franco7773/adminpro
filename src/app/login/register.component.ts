import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.scss']
})
export class RegisterComponent implements OnInit {

  public forma: FormGroup;

  constructor( private usuarioService: UsuarioService,
               private router: Router ) { }

  sonIguales( passw1: string, passw2: string ) {

    return ( group: FormGroup ) => {

      const pw1 = group.controls[passw1].value;
      const pw2 = group.controls[passw2].value;

      if (pw1 === pw2) {
        return null;
      } else {

        return {
          sonIguales: false
        };
      }
    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password', 'password2' ) });
  }

  registrarUsers() {
    if (this.forma.invalid) {
      return;
    } else if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }

    const { nombre, email, password } = this.forma.value;
    const usuario = new Usuario( nombre, email, password );

    this.usuarioService.crearUser( usuario ).subscribe( RESP => this.router.navigate(['/login']));
  }
}
