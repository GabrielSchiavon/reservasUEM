import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioCreatePage } from './usuario-create';

@NgModule({
  declarations: [
    UsuarioCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioCreatePage),
  ],
})
export class UsuarioCreatePageModule {}
