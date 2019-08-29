import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/guards/auth.guard';
import { AdminGuard } from '../services/guards/admin.guard';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
// Mantenimientos
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ClinicasComponent } from './clinicas/clinicas.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { RenewGuard } from '../services/guards/renew.guard';


const pagesRoutes: Routes = [
  { path: '', component: PagesComponent, canActivate: [ AuthGuard ], children: [
    { path: 'dashboard', component: DashboardComponent, canActivate: [ RenewGuard ], data: { titulo: 'Dashboard' } },
    { path: 'profile', component: ProfileComponent, data: { titulo: 'Profile' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Settings' } },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
    { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'buscador' } },
    // Mantenimientos
    { path: 'usuarios', component: UsuariosComponent, canActivate: [ AdminGuard ], data: { titulo: 'Mantenimiento de Usuarios' } },
    { path: 'clinicas', component: ClinicasComponent, data: { titulo: 'Mantenimiento de Clinicas' } },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard'  }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild( pagesRoutes )],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
