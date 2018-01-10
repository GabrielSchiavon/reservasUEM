import { Departamento } from './../../models/Departamento';
import { DepartamentoServiceProvider } from './../../providers/departamento-service/departamento-service';
import { UsuarioServiceProvider } from './../../providers/usuario-service/usuario-service';
import { Usuario } from './../../models/Usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-usuario-listagem',
  templateUrl: 'usuario-listagem.html',
})
export class UsuarioListagemPage {

  docentes: Usuario[] = [];
  admSala: Usuario[] = [];
  admDpto: Usuario[] = [];
  admSist: Usuario[] = [];
  departamentos: Departamento[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private usuarioProvider: UsuarioServiceProvider,
    private departamentoProvider: DepartamentoServiceProvider
  ) {
    this.buscarDados();
  }

  private async buscarDados() {
    await this.usuarioProvider.loadUser()
      .then( 
        (response: Usuario[]) => {
          this.docentes = response.filter(data => data.permissao === 1);
          this.admSala = response.filter(data => data.permissao === 2);
          this.admDpto = response.filter(data => data.permissao === 3);
          this.admSist = response.filter(data => data.permissao === 4);
        }
      )
    
      await this.departamentoProvider.loadDepartament()
        .then(
          (response: Departamento[]) => this.departamentos = response
        )
  }

  public exibirActionSheet(usuario: Usuario) {
    let actionSheet = this.actionSheetCtrl.create({
      //title: "Reserva",
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Remover Usuario',
          role: 'destructive',
          handler: () => {}
        },
        {
          text: 'Modificar',
          handler: () => {
            this.navCtrl.push(
              'UsuarioCreatePage', 
              {
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
    this.navCtrl.push('UsuarioCreatePage', {departamentos: this.departamentos, isCadastro: true})
  }
}
