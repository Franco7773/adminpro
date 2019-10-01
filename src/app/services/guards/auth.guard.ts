import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private usuarioService: UsuarioService, private router: Router ) { }

  canActivate(): boolean {
    if ( this.usuarioService.loginGuard() ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canLoad(): boolean {

    if ( this.usuarioService.loginGuard() ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
