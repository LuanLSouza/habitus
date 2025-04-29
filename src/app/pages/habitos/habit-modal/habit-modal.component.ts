import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habit, FrequencyType, StatusType } from '../../../models/habit.model';

@Component({
  selector: 'app-habit-modal',
  templateUrl: './habit-modal.component.html',
  styleUrls: ['./habit-modal.component.scss'],
  standalone: false
})
export class HabitModalComponent implements OnInit {
  habitForm: FormGroup = this.fb.group({
    nome: ['', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(100)
    ]],
    descricao: ['', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(200)
    ]],
    frequencia: [FrequencyType.DAILY, [Validators.required]],
    dataInicio: [new Date().toISOString(), [Validators.required]]
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
    if (this.habitForm.invalid) {
      this.habitForm.markAllAsTouched();
      return;
    }
    
    const newHabit: Partial<Habit> = {
      ...this.habitForm.value,
      status: StatusType.ACTIVE
    };
    
    return this.modalCtrl.dismiss(newHabit, 'confirm');
  }

  // Getters para facilitar o acesso aos controles do formulário no template
  get nome() { return this.habitForm.get('nome'); }
  get descricao() { return this.habitForm.get('descricao'); }
} 