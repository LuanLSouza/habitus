import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitService, HabitFilter } from '../../services/habit.service';
import { Habito, FrequencyType, StatusType } from '../../models/habito.model';
import { Observable } from 'rxjs';
import { ModalController, AlertController, ViewWillEnter, ToastController } from '@ionic/angular';
import { HabitModalComponent } from './habit-modal/habit-modal.component';
import { SearchModalComponent } from './search-modal/search-modal.component';

@Component({
  selector: 'app-habitos',
  templateUrl: './habitos.page.html',
  styleUrls: ['./habitos.page.scss'],
  standalone: false
})
export class HabitosPage implements OnInit, ViewWillEnter {
  habitos: Habito[] = [];
  FrequencyType = FrequencyType;
  StatusType = StatusType;
  isSearchActive = false;
  currentFilters: HabitFilter | null = null;

  constructor(
    private habitService: HabitService,
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController,
  ) {
  }

  ionViewWillEnter() {
    this.loadAllHabits();
  }

  loadAllHabits() {
    this.isSearchActive = false;
    this.currentFilters = null;
    this.habitService.getHabitos().subscribe(
      {
        next: (response) => {
          this.habitos = response;
        },
        error: (error) => {
          alert('Erro ao carregar os hábitos:');
          console.error(error);
        }
      }
    );
  }

  async openSearchModal() {
    const modal = await this.modalController.create({
      component: SearchModalComponent,
      componentProps: {
        currentFilters: this.currentFilters
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'search' && data) {
      this.performSearch(data);
    }
  }

  performSearch(filters: HabitFilter) {
    this.isSearchActive = true;
    this.currentFilters = filters;
    
    this.habitService.searchWithFilters(filters).subscribe({
      next: (response) => {
        this.habitos = response.data;
      },
      error: (error) => {
        console.error('Erro na busca:', error);
        alert('Erro ao realizar a busca');
      }
    });
  }

  resetSearch() {
    this.loadAllHabits();
  }

  getStatusColor(status: StatusType): string {
    switch (status) {
      case StatusType.ACTIVE:
        return 'success';
      case StatusType.PAUSED:
        return 'warning';
      case StatusType.COMPLETED:
        return 'primary';
      default:
        return 'medium';
    }
  }

  async openAddHabitModal() {
    const modal = await this.modalController.create({
        component: HabitModalComponent
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
        this.habitService.save(data).subscribe({
        next: () => {
          this.toastController.create({
            message: 'Habito atualizado com sucesso!',
            duration: 2000,
            position: 'top',
            color: 'success'
          }).then(toast => toast.present());
          this.atualizarHabitos()
        },
        error: (err) => {
        this.toastController.create({
          message: err.error.message,
          header: 'Erro ao atualizar habito: ' + data.nome + ' Tente novamente.',
          position: 'top',
          color: 'danger',
          buttons:[
            {
              text: 'OK',
              role: 'cancel'
            }
          ]
        }).then(toast => toast.present());
        }
        });
    }
}

async openEditHabitModal(habit: Habito) {
  const modal = await this.modalController.create({
      component: HabitModalComponent,
      componentProps: {
          habit: {...habit}
      }
  });

  await modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm' && data) {
      this.habitService.save(data).subscribe({
          next: () => {
            this.toastController.create({
              message: 'Habito adicionado com sucesso!',
              duration: 2000,
              position: 'top',
              color: 'success'
            }).then(toast => toast.present());
            this.atualizarHabitos()
          },
          error: (err) => {
          this.toastController.create({
            message: err.error.message,
            header: 'Erro ao adicionar habito: ' + data.nome + ' Tente novamente.',
            position: 'top',
            color: 'danger',
            buttons:[
              {
                text: 'OK',
                role: 'cancel'
              }
            ]
          }).then(toast => toast.present());
        }
      });
  }
}

async confirmDeleteHabit(habito: Habito) {
  const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: `Tem certeza que deseja excluir o hábito "${habito.nome}"?`,
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
                  this.habitService.deleteHabit(habito).subscribe({
              next: () => {
                this.toastController.create({
                  message: 'Habito removido com sucesso!',
                  duration: 2000,
                  position: 'top',
                  color: 'success'
                }).then(toast => toast.present());
                this.atualizarHabitos()
              },
              error: (err) => {
                this.toastController.create({
                  message: err.error.message,
                  header: 'Erro ao remover habito.',
                  position: 'top',
                  color: 'danger',
                  buttons:[
                    {
                      text: 'OK',
                      role: 'cancel'
                    }
                  ]
                }).then(toast => toast.present());
              }
                  });
              }
          }
      ]
  });

  await alert.present();
}

atualizarHabitos() {
    if (this.isSearchActive && this.currentFilters) {
      this.performSearch(this.currentFilters);
    } else {
      this.loadAllHabits();
    }
}

  ngOnInit() {
    console.log('HabitosPage initialized');
  }
}
