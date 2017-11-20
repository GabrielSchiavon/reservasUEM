import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReservaServiceProvider {
  baseUri: string;

  constructor(public http: Http) {
    this.baseUri = "http://localhost:8084/AppUemWS/webresources/reserva/";
    //this.baseUri = "http://din.uem.br/appsmoveis/webresources/reserva/";
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

}
