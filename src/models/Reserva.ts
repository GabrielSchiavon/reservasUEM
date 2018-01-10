export class Reserva {
  id: number;
  iddepartamento: number;
  idusuario: number;
  tipoaula: number;
  iddisciplina: number;
  tipo: number;
  dataefetuacao: string;
  proximoid: number;
  datareserva: string;
  periodo: number;
  tiposala: number;
  idsala: number;
  status: number;

  constructor(id?: number, iddepartamento?: number, idusuario?: number, tipoaula?: number,
    iddisciplina?: number, tipo?: number, dataefetuacao?: string, proximoid?: number,
    datareserva?: string, periodo?: number, tiposala?: number, idsala?: number, status?: number) {
      if (id) {
        this.id = id;
        this.iddepartamento = iddepartamento;
        this.idusuario = idusuario;
        this.tipoaula = tipoaula;
        this.iddisciplina = iddisciplina;
        this.tipo = tipo;
        this.dataefetuacao = dataefetuacao;
        this.proximoid = proximoid;
        this.datareserva = datareserva;
        this.periodo = periodo;
        this.tiposala = tiposala;
        this.idsala = idsala;
        this.status = status;
      } else {
        this.id = -1;
        this.idusuario = -1;
        this.tipoaula = 1;
        this.tipo = -1;
        this.dataefetuacao = new Date().toISOString();
        this.proximoid = -1;
        this.datareserva = new Date().toISOString();
        this.tiposala = -1;
        this.status = 0;
      }
    }
}
