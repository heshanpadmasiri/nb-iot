import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsagePage } from './usage';

@NgModule({
  declarations: [
    UsagePage,
  ],
  imports: [
    IonicPageModule.forChild(UsagePage),
  ],
})
export class UsagePageModule {}
