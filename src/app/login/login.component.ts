import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('btnGoogle', { static: false }) btnGoogle: ElementRef<HTMLButtonElement>;

  public recuerdame: boolean = false;
  public email: string;

  private auth2: any;

  constructor( private router: Router,
              //  private renderer: Renderer2,
               private usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {

      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load( 'auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '647785643800-ka77du6bdkujv4407hvcnf460bce3966.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( this.btnGoogle );
    });
  }
  attachSignin( element: ElementRef<HTMLButtonElement> ) {
    this.auth2.attachClickHandler( element.nativeElement, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      // console.log(token, profile);
      this.usuarioService.loginGoogle( token ).subscribe( () => window.location.href = '#/dashboard');
    });
  }

  ingresar( forma: NgForm ) {

    if (forma.invalid) {
      return;
    }

    const { email, password, recuerdame } = forma.value;
    const usuario = new Usuario( null, email, password );

    this.usuarioService.login( usuario, recuerdame ).subscribe( () => this.router.navigate([ '/dashboard' ]) );
  }
}
