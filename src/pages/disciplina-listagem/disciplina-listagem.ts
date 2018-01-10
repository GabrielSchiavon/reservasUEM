import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { CursoServiceProvider } from './../../providers/curso-service/curso-service';
import { Curso } from '../../models/Curso';
import { Departamento } from '../../models/Departamento';
import { DisciplinaServiceProvider } from './../../providers/disciplina-service/disciplina-service';
import { DepartamentoServiceProvider } from './../../providers/departamento-service/departamento-service';
import { Disciplina } from '../../models/Disciplina';
import { Login } from '../../models/Login';

import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { Encapsular } from '../../models/Encapsular';

@IonicPage()
@Component({
  selector: 'page-disciplina-listagem',
  templateUrl: 'disciplina-listagem.html',
})
export class DisciplinaListagemPage {

  login: Login;
  disciplinas: Disciplina[] = [];
  departamentos: Departamento[] = [];
  cursos: Curso[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private departamentoProvider: DepartamentoServiceProvider,
    private disciplinaProvider: DisciplinaServiceProvider,
    private cursoProvider: CursoServiceProvider,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.carregarDados();
  }

  private async carregarDados() {
    await this.storage.get("login").then( (value) => this.login = value);
    await this.carregarDepartamentos();
    await this.carregarCursos();
    await this.carregarDisciplinas();
  }

  private carregarDepartamentos() {
    this.departamentoProvider.loadDepartament()
      .then( (response: Departamento[]) => this.departamentos = response);
  }

  private carregarDisciplinas() {
    this.disciplinaProvider.loadDiscipline()
      .then( (response: Disciplina[]) =>  this.disciplinas = response)
  }

  private carregarCursos() {
    this.cursoProvider.loadCourse()
      .then( (response: Curso[]) => this.cursos = response);
  }

  public exibirActionSheet(disciplina: Disciplina) {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Remover disciplina',
          role: 'destructive',
          handler: () => {
            this.confirmarExclusao(disciplina);
          }
        },
        {
          text: 'Modificar',
          handler: () => {
            this.navCtrl.push(
              'DisciplinaCreatePage', 
              {
                login: this.login,
                disciplina: disciplina,
                departamentos: this.departamentos,
                cursos: this.cursos
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

  private confirmarExclusao(disciplina) {
    this.alertCtrl.create({
      title: 'Confirmar operação',
      subTitle: 'Deseja realmente excluir ' + disciplina.nome + '?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Confirmar',
          handler: data => {
            let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(disciplina), "");
            this.disciplinaProvider.removeDiscipline(encapsular)
              .then( (response) => {
                if (response === 1) {
                  this.carregarDisciplinas();
                  this.exibirMensagem('Disciplina removido com sucesso');
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

  public cadastrarDisciplina() {
    this.navCtrl.push(
      'DisciplinaCreatePage', 
      {
        login: this.login,
        isCadastro: true,
        departamentos: this.departamentos,
        cursos: this.cursos
      });
  }



}
