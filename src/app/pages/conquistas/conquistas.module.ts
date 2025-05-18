import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConquistasPageRoutingModule } from './conquistas-routing.module';

import { ConquistasPage } from './conquistas.page';
import { HeaderModule } from 'src/app/components/template/header/header.module';
import { ConquistaModalComponent } from './conquista-modal/conquista-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConquistasPageRoutingModule,
    HeaderModule,
    ReactiveFormsModule,
  ],
  declarations: [ConquistasPage, ConquistaModalComponent]
})
export class ConquistasPageModule {}
