import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CursoCreatePage } from './curso-create';

@NgModule({
  declarations: [
    CursoCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CursoCreatePage),
  ],
})
export class CursoCreatePageModule {}
