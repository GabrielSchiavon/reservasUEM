import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartamentoListagemPage } from './departamento-listagem';

@NgModule({
  declarations: [
    DepartamentoListagemPage,
  ],
  imports: [
    IonicPageModule.forChild(DepartamentoListagemPage),
  ],
})
export class DepartamentoListagemPageModule {}
