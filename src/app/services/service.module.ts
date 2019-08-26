import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SharedService, SidebarService, UsuarioService,
  UploadFileService, ModalUploadService, ClinicaService, MedicoService } from './service.index';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    UploadFileService,
    ModalUploadService,
    ClinicaService,
    MedicoService
  ]
})
export class ServiceModule { }
