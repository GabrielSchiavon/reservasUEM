import { ConexaoProvider } from './../conexao/conexao';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AnoLetivoServiceProvider extends ConexaoProvider  {

  constructor(public http: Http) {
    super();
  }

  loadAcademicYearISO8601() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri+'anoLetivo/carregarAnoLetivoISO8601')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  loadAcademicYear() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri+'anoLetivo/carregarAnoLetivo')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  removeAcademicYear(encapsulado) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUri+'anoLetivo/removeAnoLetivo', JSON.stringify(encapsulado),
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

  updateAcademicYear(encapsulate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUri+'anoLetivo/alterarAnoLetivo', JSON.stringify(encapsulate),
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

  insertAcademicYear(encapsulate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUri+'anoLetivo/cadastrarAnoLetivo', JSON.stringify(encapsulate),
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
