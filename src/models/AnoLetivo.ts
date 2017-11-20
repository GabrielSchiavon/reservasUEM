export class AnoLetivo {
  id: number;
  iddepartamento: number;
  iniciap: string;
  fimp: string;
  inicias: string;
  fims: string;
  status: number

  constructor (id?: number, iddepartamento?: number, iniociop?: string, fimp?: string,
    inicios?: string, fims?:string, status?: number) {
      if (id) {
        this.id = id;
        this.iddepartamento = iddepartamento;
        this.iniciap = iniociop;
        this.fimp = fimp;
        this.inicias = inicios;
        this.fims = fims;
        this.status = status;
      } else {
        id = -1;
        this.iniciap = "";
        this.inicias = "";
        this.fimp = "";
        this.fims = "";
        status = 0;
      }
    }
}
