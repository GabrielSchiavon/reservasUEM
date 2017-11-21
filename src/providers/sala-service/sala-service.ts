import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConexaoProvider } from '../conexao/conexao';

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
      this.http.get(this.baseUri + 'sala/carregarSala')
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
