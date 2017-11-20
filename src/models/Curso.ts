export class Curso {
  id: number;
  IdDepartamento: number;
  nome: string;
  tipo: number;
  descricao: string;
  status: number;

  constructor(idCurso?: number, idDepartCurso?: number, nomeCurso?: string,
    tipoCurso?: number, descricaoCourse?: string, statusCurso?: number) {

      if (idCurso) {
        this.id = idCurso;
        this.IdDepartamento = idDepartCurso;
        this.nome = nomeCurso;
        this.tipo = tipoCurso;
        this.descricao = descricaoCourse;
        this.status = statusCurso;
      } else {
        this.id = -1;
      }
  }
}
