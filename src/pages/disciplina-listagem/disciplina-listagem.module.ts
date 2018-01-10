import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisciplinaListagemPage } from './disciplina-listagem';

@NgModule({
  declarations: [
    DisciplinaListagemPage,
  ],
  imports: [
    IonicPageModule.forChild(DisciplinaListagemPage),
  ],
})
export class DisciplinaListagemPageModule {}
