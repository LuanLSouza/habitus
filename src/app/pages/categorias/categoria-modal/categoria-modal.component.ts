import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria, PrioridadeType, StatusCategoriaType } from '../../../models/categoria.model';

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './categoria-modal.component.html',
  styleUrls: ['./categoria-modal.component.scss'],
  standalone: false
})
export class CategoriaModalComponent implements OnInit {
  @Input() categoria: Categoria | null = null;
  isEditMode = false;
  
  categoriaForm: FormGroup = this.fb.group({
    nome: ['', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(100)
    ]],
    cor: ['#7b1fa2', [Validators.required]],
    descricao: ['', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(200)
    ]],
    prioridade: [PrioridadeType.MEDIA, [Validators.required]],
    status: [StatusCategoriaType.ATIVA]
  });

  prioridadeTypes = Object.values(PrioridadeType);
  statusTypes = Object.values(StatusCategoriaType);
  
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.categoria) {
      this.isEditMode = true;
      this.categoriaForm.patchValue({
        nome: this.categoria.nome,
        cor: this.categoria.cor,
        descricao: this.categoria.descricao,
        prioridade: this.categoria.prioridade,
        status: this.categoria.status
      });
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }
    
    if (this.isEditMode && this.categoria) {
      const updatedCategoria: Categoria = {
        ...this.categoriaForm.value,
        id: this.categoria.id
      };
      return this.modalCtrl.dismiss(updatedCategoria, 'confirm');
    } else {
      const newCategoria = {
        ...this.categoriaForm.value
      };
      return this.modalCtrl.dismiss(newCategoria, 'confirm');
    }
  }

  // Getters para facilitar o acesso aos controles do formulário no template
  get nome() { return this.categoriaForm.get('nome'); }
  get cor() { return this.categoriaForm.get('cor'); }
  get descricao() { return this.categoriaForm.get('descricao'); }
  get prioridade() { return this.categoriaForm.get('prioridade'); }
  get status() { return this.categoriaForm.get('status'); }
} 