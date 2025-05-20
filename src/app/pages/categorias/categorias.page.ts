import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria, StatusCategoriaType } from '../../models/categoria.model';
import { Observable } from 'rxjs';
import { ModalController, AlertController, ViewWillEnter } from '@ionic/angular';
import { CategoriaModalComponent } from './categoria-modal/categoria-modal.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: false
})
export class CategoriasPage implements OnInit, ViewWillEnter {
  categorias: Categoria[] = [];
  StatusCategoriaType = StatusCategoriaType;

  constructor(
    private categoriaService: CategoriaService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ionViewWillEnter() {
    this.atualizarCategorias();
  }

  getStatusColor(status: StatusCategoriaType): string {
    switch (status) {
      case StatusCategoriaType.ATIVA:
        return 'success';
      case StatusCategoriaType.INATIVA:
        return 'danger';
      default:
        return 'medium';
    }
  }

  async openAddCategoriaModal() {
    const modal = await this.modalController.create({
      component: CategoriaModalComponent
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      this.categoriaService.save(data).subscribe({
        next: () => this.atualizarCategorias(),
        error: (err) => console.error('Erro ao salvar categoria:', err)
      });
    }
  }

  async openEditCategoriaModal(categoria: Categoria) {
    const modal = await this.modalController.create({
      component: CategoriaModalComponent,
      componentProps: {
        categoria: { ...categoria }
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      this.categoriaService.save(data).subscribe({
        next: () => this.atualizarCategorias(),
        error: (err) => console.error('Erro ao atualizar categoria:', err)
      });
    }
  }

  async confirmDeleteCategoria(categoria: Categoria) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: `Tem certeza que deseja excluir a categoria "${categoria.nome}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'confirm',
          cssClass: 'danger',
          handler: () => {
            this.categoriaService.deleteCategoria(categoria).subscribe({
              next: () => this.atualizarCategorias(),
              error: (err) => console.error('Erro ao excluir categoria:', err)
            });
          }
        }
      ]
    });

    await alert.present();
  }

  atualizarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => this.categorias = categorias,
      error: (error) => console.error('Erro ao carregar as categorias:', error)
    });
  }

  ngOnInit() {
    console.log('CategoriasPage initialized');
  }
} 