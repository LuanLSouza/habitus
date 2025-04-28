import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitService } from '../../services/habit.service';
import { Habit, FrequencyType, StatusType } from '../../models/habit.model';
import { Observable } from 'rxjs';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-habitos',
  templateUrl: './habitos.page.html',
  styleUrls: ['./habitos.page.scss'],
  standalone: false
})
export class HabitosPage implements OnInit {
  habits$: Observable<Habit[]>;
  FrequencyType = FrequencyType;
  StatusType = StatusType;

  constructor(
    private router: Router,
    private habitService: HabitService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    this.habits$ = this.habitService.getHabits();
  }

  trackByFn(index: number, habit: Habit): number {
    return habit.id;
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

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  async openAddHabitModal() {
    const alert = await this.alertController.create({
      header: 'Adicionar Hábito',
      message: 'Funcionalidade em desenvolvimento',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    console.log('HabitosPage initialized');
  }
}
