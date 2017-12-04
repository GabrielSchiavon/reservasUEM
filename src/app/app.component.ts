import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { Login } from '../models/Login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private storage: Storage) {
    this.verifyConnected();
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'UsuarioListagemPage' },
      { title: 'Criar Departamento', component: 'DepartamentCreatePage' }
    ];

  }

  async verifyConnected() {
    await this.storage.get("keepConnected").then( 
      (value) => {
        if (value) {
          this.rootPage = 'ReservationCreatePage';
        } else {
          this.rootPage = 'LoginPage'; 
        }
      }
    )
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.storage.set("login", new Login());
    this.storage.set("keepConnected", false);
    this.nav.setRoot('LoginPage');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
