import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habito, FrequencyType, StatusType } from '../../../models/habito.model';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-habit-modal',
  templateUrl: './habit-modal.component.html',
  styleUrls: ['./habit-modal.component.scss'],
  standalone: false
})
export class HabitModalComponent implements OnInit {
  @Input() habit: Habito | null = null;
  isEditMode = false;
  categorias: Categoria[] = [];
  
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
    status: [StatusType.ACTIVE],
    categoria: [null]
  });
  frequencyTypes = Object.values(FrequencyType);
  statusTypes = Object.values(StatusType);
  
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    
    if (this.habit) {
      this.isEditMode = true;
      this.habitForm.patchValue({
        nome: this.habit.nome,
        descricao: this.habit.descricao,
        frequencia: this.habit.frequencia,
        dataInicio: new Date(this.habit.dataInicio).toISOString(),
        status: this.habit.status,
        categoria: this.habit.categoria
      });
    }
  }

  carregarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias.filter(cat => cat.status === 'ativa');
      },
      error: (error) => console.error('Erro ao carregar categorias:', error)
    });
  }

  compareWithCategoria(cat1: Categoria, cat2: Categoria) {
    return cat1 && cat2 ? cat1.id === cat2.id : cat1 === cat2;
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
      const updatedHabit: Habito = {
        ...this.habitForm.value,
        id: this.habit.id
      };
      return this.modalCtrl.dismiss(updatedHabit, 'confirm');
    } else {
      const newHabit = {
        ...this.habitForm.value
      };
      return this.modalCtrl.dismiss(newHabit, 'confirm');
    }
  }

  // Getters para facilitar o acesso aos controles do formulário no template
  get nome() { return this.habitForm.get('nome'); }
  get descricao() { return this.habitForm.get('descricao'); }
  get categoria() { return this.habitForm.get('categoria'); }
} 