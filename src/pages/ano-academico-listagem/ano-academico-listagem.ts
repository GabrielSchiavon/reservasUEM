import { AnoLetivo } from './../../models/AnoLetivo';
import { Departamento } from './../../models/Departamento';
import { Login } from './../../models/Login';
import { DepartamentoServiceProvider } from './../../providers/departamento-service/departamento-service';

import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { Encapsular } from '../../models/Encapsular';
import { AnoLetivoServiceProvider } from '../../providers/ano-letivo-service/ano-letivo-service';

@IonicPage()
@Component({
  selector: 'page-ano-academico-listagem',
  templateUrl: 'ano-academico-listagem.html',
})
export class AnoAcademicoListagemPage {

  login: Login;
  departamentos: Departamento[] = [];
  anosLetivos: AnoLetivo[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private anoLetivoProvider: AnoLetivoServiceProvider,
    private departamentoProvider: DepartamentoServiceProvider,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.carregarDados();
  }

  async carregarDados() {
    await this.storage.get("login").then((value) => this.login = value);
    await this.buscarAnosLetivos();
    await this.buscarDepartamentos()
  }

  private buscarAnosLetivos() {
    this.anoLetivoProvider.loadAcademicYearISO8601()
      .then( (response: AnoLetivo[]) => this.anosLetivos = response);
  }

  private buscarDepartamentos() {
    this.departamentoProvider.loadDepartament()
      .then( (response: Departamento[]) => this.departamentos = response);
  }

  public exibirActionSheet(anoLetivo: AnoLetivo) {
    console.log(anoLetivo);
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Remover Ano Letivo',
          role: 'destructive',
          handler: () => {
            this.confirmarExclusao(anoLetivo);
          }
        },
        {
          text: 'Modificar',
          handler: () => {
            this.navCtrl.push(
              'AnoAcademicoCreatePage', 
              {
                login: this.login,
                departamentos: this.departamentos,
                anoLetivo: anoLetivo
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

  private confirmarExclusao(anoLetivo) {
    this.alertCtrl.create({
      title: 'Confirmar operação',
      subTitle: 'Deseja realmente excluir este Ano Letivo?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Confirmar',
          handler: data => {
            let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(anoLetivo), "");
            this.anoLetivoProvider.removeAcademicYear(encapsular)
              .then( (response) => {
                if (response === 1) {
                  this.buscarDepartamentos();
                  this.exibirMensagem('Ano letivo removido com sucesso');
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

  public cadastrarAnoLetivo() {
    this.navCtrl.push(
      'AnoAcademicoCreatePage', 
      {
        login: this.login,
        isCadastro: true
      });
  }
}
