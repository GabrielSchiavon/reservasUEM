import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { UsuarioServiceProvider } from '../providers/usuario-service/usuario-service';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { ReservaServiceProvider } from '../providers/reserva-service/reserva-service';
import { DepartamentoServiceProvider } from '../providers/departamento-service/departamento-service';
import { ConexaoProvider } from '../providers/conexao/conexao';
import { SalaServiceProvider } from '../providers/sala-service/sala-service';

@NgModule({
  declarations: [
    MyApp,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioServiceProvider,
    LoginServiceProvider,
    ReservaServiceProvider,
    DepartamentoServiceProvider,
    ConexaoProvider,
    SalaServiceProvider
  ]
})
export class AppModule {}
