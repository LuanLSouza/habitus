import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitService } from '../../services/habit.service';
import { Habit, FrequencyType, StatusType } from '../../models/habit.model';
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
  habits: Habit[] = [];
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
    this.habits = this.habitService.getHabits();
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
    const modal = await this.modalController.create({
      component: HabitModalComponent
    });
    
    await modal.present();
    
    const { data, role } = await modal.onWillDismiss();
    
    if (role === 'confirm' && data) {
      const newHabit = this.habitService.addHabit(data);
      this.habits = this.habitService.getHabits();
    }
  }

  ngOnInit() {
    console.log('HabitosPage initialized');
  }
}
