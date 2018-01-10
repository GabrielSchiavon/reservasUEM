import { DepartamentoServiceProvider } from './../../providers/departamento-service/departamento-service';
import { Curso } from './../../models/Curso';
import { Departamento } from './../../models/Departamento';
import { Login } from './../../models/Login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CursoServiceProvider } from '../../providers/curso-service/curso-service';
import { Encapsular } from '../../models/Encapsular';

@IonicPage()
@Component({
  selector: 'page-curso-create',
  templateUrl: 'curso-create.html',
})
export class CursoCreatePage {

  login: Login;
  isCadastro: boolean;
  departamentos: Departamento;
  curso: Curso;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private departamentoProvider: DepartamentoServiceProvider,
    private cursoProvider: CursoServiceProvider,
  ) {
    this.isCadastro = this.navParams.get("isCadastro") || false;
    this.login = this.navParams.get("login") || new Login();
    this.departamentos = this.navParams.get("departamentos") || new Departamento();
    this.curso = this.navParams.get("curso") || new Curso();
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
      let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.curso), "");
      this.cursoProvider.insertCourse(encapsular)
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
      let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.curso), "");
      this.cursoProvider.updateCourse(encapsular)
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
