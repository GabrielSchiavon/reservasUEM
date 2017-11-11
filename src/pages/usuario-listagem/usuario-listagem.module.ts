import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioListagemPage } from './usuario-listagem';

@NgModule({
  declarations: [
    UsuarioListagemPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioListagemPage),
  ],
})
export class UsuarioListagemPageModule {}
