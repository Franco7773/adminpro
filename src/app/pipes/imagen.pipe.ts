import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import Swal from 'sweetalert';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): string {

    const url: string = `${ URL_SERVICIOS }/imagenes`;

    if (!img) {
      return `${ url }/${ tipo }s/no-image`;
    } else if (img.indexOf('https:') >= 0) {
      return img;
    } else {
      switch (tipo) {
        case 'usuario':
          return `${ url }/usuarios/${ img }`;
        case 'medico':
          return `${ url }/medicos/${ img }`;
        case 'clinica':
          return `${ url }/clinicas/${ img }`;
        default:
          Swal( 'Tipo de Imagen no Existe', 'solo se aceptan: usuarios, medicos y clinicas', 'error' );
          return `${ url }/${ tipo }s/no-image`;
      }
    }
  }
}
