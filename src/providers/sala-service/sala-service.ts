import { ConexaoProvider } from './../conexao/conexao';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SalaServiceProvider extends ConexaoProvider {

  constructor(public http: Http) {
    super();
  }

  loadRoomByDepartament(idDepart: number) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri + 'sala/carregarSalaPorDepartamento/' + idDepart)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  loadRoom() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri+'sala/carregarSala')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  removeRoom(encapsulado) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUri+'sala/removeSala', JSON.stringify(encapsulado),
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

  updateRoom(encapsulate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUri+'sala/alterarSala', JSON.stringify(encapsulate),
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

  insertRoom(encapsulate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUri+'sala/cadastrarSala', JSON.stringify(encapsulate),
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
