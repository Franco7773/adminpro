import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';


const pagesRoutes: Routes = [
  { path: '', component: PagesComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'account-settings', component: AccountSettingsComponent },
    { path: 'progress', component: ProgressComponent },
    { path: 'grafica1', component: Grafica1Component },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild( pagesRoutes )],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
