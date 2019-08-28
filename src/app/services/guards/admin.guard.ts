import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService, private router: Router ) { }

  canActivate(): boolean {

    if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {

      return true;
    } else {
      console.log('Bloqueado por el Admin Guard');
      this.usuarioService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
