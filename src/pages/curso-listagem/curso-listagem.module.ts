import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CursoListagemPage } from './curso-listagem';

@NgModule({
  declarations: [
    CursoListagemPage,
  ],
  imports: [
    IonicPageModule.forChild(CursoListagemPage),
  ],
})
export class CursoListagemPageModule {}
