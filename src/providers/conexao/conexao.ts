import { Injectable } from '@angular/core';

@Injectable()
export class ConexaoProvider {
  baseUri: string;

  constructor() {
    //this.baseUri = "http://localhost:8084/AppUemWS/webresources/reserva/";
    this.baseUri = "http://din.uem.br/appsmoveis/webresources/reserva/";
  }

}
