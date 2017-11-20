import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginServiceProvider {
  baseUri: string;

  constructor(public http: Http) {
    this.baseUri = "http://localhost:8084/AppUemWS/webresources/reserva/";
    //this.baseUri = "http://din.uem.br/appsmoveis/webresources/reserva/";
  }

  confirmLogin(email: string, senha: string){
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri+'login/confirmarLogin/'+email+'/'+senha)
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
