import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservaListagemPage } from './reserva-listagem';

@NgModule({
  declarations: [
    ReservaListagemPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservaListagemPage),
  ],
})
export class ReservaListagemPageModule {}
