import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConexaoProvider } from '../conexao/conexao';

@Injectable()
export class CursoServiceProvider extends ConexaoProvider {

  constructor(public http: Http) {
    super();
  }

  loadCourse() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri + 'curso/carregarCurso')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  removeCourse(encapsulado) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUri + 'curso/removerCurso', JSON.stringify(encapsulado),
        { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  updateCourse(encapsulate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUri + 'curso/alterarCurso', JSON.stringify(encapsulate),
        { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  insertCourse(encapsulate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUri + 'curso/cadastrarCurso', JSON.stringify(encapsulate),
        { headers: headers })
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
