import { DepartamentoServiceProvider } from './../../providers/departamento-service/departamento-service';
import { Login } from '../../models/Login';
import { Departamento } from '../../models/Departamento';

import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { Encapsular } from '../../models/Encapsular';


@IonicPage()
@Component({
  selector: 'page-departamento-listagem',
  templateUrl: 'departamento-listagem.html',
})
export class DepartamentoListagemPage {

  login: Login;
  departamentos: Departamento[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private departamentoProvider: DepartamentoServiceProvider,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.carregarDados();

  }

  async carregarDados() {
    await this.storage.get("login").then( (value) => this.login = value);
    await this.buscarDepartamentos()
  }

  private buscarDepartamentos() {
    this.departamentoProvider.loadDepartament()
      .then(
      (response: Departamento[]) => this.departamentos = response
      );
  }

  public exibirActionSheet(departamento: Departamento) {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Remover Departamento',
          role: 'destructive',
          handler: () => {
            this.confirmarExclusao(departamento);
          }
        },
        {
          text: 'Modificar',
          handler: () => {
            this.navCtrl.push(
              'DepartamentoCreatePage', 
              {
                login: this.login,
                departamento: departamento
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

  private confirmarExclusao(departamento) {
    this.alertCtrl.create({
      title: 'Confirmar operação',
      subTitle: 'Deseja realmente excluir ' + departamento.nome + '?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Confirmar',
          handler: data => {
            let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(departamento), "");
            this.departamentoProvider.removeDepartament(encapsular)
              .then( (response) => {
                if (response === 1) {
                  this.buscarDepartamentos();
                  this.exibirMensagem('Departamento removido com sucesso');
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

  public cadastrarDepartamento() {
    this.navCtrl.push(
      'DepartamentoCreatePage', 
      {
        login: this.login,
        isCadastro: true
      });
  }

}
