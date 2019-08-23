export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    // tslint:disable-next-line: variable-name
    public _id?: string,
    public role?: string,
    public img?: string,
    public google?: boolean ) { }
}
