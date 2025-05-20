import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoriasPageRoutingModule } from './categorias-routing.module';
import { CategoriasPage } from './categorias.page';
import { CategoriaModalComponent } from './categoria-modal/categoria-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from 'src/app/components/template/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CategoriasPageRoutingModule,
    HttpClientModule,
    HeaderModule
  ],
  declarations: [
    CategoriasPage,
    CategoriaModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriasPageModule { } 