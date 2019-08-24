import { Component, OnInit } from '@angular/core';
import { UploadFileService, ModalUploadService } from 'src/app/services/service.index';
import Swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public imagenTemporal: any;
  private imagenSubir: File;

  constructor( private uploadService: UploadFileService, public modalUploadService: ModalUploadService ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemporal = null;
    this.imagenSubir = null;

    this.modalUploadService.ocultarModal();
  }

  seleccionImagen( archivo: File ) {

    if (!archivo) {

      this.imagenSubir = null;
      return;
    } else if (archivo.type.indexOf('image') < 0) {
      Swal('Sólo se aceptan imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemporal = reader.result;
  }

  subirImagen() {
    this.uploadService.subirArchivo( this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id )
        .then( resp => {
          this.modalUploadService.notificacion.emit( resp );
          this.cerrarModal();
        }).catch( err => console);
  }
}
