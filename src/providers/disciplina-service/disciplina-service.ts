import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConexaoProvider } from '../conexao/conexao';

@Injectable()
export class DisciplinaServiceProvider extends ConexaoProvider{

  constructor(public http: Http) {
    super()
  }

  loadDisciplineById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri+'disciplina/carregarDisciplinasPorId/'+id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  loadDiscipline() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri+'disciplina/carregarDisciplina')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  removeDiscipline(encapsulado) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUri+'disciplina/removeDisciplina', JSON.stringify(encapsulado),
          {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  updateDiscipline(encapsulate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUri+'disciplina/alterarDisciplina', JSON.stringify(encapsulate),
          {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  insertDiscipline(encapsulate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUri+'disciplina/cadastrarDisciplina', JSON.stringify(encapsulate),
          {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

}
