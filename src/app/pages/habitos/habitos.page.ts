import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitService } from '../../services/habit.service';
import { Habito, FrequencyType, StatusType } from '../../models/habito.model';
import { Observable } from 'rxjs';
import { ModalController, AlertController, ViewWillEnter } from '@ionic/angular';
import { HabitModalComponent } from './habit-modal/habit-modal.component';

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

  constructor(
    private router: Router,
    private habitService: HabitService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
  }

  ionViewWillEnter() {
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

  navegar(event: any) {
    const valor = event.detail.value;
    this.router.navigate(['/' + valor]);
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
            next: () => this.atualizarHabitos(),
            error: (err) => console.error('Erro ao salvar hábito:', err)
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
          next: () => this.atualizarHabitos(),
          error: (err) => console.error('Erro ao atualizar hábito:', err)
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
                      next: () => this.atualizarHabitos(),
                      error: (err) => console.error('Erro ao excluir hábito:', err)
                  });
              }
          }
      ]
  });

  await alert.present();
}

  atualizarHabitos() {
    this.habitService.getHabitos().subscribe({
        next: (habitos) => this.habitos = habitos,
        error: (error) => console.error('Erro ao carregar os hábitos:', error)
    });
}

  ngOnInit() {
    console.log('HabitosPage initialized');
  }
}
