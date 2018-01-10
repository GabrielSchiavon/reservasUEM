import { Curso } from './../../models/Curso';
import { Login } from '../../models/Login';
import { Departamento } from '../../models/Departamento';

import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { DepartamentoServiceProvider } from '../../providers/departamento-service/departamento-service';
import { Encapsular } from '../../models/Encapsular';
import { CursoServiceProvider } from '../../providers/curso-service/curso-service';

@IonicPage()
@Component({
  selector: 'page-curso-listagem',
  templateUrl: 'curso-listagem.html',
})
export class CursoListagemPage {

  login: Login;
  departamentos: Departamento[] = [];
  cursos: Curso[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private cursoProvider: CursoServiceProvider,
    private departamentoProvider: DepartamentoServiceProvider,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.carregarDados();
  }

  async carregarDados() {
    await this.storage.get("login").then( (value) => this.login = value);
    await this.buscarCursos();
    await this.buscarDepartamentos();
  }

  private buscarCursos() {
    this.cursoProvider.loadCourse()
      .then(
      (response: Curso[]) => this.cursos = response
      );
  }

  private buscarDepartamentos() {
    this.departamentoProvider.loadDepartament()
      .then(
      (response: Departamento[]) => this.departamentos = response
      );
  }

  public exibirActionSheet(curso: Curso) {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Remover Curso',
          role: 'destructive',
          handler: () => {
            this.confirmarExclusao(curso);
          }
        },
        {
          text: 'Modificar',
          handler: () => {
            this.navCtrl.push(
              'CursoCreatePage', 
              {
                login: this.login,
                curso: curso,
                departamentos: this.departamentos
              }
            )
          }
        },
        {
          text: 'Fechar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private confirmarExclusao(curso) {
    this.alertCtrl.create({
      title: 'Confirmar operação',
      subTitle: 'Deseja realmente excluir ' + curso.nome + '?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Confirmar',
          handler: data => {
            let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(curso), "");
            this.cursoProvider.removeCourse(encapsular)
              .then( (response) => {
                if (response === 1) {
                  this.buscarCursos();
                  this.exibirMensagem('Curso removido com sucesso');
                }
              })
          }
        }
      ]
    }).present();
  }

  private exibirMensagem(mensagem: string) {
    this.toastCtrl.create({
      message: mensagem,
      duration: 1500
    }).present();
  }

  public cadastrarCurso() {
    this.navCtrl.push(
      'CursoCreatePage', 
      {
        login: this.login,
        isCadastro: true,
        departamentos: this.departamentos
      });
  }

}
