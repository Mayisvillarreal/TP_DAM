import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogRiegosPageRoutingModule } from './log-riegos-routing.module';

import { LogRiegosPage } from './log-riegos.page';

import { FormatDatePipe } from 'src/app/pipes/format-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogRiegosPageRoutingModule,
    FormatDatePipe
  ],
  declarations: [LogRiegosPage]
})
export class LogRiegosPageModule {}
