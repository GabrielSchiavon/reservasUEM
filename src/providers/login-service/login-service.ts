import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConexaoProvider } from '../conexao/conexao';

@Injectable()
export class LoginServiceProvider extends ConexaoProvider {

  constructor(public http: Http) {
    super();
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
