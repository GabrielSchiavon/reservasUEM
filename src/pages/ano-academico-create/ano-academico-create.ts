import { AnoLetivoServiceProvider } from './../../providers/ano-letivo-service/ano-letivo-service';
import { AnoLetivo } from './../../models/AnoLetivo';
import { Departamento } from './../../models/Departamento';
import { Login } from './../../models/Login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { Encapsular } from '../../models/Encapsular';

@IonicPage()
@Component({
  selector: 'page-ano-academico-create',
  templateUrl: 'ano-academico-create.html',
})
export class AnoAcademicoCreatePage {

  login: Login;
  isCadastro: boolean;
  departamentos: Departamento;
  anoLetivo: AnoLetivo;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private anoLetivoProvider: AnoLetivoServiceProvider,
    private menuCtrl: MenuController
  ) {
    this.isCadastro = this.navParams.get("isCadastro") || false;
    this.login = this.navParams.get("login") || new Login();
    this.departamentos = this.navParams.get("departamentos") || new Departamento();
    this.anoLetivo = this.navParams.get("anoLetivo") || new AnoLetivo();
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

  changeDateToString(value: any): string {
    return value.year.toString() + '-' + value.month.toString() + '-' + value.day.toString();
  }

  salvar() {
    if (this.isCadastro) { //se for cadastro
      let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.anoLetivo), "");
      this.anoLetivoProvider.insertAcademicYear(encapsular)
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
      let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.anoLetivo), "");
      this.anoLetivoProvider.updateAcademicYear(encapsular)
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
