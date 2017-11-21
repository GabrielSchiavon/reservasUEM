import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConexaoProvider } from '../conexao/conexao';

@Injectable()
export class UsuarioServiceProvider extends ConexaoProvider {

  constructor(public http: Http) {
    super();
  }

}
