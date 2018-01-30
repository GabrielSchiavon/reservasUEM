import { Encapsular } from './../../models/Encapsular';
import { DisciplinaServiceProvider } from './../../providers/disciplina-service/disciplina-service';
import { Disciplina } from './../../models/Disciplina';
import { Curso } from './../../models/Curso';
import { Departamento } from './../../models/Departamento';
import { Login } from './../../models/Login';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-disciplina-create',
  templateUrl: 'disciplina-create.html',
})
export class DisciplinaCreatePage {

  login: Login;
  isCadastro: boolean;
  disciplina: Disciplina;
  departamentos: Departamento[];
  cursos: Curso[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private disciplinaProvider: DisciplinaServiceProvider,
    private menuCtrl: MenuController
  ) {
    this.disciplina = this.navParams.get("disciplina") || new Disciplina();
    this.departamentos = this.navParams.get("departamentos") || [];
    this.cursos = this.navParams.get("cursos");
    this.isCadastro = this.navParams.get("isCadastro") || false;
    this.login = this.navParams.get("login");
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
      let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.disciplina), "");
      this.disciplinaProvider.insertDiscipline(encapsular)
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
      let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.disciplina), "");
      this.disciplinaProvider.updateDiscipline(encapsular)
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
