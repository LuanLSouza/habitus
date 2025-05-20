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
    dataInicio: [new Date().toISOString(), [Validators.required]],
    prazoConclusao: [new Date().toISOString(), [Validators.required]],
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
        dataInicio: new Date(this.objetivo.dataInicio).toISOString(),
        prazoConclusao: new Date(this.objetivo.prazoConclusao).toISOString(),
        progresso: this.objetivo.progresso
      });
  }
}

}
