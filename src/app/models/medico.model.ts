export class Medico {

    constructor(
        public nombre?: string,
        public img?: string,
        public usuario?: string,
        public clinica?: { _id: string, nombre: string, img: string },
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) { }
}
