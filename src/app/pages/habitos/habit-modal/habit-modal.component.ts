import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Habit, FrequencyType, StatusType } from '../../../models/habit.model';

@Component({
  selector: 'app-habit-modal',
  templateUrl: './habit-modal.component.html',
  styleUrls: ['./habit-modal.component.scss'],
  standalone: false
})
export class HabitModalComponent implements OnInit {
  habitForm: FormGroup = this.fb.group({
    nome: [''],
    descricao: [''],
    frequencia: [FrequencyType.DAILY],
    dataInicio: [new Date().toISOString()]
  });
  frequencyTypes = Object.values(FrequencyType);
  
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // Form is already initialized
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const newHabit: Partial<Habit> = {
      ...this.habitForm.value,
      status: StatusType.ACTIVE
    };
    
    return this.modalCtrl.dismiss(newHabit, 'confirm');
  }
} 