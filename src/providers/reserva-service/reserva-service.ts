import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ConexaoProvider } from '../conexao/conexao';

@Injectable()
export class ReservaServiceProvider extends ConexaoProvider {

  constructor(public http: Http) {
    super();
  }

  loadReservation(idUser: number) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri + 'reserva/carregarReservaPorUsuario/' + idUser.toString())
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  loadReservationToday(day: string, idDepart: number) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri+'reserva/carregarReservaPorDia/'+day+'/'+idDepart)
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
