import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartamentCreatePage } from './departament-create';

@NgModule({
  declarations: [
    DepartamentCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DepartamentCreatePage),
  ],
})
export class DepartamentCreatePageModule {}
