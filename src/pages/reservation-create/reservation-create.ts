import { Departamento } from './../../models/Departamento';
import { Sala } from './../../models/Sala';
import { Disciplina } from './../../models/Disciplina';
import { DisciplinaServiceProvider } from './../../providers/disciplina-service/disciplina-service';
import { Login } from './../../models/Login';
import { DepartamentoServiceProvider } from './../../providers/departamento-service/departamento-service';
import { UsuarioServiceProvider } from './../../providers/usuario-service/usuario-service';
import { Usuario } from './../../models/Usuario';
import { Reserva } from './../../models/Reserva';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ReservaServiceProvider } from '../../providers/reserva-service/reserva-service';
import { SalaServiceProvider } from '../../providers/sala-service/sala-service';
import { Encapsular } from '../../models/Encapsular';

const DAYS_AHEAD = 21; // 3 semanas a frente --> 21 dias
const YEAR_AHEAD = 365; // 1 ano a frente --> 365 dias

@IonicPage()
@Component({
  selector: 'page-reservation-create',
  templateUrl: 'reservation-create.html',
})
export class ReservationCreatePage {
  today: string;
  threeWeeks: string;
  reservation: Reserva;
  login: Login = new Login(1, "admin", "", 4);
  user: Usuario = new Usuario();

  //Vetores de dados
  disciplines: Disciplina[];
  departaments: Departamento[];
  rooms: Sala[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userProvider: UsuarioServiceProvider, private departamentProvider: DepartamentoServiceProvider,
    private reservationProvider: ReservaServiceProvider, private disciplineProvider: DisciplinaServiceProvider,
    private roomProvider: SalaServiceProvider, private toastCtrl: ToastController
  ) {
    this.reservation = this.navParams.get("reservation") || new Reserva();
    this.today = new Date().toISOString();
    this.threeWeeks = this.setDaysAhead(DAYS_AHEAD);
    //this.login = this.navParams.get("login"); //<-- Substituir para login
    this.linkRelationship();
  }

  public async linkRelationship() {
    await this.callLoadUser();
    await this.callLoadDepartament();
    await this.callLoadRoom();
  }

  setDaysAhead(days: number): string {
    let weeksAhead = new Date();
    weeksAhead.setDate(weeksAhead.getDate() + days);
    return weeksAhead.toISOString();
  }

  callLoadUser() {
    this.userProvider.loadUserById(this.login.id)
      .then( (data: Usuario) => {
        this.user = data;
        this.reservation.iddepartamento = this.user.id_departamento;
        this.callLoadDiscipline(this.user.id_disciplinas);
      }, (error) => {
        console.log("Ocorreu um erro ao carregar o usuário", error);
      });
  }

  callLoadDiscipline(id: string) {
    this.disciplineProvider.loadDisciplineById(id)
      .then( (data: Array<Disciplina>) => {
        this.disciplines = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar disciplinas", error);
      });
  }

  callLoadRoom() {
    this.roomProvider.loadRoom()
      .then( (data: Array<Sala>) => {
        this.rooms = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar salas", error);
      });
  }

  callLoadDepartament() {
    this.departamentProvider.loadDepartament()
      .then( (data: Array<Departamento>) => {
        this.departaments = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os Departamentos", error);
      })
  }

  confirmationAlert() {
    let toast = this.toastCtrl.create({
      message: 'Operação realizada com sucesso!',
      duration: 1500
    });
    toast.present();
  }

  checkChosen() {
    if (this.reservation.tipoaula >= 5) {
      this.threeWeeks = this.setDaysAhead(YEAR_AHEAD);
    } else {
      this.threeWeeks = this.setDaysAhead(DAYS_AHEAD);
    }
  }

  save() {
    let encapsulate = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.reservation), "");
    console.log(JSON.stringify(encapsulate));
    this.reservationProvider.insertReservation(encapsulate)
      .then( (resp) => {
        if (resp) {
          this.confirmationAlert();
          this.navCtrl.pop();
        }
      }, (error) => {
        console.log('Error = '+JSON.stringify(error));
      });
  }
}
