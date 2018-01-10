import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartamentoCreatePage } from './departamento-create';

@NgModule({
  declarations: [
    DepartamentoCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DepartamentoCreatePage),
  ],
})
export class DepartamentoCreatePageModule {}
