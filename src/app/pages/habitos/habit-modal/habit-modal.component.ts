import { Component, OnInit, Input } from '@angular/core';
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
  @Input() habit: Habit | null = null;
  isEditMode = false;
  
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
    dataInicio: [new Date().toISOString(), [Validators.required]],
    status: [StatusType.ACTIVE]
  });
  frequencyTypes = Object.values(FrequencyType);
  statusTypes = Object.values(StatusType);
  
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.habit) {
      this.isEditMode = true;
      this.habitForm.patchValue({
        nome: this.habit.nome,
        descricao: this.habit.descricao,
        frequencia: this.habit.frequencia,
        dataInicio: new Date(this.habit.dataInicio).toISOString(),
        status: this.habit.status
      });
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.habitForm.invalid) {
      this.habitForm.markAllAsTouched();
      return;
    }
    
    if (this.isEditMode && this.habit) {
      // For edit mode, return the complete habit with ID
      const updatedHabit: Habit = {
        ...this.habitForm.value,
        id: this.habit.id
      };
      return this.modalCtrl.dismiss(updatedHabit, 'confirm');
    } else {
      // For new habit, return without ID
      const newHabit: Partial<Habit> = {
        ...this.habitForm.value
      };
      return this.modalCtrl.dismiss(newHabit, 'confirm');
    }
  }

  // Getters para facilitar o acesso aos controles do formulário no template
  get nome() { return this.habitForm.get('nome'); }
  get descricao() { return this.habitForm.get('descricao'); }
} 