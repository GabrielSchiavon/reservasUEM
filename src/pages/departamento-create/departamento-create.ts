import { Encapsular } from './../../models/Encapsular';
import { Departamento } from './../../models/Departamento';
import { DepartamentoServiceProvider } from './../../providers/departamento-service/departamento-service';
import { Login } from './../../models/Login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-departamento-create',
  templateUrl: 'departamento-create.html',
})
export class DepartamentoCreatePage {

  login: Login;
  isCadastro: boolean;
  departamento: Departamento;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private departamentoProvider: DepartamentoServiceProvider,
    private menuCtrl: MenuController
  ) {
    this.isCadastro = this.navParams.get("isCadastro") || false;
    this.login = this.navParams.get("login") || new Login();
    this.departamento = this.navParams.get("departamento") || new Departamento();
  }

  ionViewCanEnter(){
    this.menuCtrl.enable(false);
   }
 
   ionViewCanLeave(){
    this.menuCtrl.enable(true);
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
      let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.departamento), "");
      this.departamentoProvider.insertDepartament(encapsular)
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
      let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.departamento), "");
      this.departamentoProvider.updateDepartament(encapsular)
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
