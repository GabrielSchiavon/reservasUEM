import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisciplinaCreatePage } from './disciplina-create';

@NgModule({
  declarations: [
    DisciplinaCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DisciplinaCreatePage),
  ],
})
export class DisciplinaCreatePageModule {}
