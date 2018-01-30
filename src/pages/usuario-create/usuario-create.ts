import { Login } from '../../models/Login';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';
import { Usuario } from '../../models/Usuario';
import { Departamento } from '../../models/Departamento';
import { Encapsular } from '../../models/Encapsular';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-usuario-create',
  templateUrl: 'usuario-create.html',
})
export class UsuarioCreatePage {

  login: Login;
  departamentos: Departamento[];
  usuario: Usuario;
  isCadastro: boolean;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private usuarioProvider: UsuarioServiceProvider,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController
  ) {
    this.departamentos = this.navParams.get("departamentos") || [];
    this.usuario = this.navParams.get("usuario") || new Usuario();
    this.isCadastro = this.navParams.get("isCadastro") || false;
    this.login = this.navParams.get("login") || new Login();
  }

  ionViewCanEnter(){
    this.menuCtrl.enable(false);
   }
 
   ionViewCanLeave(){
    this.menuCtrl.enable(true);
   } 

  verificarProblemaLocomocao(ev) {
    if (ev.isChecked) {
      this.usuario.problema_locomocao = 1
    } else {
      this.usuario.problema_locomocao = 0
    }
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
      this.usuario.senha = 'reserva';
      let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.usuario), "");
      this.usuarioProvider.insertUser(encapsular)
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
      let encapsular = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.usuario), "");
      this.usuarioProvider.updateUser(encapsular)
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
