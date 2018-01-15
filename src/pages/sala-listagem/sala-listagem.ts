import { DepartamentoServiceProvider } from './../../providers/departamento-service/departamento-service';
import { Login } from './../../models/Login';
import { Departamento } from './../../models/Departamento';
import { Sala } from './../../models/Sala';

import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { SalaServiceProvider } from '../../providers/sala-service/sala-service';
import { Encapsular } from '../../models/Encapsular';

@IonicPage()
@Component({
  selector: 'page-sala-listagem',
  templateUrl: 'sala-listagem.html',
})
export class SalaListagemPage {

  login: Login;
  departamentos: Departamento[] = [];
  salas: Sala[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private salaProvider: SalaServiceProvider,
    private departamentoProvider: DepartamentoServiceProvider,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.carregarDados();
  }

  async carregarDados() {
    await this.storage.get("login").then( (value) => this.login = value);
    await this.buscarSalas();
    await this.buscarDepartamentos();
  }

  private buscarSalas() {
    this.salaProvider.loadRoom()
      .then( (response: Sala[]) => this.salas = response );
  }

  private buscarDepartamentos() {
    this.departamentoProvider.loadDepartament()
      .then(
      (response: Departamento[]) => this.departamentos = response
      );
  }

  public exibirActionSheet(sala: Sala) {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Remover Sala',
          role: 'destructive',
          handler: () => {
            this.confirmarExclusao(sala);
          }
        },
        {
          text: 'Modificar',
          handler: () => {
            this.navCtrl.push(
              'SalaCreatePage', 
              {
                login: this.login,
                sala: sala,
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

  private confirmarExclusao(sala) {
    this.alertCtrl.create({
      title: 'Confirmar operação',
      subTitle: 'Deseja realmente excluir a sala' + sala.numero + '?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Confirmar',
          handler: data => {
            let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(sala), "");
            this.salaProvider.removeRoom(encapsular)
              .then( (response) => {
                if (response === 1) {
                  this.buscarSalas();
                  this.exibirMensagem('Sala removido com sucesso');
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

  public cadastrarSala() {
    this.navCtrl.push(
      'SalaCreatePage', 
      {
        login: this.login,
        isCadastro: true,
        departamentos: this.departamentos
      });
  }
}
