import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObjetivosPageRoutingModule } from './objetivos-routing.module';

import { ObjetivosPage } from './objetivos.page';
import { HeaderModule } from 'src/app/components/template/header/header.module';
import { ObjetivoModalComponent } from './objetivo-modal/objetivo-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObjetivosPageRoutingModule,
    HeaderModule,
    ReactiveFormsModule
  ],
  declarations: [ObjetivosPage, ObjetivoModalComponent]
})
export class ObjetivosPageModule {}
