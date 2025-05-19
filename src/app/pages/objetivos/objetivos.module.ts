import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObjetivosPageRoutingModule } from './objetivos-routing.module';

import { ObjetivosPage } from './objetivos.page';
import { HeaderModule } from 'src/app/components/template/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObjetivosPageRoutingModule,
    HeaderModule
  ],
  declarations: [ObjetivosPage]
})
export class ObjetivosPageModule {}
