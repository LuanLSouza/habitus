import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Conquista } from 'src/app/models/conquista.model';
import { Habito } from 'src/app/models/habito.model';
import { Objetivo } from 'src/app/models/objetivo.model';
import { HabitService } from 'src/app/services/habit.service';
import { ObjetivoService } from 'src/app/services/objetivo.service';

@Component({
  selector: 'app-conquista-modal',
  templateUrl: './conquista-modal.component.html',
  styleUrls: ['./conquista-modal.component.scss'],
  standalone: false
})
export class ConquistaModalComponent  implements OnInit {
  @Input() conquista: Conquista | null = null;
  isEditMode = false;
  
  conquistaForm: FormGroup = this.fb.group({
    habitos: [],
    objetivos: [],
    descricao:['', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(200)
    ]],
    data: [new Date().toISOString().slice(0, 10), [Validators.required]],
    status: [true]
  });

  habitos: Habito[] = [];
  objetivos: Objetivo[] = [];
  
  constructor(
    private fb: FormBuilder,
    private habitoService: HabitService,
    private objetivoService: ObjetivoService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.habitoService.getHabitos().subscribe(
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

    this.objetivoService.getObjetivos().subscribe(
      {
        next: (response) => {
          this.objetivos = response;
        },
        error: (error) => {
          alert('Erro ao carregar os objetivos:');
          console.error(error);
        }
      }
    );

    if (this.conquista) {
      this.isEditMode = true;
      this.conquistaForm.patchValue({
        habitos: this.conquista.habitos,
        objetivos: this.conquista.objetivos,
        descricao: this.conquista.descricao,
        data: new Date(this.conquista.data).toISOString().slice(0, 10),
        status: this.conquista.status === 'ativa'
      });
    }

  }

  compareWith(o1: Conquista | null, o2: Conquista | null): boolean { 
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(){
    if (this.conquistaForm.invalid) {
      this.conquistaForm.markAllAsTouched();
      return;
    }
    const statusEnum = this.conquistaForm.value.status ? 'ativa' : 'inativa';
    
    if (this.isEditMode && this.conquista) {
      const updatedConquista: Conquista = {
        ...this.conquistaForm.value,
        status: statusEnum,
        id: this.conquista.id
      };
      return this.modalCtrl.dismiss(updatedConquista, 'confirm');
    } else {
      const newConquista = {
        ...this.conquistaForm.value,
        status: statusEnum,
      };
      return this.modalCtrl.dismiss(newConquista, 'confirm');
    }
  }

  get descricao() { return this.conquistaForm.get('descricao'); }

}
