import { Departamento } from './../../models/Departamento';
import { DepartamentoServiceProvider } from './../../providers/departamento-service/departamento-service';
import { UsuarioServiceProvider } from './../../providers/usuario-service/usuario-service';
import { Usuario } from './../../models/Usuario';
import { Login } from '../../models/Login';
import { Encapsular } from '../../models/Encapsular';

import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-usuario-listagem',
  templateUrl: 'usuario-listagem.html',
})
export class UsuarioListagemPage {

  login: Login;
  docentes: Usuario[] = [];
  admSala: Usuario[] = [];
  admDpto: Usuario[] = [];
  admSist: Usuario[] = [];
  departamentos: Departamento[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private usuarioProvider: UsuarioServiceProvider,
    private departamentoProvider: DepartamentoServiceProvider
  ) {
    this.buscarDados();
    this.storage.get("login").then( (value) => this.login = value);
  }

  private async buscarDados() {
    await this.buscarUsuariosAtivos();
    await this.buscarDepartamentos();
  }

  private buscarUsuariosAtivos() {
    this.usuarioProvider.loadUser()
      .then( 
        (response: Usuario[]) => {
          this.docentes = response.filter(data => data.permissao === 1);
          this.admSala = response.filter(data => data.permissao === 2);
          this.admDpto = response.filter(data => data.permissao === 3);
          this.admSist = response.filter(data => data.permissao === 4);
        }
      )
  }

  private buscarDepartamentos() {
    this.departamentoProvider.loadDepartament()
      .then(
        (response: Departamento[]) => this.departamentos = response
      )
  }

  private confirmarExclusão(usuario) {
    this.alertCtrl.create({
      title: 'Confirmar operação',
      subTitle: 'Deseja realmente excluir ' + usuario.nome + '?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Confirmar',
          handler: data => {
            let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(usuario), "");
            this.usuarioProvider.removeUser(encapsular)
              .then( (response) => {
                if (response === 1) {
                  this.buscarUsuariosAtivos();
                  this.exibirMensagem('Usuario removido com sucesso');
                }
              })
          }
        }
      ]
    }).present();
  }

  exibirMensagem(mensagem: string) {
    this.toastCtrl.create({
      message: mensagem,
      duration: 1500
    }).present();
  }

  public exibirActionSheet(usuario: Usuario) {
    let actionSheet = this.actionSheetCtrl.create({
      //title: "Reserva",
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Remover Usuario',
          role: 'destructive',
          handler: () => {
            this.confirmarExclusão(usuario);
          }
        },
        {
          text: 'Modificar',
          handler: () => {
            this.navCtrl.push(
              'UsuarioCreatePage', 
              {
                login: this.login,
                departamentos: this.departamentos,
                usuario: usuario
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

  cadastrarUsuario() {
    this.navCtrl.push(
      'UsuarioCreatePage', 
      {
        login: this.login, 
        departamentos: this.departamentos, 
        isCadastro: true
      });
  }
}
