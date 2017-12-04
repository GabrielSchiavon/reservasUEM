import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationCreatePage } from './reservation-create';

@NgModule({
  declarations: [
    ReservationCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationCreatePage),
  ],
})
export class ReservationCreatePageModule {}
