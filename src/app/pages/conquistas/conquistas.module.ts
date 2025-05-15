import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConquistasPageRoutingModule } from './conquistas-routing.module';

import { ConquistasPage } from './conquistas.page';
import { HeaderModule } from 'src/app/components/template/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConquistasPageRoutingModule,
    HeaderModule
  ],
  declarations: [ConquistasPage]
})
export class ConquistasPageModule {}
