import { SalaServiceProvider } from './../../providers/sala-service/sala-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Departamento } from '../../models/Departamento';
import { DepartamentoServiceProvider } from '../../providers/departamento-service/departamento-service';
import { Reserva } from '../../models/Reserva';
import { ReservaServiceProvider } from '../../providers/reserva-service/reserva-service';
import { Login } from '../../models/Login';
import { Storage } from '@ionic/storage';
import { Sala } from '../../models/Sala';

@IonicPage()
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html',
})
export class ReservaPage {
  today: string;
  login: Login;

  selectedDepartament: number;
  departaments: Departamento[] = [];

  reservation: Reserva;
  reservations: Reserva[] = [];

  posRoom: number;
  selectedRoom: Sala;
  rooms: Sala[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public departamentoService: DepartamentoServiceProvider,
    public reservaService: ReservaServiceProvider,
    public salaService: SalaServiceProvider,
    private storage: Storage
  ) {

    this.today = new Date().toISOString();
    this.selectedRoom = new Sala();
    this.posRoom = 0;
    this.loadResources();
    
  }

  async loadResources() {
    await this.storage.get("login")
      .then((login) => this.login = login);

    await this.departamentoService.loadDepartament()
      .then((value: Departamento[]) => {
        this.departaments = value;
        this.selectedDepartament = this.departaments[0].id;
      });

    await this.salaService.loadRoomByDepartament(this.selectedDepartament)
      .then((value: Sala[]) => {
        this.rooms = value;
        this.selectedRoom = this.rooms[0];
        console.log(this.selectedRoom);
      });

    await this.reservaService.loadReservationToday(this.today, this.selectedDepartament)
      .then((value: Reserva[]) => this.reservations = value);
  }

  refreshReservation() {
    this.reservaService.loadReservationToday(this.today, this.selectedDepartament)
      .then((value: Reserva[]) => {
        this.reservations = value;
        console.log(this.reservations);
      });
  }

  backRoom(){
    if (this.posRoom > 0) {
      this.posRoom -= 1;
    } else {
      this.posRoom = this.rooms.length-1;
    }
    this.selectedRoom = this.rooms[this.posRoom];
  }

  nextRoom(){
    if (this.posRoom < (this.rooms.length-1)) {
      this.posRoom += 1;
    } else {
      this.posRoom = 0;
    }
    this.selectedRoom = this.rooms[this.posRoom];
  }
}
