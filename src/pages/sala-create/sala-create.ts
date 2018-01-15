import { Sala } from './../../models/Sala';
import { Departamento } from './../../models/Departamento';
import { Login } from './../../models/Login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SalaServiceProvider } from '../../providers/sala-service/sala-service';
import { Encapsular } from '../../models/Encapsular';

@IonicPage()
@Component({
  selector: 'page-sala-create',
  templateUrl: 'sala-create.html',
})
export class SalaCreatePage {

  login: Login;
  isCadastro: boolean;
  departamentos: Departamento;
  sala: Sala;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private salaProvider: SalaServiceProvider
  ) {
    this.isCadastro = this.navParams.get("isCadastro") || false;
    this.login = this.navParams.get("login") || new Login();
    this.departamentos = this.navParams.get("departamentos") || new Departamento();
    this.sala = this.navParams.get("sala") || new Sala();
  }

  exibirMensagem(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 1500
    });
    toast.present();
  }

  salvar() {
    if (this.isCadastro) { //se for cadastro
      let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.sala), "");
      this.salaProvider.insertRoom(encapsular)
        .then( (resp) => {
          if (resp === 1) {
            this.exibirMensagem('Operação realizada com sucesso!');
            this.navCtrl.pop();
          } else {
            this.exibirMensagem('Não possui permissão para essa operação!');
          }
        }, (error) => {
          this.exibirMensagem('Ocorreu um erro! Tente novamente');
        });
    } 
    else { //senão, é atualizacao
      let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.sala), "");
      this.salaProvider.updateRoom(encapsular)
        .then( (resp) => {
          if (resp === 1) {
            this.exibirMensagem('Operação realizada com sucesso!');
            this.navCtrl.pop();
          } else {
            this.exibirMensagem('Não possui permissão para essa operação!');
          }
        }, (error) => {
          this.exibirMensagem('Ocorreu um erro! Tente novamente');
        });
    }
  }

}
