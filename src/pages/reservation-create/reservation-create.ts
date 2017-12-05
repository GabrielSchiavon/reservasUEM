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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservaServiceProvider } from '../../providers/reserva-service/reserva-service';
import { SalaServiceProvider } from '../../providers/sala-service/sala-service';

@IonicPage()
@Component({
  selector: 'page-reservation-create',
  templateUrl: 'reservation-create.html',
})
export class ReservationCreatePage {

  today: string;
  reservation: Reserva;
  login: Login = new Login();
  user: Usuario = new Usuario();

  //Vetores de dados
  disciplines: Disciplina[];
  departaments: Departamento[];
  rooms: Sala[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userProvider: UsuarioServiceProvider, private departamentProvider: DepartamentoServiceProvider,
    private reservationProvider: ReservaServiceProvider, private disciplineProvider: DisciplinaServiceProvider,
    private roomProvider: SalaServiceProvider
  ) {
    this.reservation = this.navParams.get("reservation") || new Reserva();
    this.today = new Date().toISOString();
    //this.login = this.navParams.get("login"); <-- Substituir para login
    this.login.id = 1;
    this.linkRelationship();
  }

  public async linkRelationship() {
    await this.callLoadUser();
    await this.callLoadDepartament();
    await this.callLoadRoom();
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
}
