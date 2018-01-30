import { ReservaUsuario } from './../../models/ReservaUsuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private reservaProvider: ReservaServiceProvider, private actionSheetCtrl: ActionSheetController) {
    this.carregaReserva();
  }

  public async carregaReserva() {
    await this.reservaProvider.loadReservation(1)
      .then ( 
        (data: ReservaUsuario[]) => {
          this.reservaConfirmadas = data.filter( reserva => reserva.status == 2 );
          this.reservaPendentes = data.filter( reserva => reserva.status == 1 ); 
          this.reservaFinalizadas = data.filter( reserva => reserva.status <= 0 );
        },
        (error) => console.log(error) );
  }

  public exibirActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      //title: "Reserva",
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Cancelar Reserva',
          role: 'destructive',
          handler: () => {}
        },
        {
          text: 'Modificar',
          handler: () => {}
        },
        {
          text: 'Fechar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public reservationCreate() {
    this.navCtrl.push('ReservationCreatePage');
  }
}
