export class AnoLetivo {
  id: number;
  iddepartamento: number;
  iniciop: string;
  fimp: string;
  inicios: string;
  fims: string;
  status: number

  constructor (id?: number, iddepartamento?: number, iniciop?: string, fimp?: string,
    inicios?: string, fims?:string, status?: number) {
      if (id) {
        this.id = id;
        this.iddepartamento = iddepartamento;
        this.iniciop = iniciop;
        this.fimp = fimp;
        this.inicios = inicios;
        this.fims = fims;
        this.status = status;
      } else {
        id = -1;
        this.iniciop = "";
        this.inicios = "";
        this.fimp = "";
        this.fims = "";
        status = 0;
      }
    }
}
