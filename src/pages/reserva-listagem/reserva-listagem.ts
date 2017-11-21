import { ReservaUsuario } from './../../models/ReservaUsuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReservaServiceProvider } from '../../providers/reserva-service/reserva-service';

@IonicPage()
@Component({
  selector: 'page-reserva-listagem',
  templateUrl: 'reserva-listagem.html',
})
export class ReservaListagemPage {

  reservaConfirmadas: ReservaUsuario[] = [];
  reservaPendentes: ReservaUsuario[] = [];
  reservaFinalizadas: ReservaUsuario[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public reservaProvider: ReservaServiceProvider) {
    this.carregaReserva();
  }

  async carregaReserva() {
    await this.reservaProvider.loadReservation(1)
      .then ( 
        (data: ReservaUsuario[]) => {
          this.reservaConfirmadas = data.filter( reserva => reserva.status == 2 );
          this.reservaPendentes = data.filter( reserva => reserva.status == 1 ); 
          this.reservaFinalizadas = data.filter( reserva => reserva.status <= 0 ); 
          console.log(this.reservaPendentes); 
        },
        (error) => console.log(error) );
  }

}
