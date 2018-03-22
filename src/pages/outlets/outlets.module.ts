import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutletsPage } from './outlets';

@NgModule({
  declarations: [
    OutletsPage,
  ],
  imports: [
    IonicPageModule.forChild(OutletsPage),
  ],
})
export class OutletsPageModule {}
