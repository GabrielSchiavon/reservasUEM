import { ConexaoProvider } from './../conexao/conexao';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioServiceProvider extends ConexaoProvider {

  constructor(public http: Http) {
    super();
  }

  loadUserById(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri+'usuario/carregarUsuarioPorId/'+id.toString())
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  loadUser() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri+'usuario/carregarUsuario')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  removeUser(encapsulado) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUri+'usuario/removeUsuario', JSON.stringify(encapsulado),
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

  updateUser(encapsulate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUri+'usuario/alterarUsuario', JSON.stringify(encapsulate),
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

  insertUser(encapsulate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUri+'usuario/cadastrarUsuario', JSON.stringify(encapsulate),
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
