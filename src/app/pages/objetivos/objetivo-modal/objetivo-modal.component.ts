import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Objetivo } from 'src/app/models/objetivo.model';

@Component({
  selector: 'app-objetivo-modal',
  templateUrl: './objetivo-modal.component.html',
  styleUrls: ['./objetivo-modal.component.scss'],
  standalone: false
})
export class ObjetivoModalComponent  implements OnInit {
  @Input() objetivo: Objetivo | null = null;
  isEditMode = false;

  objetivoForm: FormGroup = this.fb.group({
    titulo: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100)
    ]],
    descricao: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(200)
    ]],
    dataInicio: [new Date().toISOString().slice(0, 10), [Validators.required]],
    prazoConclusao: [new Date().toISOString().slice(0, 10), [Validators.required]],
    progresso: [0, [Validators.required]]
  });

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.objetivo) {
      this.isEditMode = true;
      this.objetivoForm.patchValue({
        titulo: this.objetivo.titulo,
        descricao: this.objetivo.descricao,
        dataInicio: new Date(this.objetivo.dataInicio).toISOString().slice(0, 10),
        prazoConclusao: new Date(this.objetivo.prazoConclusao).toISOString().slice(0, 10),
        progresso: this.objetivo.progresso
      });
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.objetivoForm.invalid) {
      this.objetivoForm.markAllAsTouched();
      return;
    }

  const formValue = { ...this.objetivoForm.value, progresso: Number(this.objetivoForm.value.progresso) };

  if (this.isEditMode && this.objetivo) {
    const updatedObjetivo: Objetivo = {
      ...formValue,
      id: this.objetivo.id
    };
    return this.modalCtrl.dismiss(updatedObjetivo, 'confirm');
  } else {
    const newObjetivo = {
      ...formValue
    };
    return this.modalCtrl.dismiss(newObjetivo, 'confirm');
  }
  }

  get titulo() {return this.objetivoForm.get('titulo'); }
  get descricao() {return this.objetivoForm.get('descricao'); }
}