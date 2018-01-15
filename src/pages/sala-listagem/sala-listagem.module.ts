import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaListagemPage } from './sala-listagem';

@NgModule({
  declarations: [
    SalaListagemPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaListagemPage),
  ],
})
export class SalaListagemPageModule {}
