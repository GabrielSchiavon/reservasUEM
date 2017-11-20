import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html',
})
export class ReservaPage {
  professor: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.professor = "teste";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservaPage');
  }

}
