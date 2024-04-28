import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicionesPageRoutingModule } from './mediciones-routing.module';

import { MedicionesPage } from './mediciones.page';

import { FormatDatePipe } from 'src/app/pipes/format-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicionesPageRoutingModule,
    FormatDatePipe
    
  ],
  declarations: [MedicionesPage]
})
export class MedicionesPageModule {}
