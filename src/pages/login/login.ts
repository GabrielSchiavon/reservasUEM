import { LoginServiceProvider } from './../../providers/login-service/login-service';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginService: LoginServiceProvider,
    private storage: Storage) {
      this.storage.get("email").then( (value) => this.email = value );
      this.storage.get("senha").then( (value) => this.senha = value );
      this.storage.get("keepConnected").then( (value) => this.keepConnected = value );
  }

  saveConnected(event) {
    this.storage.set("keepConnected", this.keepConnected);
  }

  verifyLogin() {
    this.loginService.confirmLogin(this.email, this.senha)
      .then( (login: Login) => {
        this.storage.set("login", login);
        alert("Sucesso");
      } )
      .catch( () => "Erro na requisição de login" );
  }
}
