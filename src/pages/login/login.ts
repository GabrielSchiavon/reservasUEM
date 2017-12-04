import { LoginServiceProvider } from './../../providers/login-service/login-service';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  keepConnected:boolean;
  email: string;
  senha: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public loginService: LoginServiceProvider,private storage: Storage, private menuCtrl: MenuController) {
      this.storage.get("login")
        .then( (value) => {if (value.id === -1) { this.senha = ''} });
      this.storage.get("keepConnected").then( (value) => this.keepConnected = value );
  }

  ionViewWillEnter(){
    this.senha = '';
    this.menuCtrl.enable(false);
  }
  saveConnected(event) {
    this.storage.set("keepConnected", this.keepConnected);
  }

  verifyLogin() {
    this.loginService.confirmLogin(this.email, this.senha)
      .then( (login: Login) => {
        this.storage.set("login", login);
        this.navCtrl.setRoot('ReservaPage');
      } )
      .catch( () => "Erro na requisição de login" );
  }
}
