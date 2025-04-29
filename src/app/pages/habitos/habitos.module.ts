import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitosPageRoutingModule } from './habitos-routing.module';

import { HabitosPage } from './habitos.page';
import { HabitModalComponent } from './habit-modal/habit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HabitosPageRoutingModule
  ],
  declarations: [
    HabitosPage,
    HabitModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HabitosPageModule {}
