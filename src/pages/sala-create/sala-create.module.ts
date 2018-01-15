import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaCreatePage } from './sala-create';

@NgModule({
  declarations: [
    SalaCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(SalaCreatePage),
  ],
})
export class SalaCreatePageModule {}
