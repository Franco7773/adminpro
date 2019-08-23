import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../services/guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';


const pagesRoutes: Routes = [
  { path: '', component: PagesComponent, canActivate: [ AuthGuard ], children: [
    { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
    { path: 'profile', component: ProfileComponent, data: { titulo: 'Profile' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Settings' } },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
    { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild( pagesRoutes )],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
