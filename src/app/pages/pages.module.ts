import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Modulos
import { SharedModule } from '../shared/shared.module';

// Charts
import { ChartsModule } from 'ng2-charts';

// Componentes
import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent
  ],
  imports: [
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    CommonModule,
    ChartsModule
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafica1Component
  ]
})
export class PagesModule { }
